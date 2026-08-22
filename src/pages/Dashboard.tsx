import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { 
  TrendingUp, 
  Users, 
  Music, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  DollarSign,
  Calendar,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export default function Dashboard() {
  const [period, setPeriod] = useState('today'); // 'today', 'month', 'year', 'all'
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  });

  const [stats, setStats] = useState({
    totalLeads: 0,
    totalPedidos: 0,
    faturamento: 0,
    vendasRealizadas: 0,
    emProducao: 0,
    ticketMedio: 0,
    aguardandoContato: 0,
    emNegociacao: 0,
    aguardandoPagamento: 0,
  });

  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [isCopying, setIsCopying] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const copyFormLink = () => {
    const url = `${window.location.origin}/f/musica`;
    navigator.clipboard.writeText(url);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  async function fetchDashboardData() {
    try {
      setIsRefreshing(true);
      // Fetch leads
      const { data: leads } = await supabase
        .from('leads')
        .select('created_at');

      // Fetch pedidos
      const { data: pedidos } = await supabase
        .from('pedidos')
        .select('status, created_at, form_data');

        const now = new Date();
        const [selYear, selMonth, selDay] = selectedDate.split('-');

        const getYYYYMMDD = (d: Date) => {
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        };
        
        // Use selectedDate for 'today' comparison as it's already YYYY-MM-DD
        const todayStr = selectedDate; 
        
        // Calculate yesterday relative to the current real time
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterdayStr = getYYYYMMDD(yesterdayDate);

        // Filter leads
        const filteredLeads = (leads || []).filter(l => {
          if (period === 'all') return true;
          const date = new Date(l.created_at);
          const dateStr = getYYYYMMDD(date);
          
          if (period === 'today') {
            return dateStr === todayStr;
          }
          if (period === 'yesterday') {
            return dateStr === yesterdayStr;
          }
          if (period === 'month') {
            return date.getFullYear() === Number(selYear) && 
                   date.getMonth() === Number(selMonth) - 1;
          }
          if (period === 'year') {
            return date.getFullYear() === Number(selYear);
          }
          return true;
        });

        // Filter pedidos
        const filteredPedidos = (pedidos || []).filter(p => {
          if (period === 'all') return true;
          
          // Use paid_at for 'Pago' or 'Entregue', otherwise created_at
          const isSale = p.status === 'Pago' || p.status === 'Entregue';
          const dateValue = (isSale && p.form_data?.paid_at) ? new Date(p.form_data.paid_at) : new Date(p.created_at);
          const dateStr = getYYYYMMDD(dateValue);
          
          if (period === 'today') {
            return dateStr === todayStr;
          }
          if (period === 'yesterday') {
            return dateStr === yesterdayStr;
          }
          if (period === 'month') {
            return dateValue.getFullYear() === Number(selYear) && 
                   dateValue.getMonth() === Number(selMonth) - 1;
          }
          if (period === 'year') {
            return dateValue.getFullYear() === Number(selYear);
          }
          return true;
        });

        let faturamento = 0;
        let vendasRealizadas = 0;
        let emProducao = 0;
        let aguardandoContato = 0;
        let emNegociacao = 0;
        let aguardandoPagamento = 0;
        const catCounts: Record<string, number> = {};

        // Calculate performance metrics (period-based)
        filteredPedidos.forEach(p => {
          if (p.status === 'Pago' || p.status === 'Entregue') {
            vendasRealizadas++;
            const valor = p.form_data?.valor_cobrado;
            if (valor && !isNaN(Number(valor))) {
              faturamento += Number(valor);
            }
          }
          
          // Categorias (period-based)
          const cat = p.form_data?.q1 || 'Outros';
          catCounts[cat] = (catCounts[cat] || 0) + 1;
        });

        // Calculate snapshot metrics (all-time/current state)
        (pedidos || []).forEach(p => {
          if (p.status === 'Aguardando Contato') aguardandoContato++;
          if (p.status === 'Em Negociação') emNegociacao++;
          if (p.status === 'Aguardando Pagamento') aguardandoPagamento++;
          
          if (p.status !== 'Pago' && p.status !== 'Entregue' && p.status !== 'Cancelado') {
            emProducao++;
          }
        });

        const catData = Object.entries(catCounts)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        setStats({
          totalLeads: filteredLeads.length,
          totalPedidos: filteredPedidos.length,
          faturamento,
          vendasRealizadas,
          emProducao,
          ticketMedio: vendasRealizadas > 0 ? faturamento / vendasRealizadas : 0,
          aguardandoContato,
          emNegociacao,
          aguardandoPagamento,
        });
        
        setCategoryData(catData);

        // Revenue Chart Data - Always show the full year trend for the selected year
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const revByMonth = new Array(12).fill(0);
        const currentYear = Number(selYear);

        (pedidos || []).forEach(p => {
          if (p.status === 'Pago' || p.status === 'Entregue') {
            const dateValue = (p.form_data?.paid_at) ? new Date(p.form_data.paid_at) : new Date(p.created_at);
            if (dateValue.getFullYear() === currentYear) {
              const valor = Number(p.form_data?.valor_cobrado || 0);
              revByMonth[dateValue.getMonth()] += valor;
            }
          }
        });
        setRevenueData(months.map((m, i) => ({ name: m, total: revByMonth[i] })));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsRefreshing(false);
      }
    }

  useEffect(() => {
    fetchDashboardData();
    
    const channel = supabase
      .channel('dashboard-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos' }, () => fetchDashboardData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => fetchDashboardData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [period, selectedDate]);

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-brand-brown-900">Dashboard</h1>
          <p className="text-brand-brown-500 mt-1">Visão geral do seu negócio!</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchDashboardData}
            title="Atualizar dados"
            disabled={isRefreshing}
            className="flex items-center justify-center p-2 rounded-lg bg-white border border-brand-gold-200 shadow-sm hover:bg-brand-gold-50 transition-colors text-brand-brown-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 text-brand-gold-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={copyFormLink}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-brand-gold-200 shadow-sm hover:bg-brand-gold-50 transition-colors text-sm font-medium text-brand-brown-700"
          >
            {isCopying ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <LinkIcon className="h-4 w-4 text-brand-gold-500" />
            )}
            {isCopying ? 'Link Copiado!' : 'Link do Formulário'}
          </button>

          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-brand-brown-100 shadow-sm [&_select]:outline-none [&_input]:outline-none">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-transparent border-none text-sm font-medium text-brand-brown-700 focus:ring-0 focus:outline-none cursor-pointer"
          >
            <option value="today">Hoje</option>
            <option value="yesterday">Ontem</option>
            <option value="month">Este Mês</option>
            <option value="year">Este Ano</option>
            <option value="all">Todo o Período</option>
          </select>
          
          {period === 'today' && (
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-sm border-l border-brand-brown-100 pl-2 ml-2 bg-transparent text-brand-brown-600 focus:outline-none focus:ring-0"
            />
          )}
          {period === 'month' && (
            <input 
              type="month" 
              value={selectedDate.substring(0, 7)}
              onChange={(e) => setSelectedDate(e.target.value + '-01')}
              className="text-sm border-l border-brand-brown-100 pl-2 ml-2 bg-transparent text-brand-brown-600 focus:outline-none focus:ring-0"
            />
          )}
          {period === 'year' && (
            <input 
              type="number" 
              min="2020" max="2099" step="1"
              value={selectedDate.substring(0, 4)}
              onChange={(e) => setSelectedDate(e.target.value + '-01-01')}
              className="text-sm border-l border-brand-brown-100 pl-2 ml-2 bg-transparent text-brand-brown-600 focus:outline-none focus:ring-0 w-20"
            />
          )}
        </div>
      </div>
    </div>

      {/* Top Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/50 backdrop-blur-sm border-brand-gold-200/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-brand-brown-600 font-sans">Faturamento</CardTitle>
            <DollarSign className="h-4 w-4 text-brand-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-brown-900">{formatCurrency(stats.faturamento)}</div>
            <p className="text-xs text-brand-brown-400 mt-1">
              Receita total no período
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-brand-brown-600 font-sans">Vendas Realizadas</CardTitle>
            <Music className="h-4 w-4 text-brand-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-brown-900">{stats.vendasRealizadas}</div>
            <p className="text-xs text-brand-brown-400 mt-1">
              Ticket médio: {formatCurrency(stats.ticketMedio)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-brand-brown-600 font-sans">Novos Leads</CardTitle>
            <Users className="h-4 w-4 text-brand-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-brown-900">{stats.totalLeads}</div>
            <p className="text-xs text-brand-brown-400 mt-1">
              Total de contatos captados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-brand-brown-600 font-sans">Em Produção</CardTitle>
            <Clock className="h-4 w-4 text-brand-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-brown-900">{stats.emProducao}</div>
            <p className="text-xs text-brand-brown-400 flex items-center mt-1">
              {stats.emProducao === 0 ? 'Nenhum pedido pendente' : 'Pedidos sendo produzidos'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Receita ao longo do tempo</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full flex items-center justify-center text-brand-brown-400 text-sm [&_.recharts-wrapper]:outline-none">
              <ResponsiveContainer width="100%" height="100%" className="focus:outline-none">
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }} className="focus:outline-none">
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5A059" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#A8A29E" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    interval={1}
                  />
                  <YAxis 
                    stroke="#A8A29E" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    width={80}
                    tick={{ textAnchor: 'end', dx: -4 }}
                    tickFormatter={(value) => value === 0 ? '' : `R$${value/1000}k`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F0E6" />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Receita']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#C5A059" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                    activeDot={{ r: 6, fill: '#C5A059', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pedidos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center text-brand-brown-400 text-sm [&_.recharts-wrapper]:outline-none">
              <ResponsiveContainer width="100%" height="100%" className="focus:outline-none">
                <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }} className="focus:outline-none">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    fontSize={12} 
                    width={110}
                    tick={{ textAnchor: 'start', dx: -100 }}
                  />
                  <Tooltip 
                    cursor={false}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#4A3628" radius={[0, 4, 4, 0]} barSize={24} activeBar={{ stroke: 'none', outline: 'none' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Status Operacional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-brown-600">Entregues no prazo</span>
                <span className="font-medium text-brand-brown-900 text-sm">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-brown-600">Revisões solicitadas</span>
                <span className="font-medium text-brand-brown-900 text-sm">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-brown-600">Tempo médio prod.</span>
                <span className="font-medium text-brand-brown-900 text-sm">-</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Funil Comercial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-brown-600">Aguardando Contato</span>
                <span className="font-medium text-brand-brown-900 text-sm">{stats.aguardandoContato}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-brown-600">Em Negociação</span>
                <span className="font-medium text-brand-brown-900 text-sm">{stats.emNegociacao}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-brown-600">Aguardando Pagamento</span>
                <span className="font-medium text-brand-brown-900 text-sm">{stats.aguardandoPagamento}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between transition-colors text-left opacity-50 cursor-not-allowed">
                <span className="text-sm text-brand-brown-600">Contatar novos leads</span>
                <span className="font-medium text-brand-brown-900 text-sm">{stats.aguardandoContato}</span>
              </button>
              <button className="w-full flex items-center justify-between transition-colors text-left opacity-50 cursor-not-allowed">
                <span className="text-sm text-brand-brown-600">Aprovar briefings</span>
                <span className="font-medium text-brand-brown-900 text-sm">0</span>
              </button>
              <button className="w-full flex items-center justify-between transition-colors text-left opacity-50 cursor-not-allowed">
                <span className="text-sm text-brand-brown-600">Entregas de hoje</span>
                <span className="font-medium text-brand-brown-900 text-sm">0</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
