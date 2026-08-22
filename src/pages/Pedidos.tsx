import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, Filter, Eye, Music, Clock, CheckCircle2, AlertCircle, Loader2, X, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AnimatePresence, motion } from 'motion/react';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Em Produção': return <Badge variant="warning" className="bg-blue-100 text-blue-800">Em Produção</Badge>;
    case 'Revisão': return <Badge variant="warning">Em Revisão</Badge>;
    case 'Briefing Aprovado': return <Badge variant="secondary">Briefing Aprovado</Badge>;
    case 'Entregue': return <Badge variant="success">Entregue</Badge>;
    case 'Atrasado': return <Badge variant="danger">Atrasado</Badge>;
    case 'Aguardando Contato': return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Aguardando Contato</Badge>;
    default: return <Badge>{status}</Badge>;
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'Alta': return <AlertCircle size={16} className="text-red-500" />;
    case 'Média': return <Clock size={16} className="text-amber-500" />;
    case 'Baixa': return <CheckCircle2 size={16} className="text-green-500" />;
    default: return null;
  }
};

export default function Pedidos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('pedidos-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pedidos' },
        () => fetchOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchOrders() {
      try {
        const { data, error } = await supabase
          .from('pedidos')
          .select(`
            *,
            leads (
              name
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const getYYYYMMDD = (d: Date) => {
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          };
          const todayStr = getYYYYMMDD(new Date());
          
          const filteredData = data.filter(order => {
            // Show all orders that are not yet delivered, or were paid today
            if (order.status === 'Entregue') {
              const deliveredAt = order.updated_at;
              return new Date(deliveredAt).toDateString() === new Date().toDateString();
            }
            return true;
          });

          const formattedOrders = filteredData.map(order => ({
            id: order.id,
            client: order.leads?.name || 'Cliente Desconhecido',
            category: order.form_data?.q1 || 'Não especificado',
            status: order.status,
            priority: 'Média',
            deadline: new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            value: Number(order.form_data?.valor_cobrado || 0),
            responsible: 'Não atribuído',
            prompt: order.generated_prompt || 'Prompt ainda não gerado',
            paidAt: order.form_data?.paid_at,
            formData: order.form_data
          }));
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-brand-brown-900">Pedidos</h1>
          <p className="text-brand-brown-500 mt-1">Acompanhamento operacional das músicas.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-brown-400 h-4 w-4" />
              <Input placeholder="Buscar por cliente, ID ou categoria..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="shrink-0">
                <Filter className="mr-2 h-4 w-4" /> Filtros
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-brand-brown-500 uppercase bg-brand-brown-50/50 border-b border-brand-brown-100">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Cliente / Categoria</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Prazo / Prioridade</th>
                  <th className="px-4 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-brand-brown-500">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                      Carregando pedidos...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-brand-brown-500">
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-brand-brown-50 hover:bg-brand-brown-50/30 transition-colors">
                      <td className="px-4 py-4 font-medium text-brand-brown-900" title={order.id}>
                        {order.id.substring(0, 8)}...
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-brand-brown-900">{order.client}</div>
                        <div className="text-xs text-brand-brown-500">{order.category}</div>
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(order.priority)}
                          <span className={order.status === 'Atrasado' ? 'text-red-600 font-medium' : ''}>
                            {formatDate(order.deadline)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => setSelectedPrompt(order.prompt)}
                            title="Ver Prompt"
                          >
                            <Eye className="h-4 w-4 mr-1" /> Prompt
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm text-brand-brown-500">
            <span>Mostrando {orders.length} pedidos</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm" disabled>Próxima</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {selectedPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-brand-brown-100 bg-brand-brown-50/50">
                <h3 className="font-heading font-semibold text-brand-brown-900 text-lg">Prompt Gerado</h3>
                <button 
                  onClick={() => setSelectedPrompt(null)}
                  className="text-brand-brown-400 hover:text-brand-brown-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                <pre className="whitespace-pre-wrap text-sm text-brand-brown-700 font-mono bg-brand-brown-50 p-4 rounded-lg border border-brand-brown-100">
                  {selectedPrompt}
                </pre>
              </div>
              <div className="p-4 border-t border-brand-brown-100 bg-brand-brown-50/50 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedPrompt(null)}>
                  Fechar
                </Button>
                <Button 
                  className="bg-brand-gold-500 hover:bg-brand-gold-600 text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedPrompt);
                    alert('Prompt copiado para a área de transferência!');
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copiar
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
