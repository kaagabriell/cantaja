import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, Filter, MessageCircle, Mail, UserPlus, Loader2, Pencil, X, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Clientes() {
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [clientToDelete, setClientToDelete] = useState<any>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchClients();

    const channel = supabase
      .channel('clientes-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        () => fetchClients()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pedidos' },
        () => fetchClients()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchClients() {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          pedidos (
            id,
            status,
            form_data,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedClients = data.map(lead => {
          // Sort pedidos by created_at descending
          const sortedPedidos = lead.pedidos?.sort((a: any, b: any) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ) || [];
          
          const totalSpent = sortedPedidos.reduce((acc: number, p: any) => 
            acc + (Number(p.form_data?.valor_cobrado) || 0), 0
          );

          const isPaid = sortedPedidos.some((p: any) => p.status === 'Pago' || p.status === 'Entregue');

          return {
            id: lead.id,
            name: lead.name,
            phone: lead.whatsapp,
            email: lead.email,
            origin: 'Formulário Público',
            totalSpent,
            ordersCount: sortedPedidos.length,
            latestOrder: sortedPedidos[0],
            lastInteraction: lead.created_at,
            createdAt: lead.created_at,
            status: isPaid ? 'Pago' : 'Não Pago'
          };
        });
        setClients(formattedClients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const formatCurrencyInput = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    const amount = parseInt(numbers, 10) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const handleUpdateValue = async (latestOrder: any) => {
    if (!latestOrder) {
      alert('Este cliente não possui pedidos para adicionar valor.');
      return;
    }
    
    setSelectedOrder(latestOrder);
    const initialValue = latestOrder.form_data?.valor_cobrado || 0;
    setEditValue(formatCurrencyInput(initialValue.toFixed(2).replace('.', '')));
    setIsEditModalOpen(true);
  };

  const submitUpdateValue = async () => {
    if (!selectedOrder) return;

    const cleanValue = editValue.replace(/[R$\s.]/g, '').replace(',', '.');
    const numValue = parseFloat(cleanValue);
    
    if (!isNaN(numValue)) {
      const updatedFormData = { ...selectedOrder.form_data, valor_cobrado: numValue };
      try {
        const { data, error } = await supabase
          .from('pedidos')
          .update({ form_data: updatedFormData })
          .eq('id', selectedOrder.id)
          .select();
          
        if (error) throw error;
        
        if (!data || data.length === 0) {
          throw new Error('Atualização bloqueada pelo banco de dados. Verifique as políticas de segurança (RLS) no Supabase.');
        }
        
        setIsEditModalOpen(false);
        fetchClients();
      } catch (error: any) {
        console.error('Error updating value:', error);
        alert(error.message || 'Erro ao atualizar o valor.');
      }
    } else {
      alert('Valor inválido. Digite apenas números.');
    }
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete) return;

    try {
      setIsLoading(true);
      // First delete associated orders if any
      const { error: pedidosError } = await supabase
        .from('pedidos')
        .delete()
        .eq('lead_id', clientToDelete.id);

      if (pedidosError) throw pedidosError;

      // Then delete the lead
      const { error: leadError } = await supabase
        .from('leads')
        .delete()
        .eq('id', clientToDelete.id);

      if (leadError) throw leadError;

      setIsDeleteModalOpen(false);
      setClientToDelete(null);
      fetchClients();
    } catch (error: any) {
      console.error('Error deleting client:', error);
      alert(error.message || 'Erro ao excluir o cliente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-brand-brown-900">Clientes</h1>
          <p className="text-brand-brown-500 mt-1">Gestão de relacionamento e histórico de compras.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-brown-400 h-4 w-4" />
              <Input placeholder="Buscar por nome, email ou telefone..." className="pl-9" />
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
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Contato</th>
                  <th className="px-4 py-3 font-medium">Data</th>
                  <th className="px-4 py-3 font-medium">Histórico</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-brand-brown-500">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                      Carregando clientes...
                    </td>
                  </tr>
                ) : clients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-brand-brown-500">
                      Nenhum cliente encontrado.
                    </td>
                  </tr>
                ) : (
                  clients.map((client) => (
                    <tr key={client.id} className="border-b border-brand-brown-50 hover:bg-brand-brown-50/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-brand-gold-100 flex items-center justify-center text-brand-gold-700 font-medium font-heading">
                            {client.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-brand-brown-900">{client.name}</div>
                            <div className="text-xs text-brand-brown-400" title={client.id}>
                              {client.id.substring(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-brand-brown-600 text-xs">
                            <MessageCircle className="h-3 w-3 mr-1" /> {client.phone}
                          </div>
                          <div className="flex items-center text-brand-brown-600 text-xs">
                            <Mail className="h-3 w-3 mr-1" /> {client.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-brand-brown-600">
                        {formatDate(client.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-brand-brown-900">{formatCurrency(client.totalSpent)}</span>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => handleUpdateValue(client.latestOrder)}
                              className="text-brand-brown-400 hover:text-brand-gold-600 transition-colors"
                              title="Editar valor cobrado"
                            >
                              <Pencil size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-brand-brown-500">{client.ordersCount} pedido(s)</div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={client.status === 'Pago' ? 'success' : 'destructive' as any}
                               className={client.status === 'Pago' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}>
                          {client.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 gap-2 text-green-700 border-green-200 hover:bg-green-50 hover:text-green-800"
                            onClick={() => window.open(`https://wa.me/${client.phone.replace(/\D/g, '')}`, '_blank')}
                          >
                            <MessageCircle className="h-4 w-4" />
                            Mensagem
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setClientToDelete(client);
                              setIsDeleteModalOpen(true);
                            }}
                            title="Excluir cliente"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-brand-brown-900">Atualizar Valor Cobrado</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="valor" className="text-sm font-medium text-brand-brown-700">
                Valor (R$)
              </label>
              <Input
                id="valor"
                type="text"
                placeholder="R$ 0,00"
                value={editValue}
                onChange={(e) => setEditValue(formatCurrencyInput(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={submitUpdateValue} className="bg-brand-gold-500 hover:bg-brand-gold-600 text-white">
              Salvar Valor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-brand-brown-900">Excluir Cliente</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-brand-brown-600">
              Tem certeza que deseja excluir permanentemente o cliente <span className="font-bold">{clientToDelete?.name}</span>? 
              Esta ação não pode ser desfeita e todos os pedidos associados também serão removidos.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleDeleteClient} className="bg-red-500 hover:bg-red-600 text-white">
              Excluir Permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
