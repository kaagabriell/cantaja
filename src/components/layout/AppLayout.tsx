import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Music, 
  KanbanSquare, 
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
const logoUrl = "https://res.cloudinary.com/dxbgfje1t/image/upload/f_auto,q_auto/logo_-_moreira_1_denxi8";
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: KanbanSquare, label: 'CRM', path: '/crm' },
  { icon: Music, label: 'Pedidos', path: '/pedidos' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
];

export function AppLayout() {
  const [isDesktopHovered, setIsDesktopHovered] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Close sidebar when route changes
  React.useEffect(() => {
    setIsDesktopHovered(false);
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  // Don't show sidebar on public form routes
  if (location.pathname.startsWith('/f/')) {
    return <Outlet />;
  }

  const SidebarContent = ({ isExpanded, isMobile }: { isExpanded: boolean, isMobile?: boolean }) => (
    <div className="flex h-full w-[260px] flex-col bg-white">
      <div className="flex h-24 items-center px-4 border-b border-brand-brown-50 shrink-0 relative">
        {/* Menu Icon (Visible when collapsed on Desktop) */}
        <div className={cn(
          "absolute left-0 w-[72px] h-full flex items-center justify-center transition-opacity duration-300",
          isExpanded || isMobile ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <Menu size={24} className="text-brand-brown-500" />
        </div>

        {/* Logo and Name (Visible when expanded or on Mobile) */}
        <div className={cn(
          "flex items-center gap-3 w-full transition-opacity duration-300",
          !isExpanded && !isMobile ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <img 
            src={logoUrl} 
            alt="CantaJa Logo" 
            className="w-full max-w-[200px] h-auto object-contain mx-auto invert"
            referrerPolicy="no-referrer"
          />
          {isMobile && (
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="ml-auto p-2 rounded-md text-brand-brown-500 hover:bg-brand-brown-50"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              setIsDesktopHovered(false);
              setIsMobileSidebarOpen(false);
            }}
            className={({ isActive }) => cn(
              "flex items-center gap-3 py-2.5 rounded-lg transition-all duration-200 group relative",
              "pl-[18px] pr-3",
              isActive 
                ? "bg-brand-brown-50 text-brand-gold-600 font-medium" 
                : "text-brand-brown-600 hover:bg-brand-brown-50/50 hover:text-brand-brown-900"
            )}
          >
            <item.icon size={20} className="shrink-0" />
            <span className={cn(
              "whitespace-nowrap transition-opacity duration-300",
              !isExpanded && !isMobile ? "opacity-0" : "opacity-100"
            )}>
              {item.label}
            </span>
            
            {/* Tooltip for collapsed state */}
            {!isExpanded && !isMobile && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-brand-brown-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="py-4 pl-[18px] pr-4 shrink-0 border-t border-brand-brown-50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-full bg-brand-beige-200 flex items-center justify-center text-brand-brown-800 font-medium shrink-0">
              {user?.email?.[0].toUpperCase() || 'A'}
            </div>
            <div className={cn(
              "flex flex-col overflow-hidden transition-opacity duration-300",
              !isExpanded && !isMobile ? "opacity-0" : "opacity-100"
            )}>
              <span className="text-sm font-medium text-brand-brown-900 truncate">
                {user?.user_metadata?.full_name || 'Admin'}
              </span>
              <span className="text-xs text-brand-brown-500 truncate">
                {user?.email}
              </span>
            </div>
          </div>
          
          {(isExpanded || isMobile) && (
            <button 
              onClick={handleLogout}
              className="p-2 rounded-md text-brand-brown-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-brand-beige-100 overflow-hidden overscroll-none selection:bg-brand-gold-100">
      {/* Desktop Sidebar Container (Fixed Width) */}
      <div className="hidden md:block w-[72px] shrink-0 z-30 relative">
        <motion.aside 
          onMouseEnter={() => setIsDesktopHovered(true)}
          onMouseLeave={() => setIsDesktopHovered(false)}
          onPointerLeave={() => setIsDesktopHovered(false)}
          initial={false}
          animate={{ width: isDesktopHovered ? 260 : 72 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          className="absolute top-0 left-0 h-full bg-white border-r border-brand-brown-100 shadow-sm overflow-hidden"
        >
          <SidebarContent isExpanded={isDesktopHovered} />
        </motion.aside>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-brand-brown-900/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[260px] z-50 md:hidden overflow-hidden bg-white"
            >
              <SidebarContent isExpanded={true} isMobile={true} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-20 bg-white border-b border-brand-brown-100 flex items-center px-4 md:hidden shrink-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-md text-brand-brown-600 hover:bg-brand-brown-50"
            >
              <Menu size={24} />
            </button>
            <img 
              src={logoUrl} 
              alt="CantaJa Logo" 
              className="w-[160px] max-w-full h-auto object-contain invert"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto h-full"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
