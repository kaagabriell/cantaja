import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'motion/react';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
const logoUrl = "https://res.cloudinary.com/dxbgfje1t/image/upload/f_auto,q_auto/logo_-_moreira_1_denxi8";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige-100 flex flex-col items-center p-4 overscroll-none selection:bg-brand-gold-100">
      {/* Header with Logo */}
      <header className="w-full max-w-[200px] md:max-w-[240px] pt-0 -mt-12 md:-mt-20 shrink-0">
        <img 
          src={logoUrl} 
          alt="CantaJa Logo" 
          className="w-full h-auto object-contain invert"
          referrerPolicy="no-referrer"
        />
      </header>

      {/* Main Content Centered */}
      <main className="flex-1 flex items-center justify-center w-full pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold text-brand-brown-900">Painel Administrativo</h1>
            <p className="text-brand-brown-500 mt-2">Entre com suas credenciais para acessar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
                <AlertCircle size={18} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-brand-brown-700 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown-400" size={18} />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-11 h-12 bg-brand-brown-50/30 border-brand-brown-100 focus-visible:ring-brand-gold-400 text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-brand-brown-700 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown-400" size={18} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 bg-brand-brown-50/30 border-brand-brown-100 focus-visible:ring-brand-gold-400 text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full h-12 text-lg font-medium shadow-md"
              disabled={loading}
            >
              {loading ? (
                <>Entrando... <Loader2 className="ml-2 h-5 w-5 animate-spin" /></>
              ) : (
                'Acessar Painel'
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-brand-brown-400 mt-8">
            Acesso restrito a administradores autorizados.
          </p>
        </motion.div>
      </main>
      
      {/* Footer spacer */}
      <div className="shrink-0 h-12" />
    </div>
  );
}
