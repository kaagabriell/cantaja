import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MessageCircle, Clock, MoreHorizontal, Phone, Loader2, Link as LinkIcon, CheckCircle2, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const COLUMNS = [
  { id: 'Aguardando Contato', title: 'Aguardando Contato' },
  { id: 'Em Negociação', title: 'Em Negociação' },
  { id: 'Aguardando Pagamento', title: 'Aguardando Pagamento' },
  { id: 'Pago', title: 'Pago / Briefing' },
];

export default function CRM() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopying, setIsCopying] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const copyFormLink = () => {
    const url = `${window.location.origin}/f/musica`;
    navigator.clipboard.writeText(url);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  useEffect(() => {
    fetchPedidos();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pedidos'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchPedidos();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          console.log('Real-time update received (leads):', payload);
          fetchPedidos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchPedidos() {
    try {
      setIsRefreshing(true);
      const { data, error } = await supabase
        .from('pedidos')
        .select(`
          *,
          leads (
            name,
            whatsapp
          )
        `)
        .in('status', COLUMNS.map(c => c.id))
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        // Filter out 'Pago' orders from previous days
        const today = new Date().toDateString();
        const filteredData = data.filter(p => {
          if (p.status === 'Pago') {
            const paidAt = p.form_data?.paid_at;
            if (paidAt) {
              return new Date(paidAt).toDateString() === today;
            }
            // Fallback to created_at if paid_at is missing
            return new Date(p.created_at).toDateString() === today;
          }
          return true;
        });
        setPedidos(filteredData);
      }
    } catch (error) {
      console.error('Error fetching CRM data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId;
    
    // Optimistic update
    setPedidos(prev => prev.map(p => 
      p.id === draggableId ? { ...p, status: newStatus } : p
    ));

    try {
      const pedidoToUpdate = pedidos.find(p => p.id === draggableId);
      let updatedFormData = pedidoToUpdate?.form_data || {};
      
      if (newStatus === 'Pago') {
        // Set paid_at only if it doesn't exist or if we want to refresh it
        updatedFormData = {
          ...updatedFormData,
          paid_at: new Date().toISOString()
        };
      } else {
        // Remove paid_at if moved out of Pago to avoid counting as sale
        const { paid_at, ...rest } = updatedFormData;
        updatedFormData = rest;
      }

      const { data, error } = await supabase
        .from('pedidos')
        .update({ 
          status: newStatus,
          form_data: updatedFormData
        })
        .eq('id', draggableId)
        .select();

      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error('Atualização bloqueada pelo banco de dados. Verifique as políticas de segurança (RLS) no Supabase.');
      }
    } catch (error: any) {
      console.error('Error updating status:', error);
      alert(error.message || 'Erro ao atualizar o status.');
      // Revert on error
      fetchPedidos();
    }
  };

  const getPedidosByStatus = (status: string) => {
    return pedidos.filter(p => p.status === status);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-brand-brown-900">CRM Comercial</h1>
          <p className="text-brand-brown-500 mt-1">Gerencie seus leads e feche mais vendas.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPedidos}
            title="Atualizar leads"
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
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-brand-gold-500" />
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 h-full items-start">
              {COLUMNS.map((column) => {
                const columnPedidos = getPedidosByStatus(column.id);

                return (
                  <div key={column.id} className="w-80 shrink-0 flex flex-col h-full max-h-full">
                    <div className="bg-brand-brown-50 rounded-t-xl p-3 border-t border-x border-brand-brown-100 flex items-center justify-between">
                      <h3 className="font-semibold text-brand-brown-800 text-sm">{column.title}</h3>
                      <Badge variant="secondary" className="bg-white">{columnPedidos.length}</Badge>
                    </div>
                    
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex-1 overflow-y-auto p-2 bg-brand-brown-50/50 border-x border-b border-brand-brown-100 rounded-b-xl transition-colors min-h-[150px] ${
                            snapshot.isDraggingOver ? 'bg-brand-brown-100/50' : ''
                          }`}
                        >
                          {columnPedidos.map((pedido, index) => (
                            <Draggable key={pedido.id} {...({ draggableId: pedido.id, index } as any)}>
                              {(provided, snapshot) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`p-3 mb-2 cursor-grab active:cursor-grabbing hover:border-brand-gold-300 transition-all ${
                                    snapshot.isDragging ? 'shadow-lg ring-2 ring-brand-gold-400 rotate-2' : ''
                                  }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                      <span className="font-medium text-sm text-brand-brown-900">{pedido.leads?.name || 'Cliente'}</span>
                                      <button className="text-brand-brown-400 hover:text-brand-brown-700">
                                        <MoreHorizontal size={16} />
                                      </button>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 mb-3">
                                      <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-5">
                                        {pedido.form_data?.q1 || 'Música'}
                                      </Badge>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-brand-brown-500 border-t border-brand-brown-50 pt-2 mt-2">
                                      <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {formatDate(pedido.created_at)}
                                      </div>
                                      <div className="flex gap-1">
                                        <button 
                                          className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors" 
                                          title="WhatsApp"
                                          onClick={() => {
                                            if (pedido.leads?.whatsapp) {
                                              window.open(`https://wa.me/${pedido.leads.whatsapp.replace(/\D/g, '')}`, '_blank');
                                            }
                                          }}
                                        >
                                          <MessageCircle size={14} />
                                        </button>
                                      </div>
                                    </div>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
