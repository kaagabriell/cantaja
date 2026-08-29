import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  CircleAlert,
  ExternalLink,
  Link2,
  LoaderCircle,
  LogOut,
  MessageCircleReply,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Unplug,
} from "lucide-react";
import { MetaHeader } from "../../components/threads-autopilot/MetaHeader";
import { MetaFooter } from "../../components/threads-autopilot/MetaFooter";
import { SEOHead } from "../../components/threads-autopilot/SEOHead";

const FUNCTION_BASE = "https://pufbbtfsptqkpjwkghcg.supabase.co/functions/v1";
const OAUTH_START_URL = `${FUNCTION_BASE}/threads-oauth/start`;
const DASHBOARD_URL = `${FUNCTION_BASE}/threads-dashboard`;
const SESSION_KEY = "threads_autopilot_session";

const permissions = [
  ["threads_basic", "Identificar o perfil autorizado e acessar as informações básicas necessárias para operar a integração."],
  ["threads_content_publish", "Criar e publicar conteúdo no perfil do Threads conectado pelo responsável da empresa."],
  ["threads_keyword_search", "Pesquisar conteúdo público por palavras-chave relacionadas aos assuntos de atuação da empresa."],
  ["threads_manage_replies", "Publicar respostas em nome do perfil autorizado em conversas públicas pertinentes."],
  ["threads_read_replies", "Ler respostas às publicações do próprio perfil para manter contexto e acompanhar as interações."],
] as const;

type Account = {
  id: string;
  username?: string;
  connectedAt?: string;
  tokenExpiresAt?: string;
};

type ThreadItem = {
  id: string;
  text?: string;
  username?: string;
  permalink?: string;
  timestamp?: string;
};

type Notice = { kind: "success" | "error"; message: string } | null;

