import React from "react";
import { Building2, Search, Bell, User } from "lucide-react"; // ✅ Import ajouté

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo et titre */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <Building2 className="text-white" size={24} /> {/* ✅ Utilisation */}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Université Centrale</h2>
            <p className="text-sm text-gray-500">Système de Gestion</p>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Section utilisateur */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={22} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrateur</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
