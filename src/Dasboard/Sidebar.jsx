import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCircle,
  Blocks,
  LogOut,
  HomeIcon,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/Utilisateur', label: 'Utilisateur', icon: HomeIcon },
    { path: '/etudiant', label: 'Étudiant', icon: Users },
    { path: '/universite', label: 'Université', icon: Building2 },
    { path: '/Diplome', label: 'Diplome', icon: Building2 },

    
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 min-h-screen text-white flex flex-col">
      {/* Logo / Header */}
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold">PharmaCare</h1>
        <p className="text-blue-300 text-sm">Gestion d'Officine</p>
      </div>

      {/* Menu principal */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive ? 'bg-blue-600 shadow-lg' : 'hover:bg-blue-700'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bouton Déconnexion */}
      <div className="p-4 border-t border-blue-700">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-all">
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