async function dashboardRequest<T>(session: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(DASHBOARD_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error ?? "Não foi possível concluir a solicitação.");
  return result as T;
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function ThreadCard({
  item,
  actionLabel,
  onAction,
}: {
  item: ThreadItem;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-lime-300/30">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs text-white/45">
        <span>{item.username ? `@${item.username}` : "Publicação"}</span>
        <span>{formatDate(item.timestamp)}</span>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-6 text-white/80">
        {item.text || "Publicação sem texto disponível."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {actionLabel && onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="rounded-full border border-lime-300/30 px-3 py-1.5 text-xs font-medium text-lime-200 transition hover:bg-lime-300/10"
          >
            {actionLabel}
          </button>
        ) : null}
        {item.permalink ? (
          <a
            href={item.permalink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/25 hover:text-white"
          >
            Abrir no Threads <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function ThreadsAutopilotPage() {
  const [session, setSession] = useState("");
  const [account, setAccount] = useState<Account | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState<Notice>(null);
  const [postText, setPostText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ThreadItem[]>([]);
  const [ownThreads, setOwnThreads] = useState<ThreadItem[]>([]);
  const [replies, setReplies] = useState<ThreadItem[]>([]);
  const [selectedThread, setSelectedThread] = useState<ThreadItem | null>(null);
  const [replyTarget, setReplyTarget] = useState<ThreadItem | null>(null);
  const [replyText, setReplyText] = useState("");

  const connected = Boolean(session && account);

  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession("");
    setAccount(null);
    setOwnThreads([]);
    setReplies([]);
    setSearchResults([]);
  }, []);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const incomingSession = hash.get("session");
    if (incomingSession) {
      localStorage.setItem(SESSION_KEY, incomingSession);
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    setSession(incomingSession || localStorage.getItem(SESSION_KEY) || "");
  }, []);

  const loadStatus = useCallback(async () => {
    if (!session) {
      setLoadingStatus(false);
      return;
    }
    setLoadingStatus(true);
    try {
      const result = await dashboardRequest<{ connected: boolean; account: Account }>(session, { action: "status" });
      setAccount(result.connected ? result.account : null);
    } catch {
      clearSession();
    } finally {
      setLoadingStatus(false);
    }
  }, [clearSession, session]);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  const run = useCallback(async <T,>(name: string, task: () => Promise<T>) => {
    setBusy(name);
    setNotice(null);
    try {
      return await task();
    } catch (error) {
      setNotice({ kind: "error", message: error instanceof Error ? error.message : "Ocorreu um erro inesperado." });
      return null;
    } finally {
      setBusy("");
    }
  }, []);

  async function publish(event: FormEvent) {
    event.preventDefault();
    const text = postText.trim();
    if (!text) return;
    const result = await run("publish", () => dashboardRequest<{ postId: string }>(session, { action: "publish", text }));
    if (result) {
      setPostText("");
      setNotice({ kind: "success", message: "Publicação enviada com sucesso." });
      void loadOwnThreads();
    }
  }

  async function searchThreads(event: FormEvent) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    const result = await run("search", () => dashboardRequest<{ data: ThreadItem[] }>(session, { action: "search", query }));
    if (result) setSearchResults(result.data);
  }

  async function loadOwnThreads() {
    const result = await run("threads", () => dashboardRequest<{ data: ThreadItem[] }>(session, { action: "threads" }));
    if (result) setOwnThreads(result.data);
  }

  async function loadReplies(thread: ThreadItem) {
    setSelectedThread(thread);
    const result = await run("replies", () => dashboardRequest<{ data: ThreadItem[] }>(session, {
      action: "replies",
      threadId: thread.id,
    }));
    if (result) setReplies(result.data);
  }

  async function sendReply(event: FormEvent) {
    event.preventDefault();
    if (!replyTarget || !replyText.trim()) return;
    const result = await run("reply", () => dashboardRequest<{ postId: string }>(session, {
      action: "reply",
      threadId: replyTarget.id,
      text: replyText.trim(),
    }));
    if (result) {
      setReplyText("");
      setReplyTarget(null);
      setNotice({ kind: "success", message: "Resposta publicada com sucesso." });
    }
  }

  async function disconnect() {
    const confirmed = window.confirm("Deseja desconectar a conta do Threads e revogar o acesso do aplicativo?");
    if (!confirmed) return;
    const result = await run("disconnect", () => dashboardRequest<{ success: boolean }>(session, { action: "disconnect" }));
    if (result) {
      clearSession();
      setNotice({ kind: "success", message: "Conta desconectada e acesso revogado." });
    }
  }

  const characterCount = useMemo(() => `${postText.length}/500`, [postText.length]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-lime-300 selection:text-black">
      <SEOHead
        title="Threads Autopilot | Canta Já"
        description="Painel seguro para publicar, pesquisar e responder no Threads com a API oficial da Meta."
        canonical="https://cantaja.com.br/threads-autopilot"
      />
      <MetaHeader showNavLinks={false} />

      <main>
        <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-28 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[12%] top-10 h-64 w-64 rounded-full bg-lime-300/10 blur-[110px]" />
            <div className="absolute right-[8%] top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-[120px]" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-4xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-lime-200">
                <ShieldCheck className="h-4 w-4" /> API oficial do Threads
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Controle seu conteúdo sem perder sua voz.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
                Publique textos, encontre conversas relevantes e responda com contexto em um painel conectado à API oficial da Meta.
              </p>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {loadingStatus ? (
                <div className="inline-flex items-center gap-2 text-sm text-white/55">
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Verificando conexão
                </div>
              ) : connected ? (
                <>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/[0.08] px-4 py-2 text-sm text-emerald-200">
                    <Check className="h-4 w-4" /> Conectado como @{account?.username || account?.id}
                  </div>
                  <button
                    type="button"
                    onClick={() => void loadStatus()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:border-white/25 hover:text-white"
                  >
                    <RefreshCw className="h-4 w-4" /> Atualizar
                  </button>
                </>
              ) : (
                <a
                  href={OAUTH_START_URL}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-200"
                >
                  <Link2 className="h-4 w-4" /> Conectar conta do Threads <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            {notice ? (
              <div className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 text-sm ${
                notice.kind === "success"
                  ? "border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-100"
                  : "border-red-300/20 bg-red-300/[0.06] text-red-100"
              }`}>
                {notice.kind === "success" ? <Check className="mt-0.5 h-4 w-4" /> : <CircleAlert className="mt-0.5 h-4 w-4" />}
                <span>{notice.message}</span>
              </div>
            ) : null}

            {!connected ? (
              <div className="grid gap-5 lg:grid-cols-3">
                {[
                  ["1", "Conecte sua conta", "A autorização acontece no Threads e pode ser revogada quando quiser."],
                  ["2", "Use as ferramentas", "Publique, pesquise conversas públicas e leia respostas em um único lugar."],
                  ["3", "Mantenha o controle", "Nada é publicado sem uma ação iniciada no painel ou uma automação previamente configurada."],
                ].map(([step, title, body]) => (
                  <div key={step} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                    <span className="text-xs font-semibold text-lime-200">ETAPA {step}</span>
                    <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                    <p className="mt-3 text-sm leading-6 text-white/50">{body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-2">
                <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-lime-300/10 p-2.5 text-lime-200"><Send className="h-5 w-5" /></div>
                    <div><p className="text-xs uppercase tracking-[0.14em] text-white/40">Publicação</p><h2 className="text-xl font-semibold">Criar texto</h2></div>
                  </div>
                  <form onSubmit={publish}>
                    <textarea
                      value={postText}
                      onChange={(event) => setPostText(event.target.value.slice(0, 500))}
                      rows={8}
                      placeholder="Escreva de forma direta, humana e útil."
                      className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/40"
                    />
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-xs text-white/35">{characterCount}</span>
                      <button disabled={!postText.trim() || busy === "publish"} className="inline-flex items-center gap-2 rounded-full bg-lime-200 px-4 py-2.5 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40">
                        {busy === "publish" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Publicar
                      </button>
                    </div>
                  </form>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-300/10 p-2.5 text-cyan-200"><Search className="h-5 w-5" /></div>
                    <div><p className="text-xs uppercase tracking-[0.14em] text-white/40">Descoberta</p><h2 className="text-xl font-semibold">Pesquisar publicações</h2></div>
                  </div>
                  <form onSubmit={searchThreads} className="flex gap-2">
                    <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Exemplo: preciso de um site" className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-cyan-300/40" />
                    <button disabled={!searchQuery.trim() || busy === "search"} className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-black disabled:opacity-40">{busy === "search" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}</button>
                  </form>
                  <div className="mt-5 grid max-h-[430px] gap-3 overflow-y-auto pr-1">
                    {searchResults.length ? searchResults.map((item) => <ThreadCard key={item.id} item={item} actionLabel="Responder" onAction={() => setReplyTarget(item)} />) : <p className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-white/35">Pesquise um tema para encontrar publicações públicas recentes.</p>}
                  </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7 xl:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3"><div className="rounded-xl bg-violet-300/10 p-2.5 text-violet-200"><MessageCircleReply className="h-5 w-5" /></div><div><p className="text-xs uppercase tracking-[0.14em] text-white/40">Conversas</p><h2 className="text-xl font-semibold">Ler respostas</h2></div></div>
                    <button type="button" onClick={() => void loadOwnThreads()} disabled={busy === "threads"} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/65 transition hover:border-white/25 hover:text-white disabled:opacity-40">{busy === "threads" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} Carregar publicações</button>
                  </div>
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <div className="grid max-h-[500px] gap-3 overflow-y-auto pr-1">{ownThreads.length ? ownThreads.map((item) => <ThreadCard key={item.id} item={item} actionLabel="Ver respostas" onAction={() => void loadReplies(item)} />) : <p className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-white/35">Carregue suas publicações para selecionar uma conversa.</p>}</div>
                    <div className="grid max-h-[500px] gap-3 overflow-y-auto pr-1">{selectedThread ? <p className="text-xs uppercase tracking-[0.14em] text-white/35">Respostas da publicação selecionada</p> : null}{replies.length ? replies.map((item) => <ThreadCard key={item.id} item={item} actionLabel="Responder" onAction={() => setReplyTarget(item)} />) : <p className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-white/35">As respostas aparecerão aqui.</p>}</div>
                  </div>
                </section>
              </div>
            )}

            <section className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
                <h2 className="text-2xl font-semibold">Instruções para análise da Meta</h2>
                <ol className="mt-5 grid gap-3 text-sm leading-6 text-white/60">
                  <li>1. Clique em Conectar conta do Threads e autorize as cinco permissões solicitadas.</li>
                  <li>2. Use Criar texto para publicar uma mensagem de teste.</li>
                  <li>3. Pesquise uma palavra-chave pública e abra um resultado.</li>
                  <li>4. Carregue suas publicações, selecione uma delas e leia as respostas.</li>
                  <li>5. Use Responder para publicar uma resposta contextual.</li>
                  <li>6. Use Desconectar conta para revogar o acesso concedido ao aplicativo.</li>
                </ol>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
                <h2 className="text-2xl font-semibold">Privacidade e controle</h2>
                <p className="mt-4 text-sm leading-6 text-white/55">O token de acesso fica criptografado no servidor. Ele não é exposto no código da página nem armazenado no navegador.</p>
                <div className="mt-6 grid gap-3 text-sm">
                  <a href="/threads-autopilot/privacidade" className="inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-white/65 transition hover:border-white/25 hover:text-white">Política de privacidade <ArrowRight className="h-4 w-4" /></a>
                  <a href="/threads-autopilot/exclusao-de-dados" className="inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-white/65 transition hover:border-white/25 hover:text-white">Exclusão de dados <ArrowRight className="h-4 w-4" /></a>
                </div>
                {connected ? <button type="button" onClick={() => void disconnect()} disabled={busy === "disconnect"} className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-300/20 px-4 py-2.5 text-sm text-red-200 transition hover:bg-red-300/[0.06] disabled:opacity-40">{busy === "disconnect" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Unplug className="h-4 w-4" />} Desconectar conta</button> : null}
              </div>
            </section>

            <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-200">Permissões da API</p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Somente o necessário para a operação descrita.</h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <div className="hidden grid-cols-[0.7fr_1.3fr] bg-white/[0.05] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/45 sm:grid">
                  <span>Permissão</span><span>Finalidade</span>
                </div>
                {permissions.map(([scope, purpose]) => (
                  <div key={scope} className="grid gap-2 border-t border-white/10 px-5 py-4 first:border-t-0 sm:grid-cols-[0.7fr_1.3fr]">
                    <code className="break-all text-sm text-lime-200">{scope}</code>
                    <p className="text-sm leading-6 text-white/55">{purpose}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-white/45">As permissões são usadas exclusivamente no perfil próprio conectado. O Threads Autopilot não solicita acesso a contas de clientes, mensagens privadas ou conteúdo privado.</p>
            </section>

            <section className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Dados e segurança</p>
                <h2 className="mt-3 text-2xl font-semibold">Dados mínimos, finalidade definida.</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/55">
                  <li>Tokens de acesso ficam armazenados como segredos criptografados no servidor.</li>
                  <li>Senhas do Threads não são coletadas.</li>
                  <li>Mensagens privadas e conteúdo privado não são acessados.</li>
                  <li>Dados não são vendidos, alugados ou usados para criar perfis publicitários.</li>
                  <li>O responsável pode revogar a autorização a qualquer momento.</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-200">Responsável</p>
                <h2 className="mt-3 text-2xl font-semibold">Desenvolvido e operado pela KaaGabriell.</h2>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div><dt className="text-white/35">Nome empresarial</dt><dd className="mt-1 text-white/70">56.253.940 KAUA HENRIQUE SOUZA GABRIEL</dd></div>
                  <div><dt className="text-white/35">CNPJ</dt><dd className="mt-1 text-white/70">56.253.940/0001-47</dd></div>
                  <div><dt className="text-white/35">País</dt><dd className="mt-1 text-white/70">Brasil</dd></div>
                  <div><dt className="text-white/35">Contato</dt><dd className="mt-1"><a href="mailto:kauabrgamer900@gmail.com" className="text-lime-200 hover:underline">kauabrgamer900@gmail.com</a></dd></div>
                </dl>
              </div>
            </section>
          </div>
        </section>
      </main>

      {replyTarget ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#101010] p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.14em] text-white/35">Responder publicação</p><h2 className="mt-1 text-xl font-semibold">{replyTarget.username ? `@${replyTarget.username}` : "Threads"}</h2></div><button type="button" onClick={() => setReplyTarget(null)} className="rounded-full border border-white/10 p-2 text-white/50 hover:text-white"><LogOut className="h-4 w-4" /></button></div>
            <p className="mt-4 max-h-28 overflow-y-auto rounded-2xl bg-white/[0.035] p-4 text-sm leading-6 text-white/55">{replyTarget.text}</p>
            <form onSubmit={sendReply} className="mt-4">
              <textarea value={replyText} onChange={(event) => setReplyText(event.target.value.slice(0, 500))} rows={5} placeholder="Escreva uma resposta curta e contextual." className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 outline-none placeholder:text-white/25 focus:border-lime-300/40" />
              <div className="mt-3 flex justify-end"><button disabled={!replyText.trim() || busy === "reply"} className="inline-flex items-center gap-2 rounded-full bg-lime-200 px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-40">{busy === "reply" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <MessageCircleReply className="h-4 w-4" />} Publicar resposta</button></div>
            </form>
          </motion.div>
        </div>
      ) : null}

      <MetaFooter />
    </div>
  );
}
