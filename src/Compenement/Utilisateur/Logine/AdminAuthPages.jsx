import React, { useState } from 'react';
import { Mail, Lock, Building2, Eye, EyeOff, Shield, CheckCircle, ArrowLeft, UserCircle } from 'lucide-react';
import axios from "axios";
const AdminAuthPages = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: 'admin',
    departement: '',
    password: ''
  });
  const handleSignupSubmit = async () => {
  try {
    const response = await axios.post("http://localhost:5000/appi/signup", {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      password: formData.password
    });

    alert(response.data.message);
    setCurrentPage("login");
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert("Étudiant non trouvé dans la base !");
    } else {
      alert("Erreur lors de l'inscription !");
      console.error(error);
    }
  }
};

// --- Ajoute ceci dans ton AdminAuthPages.jsx ---
const handleLoginSubmit = async () => {
  try {
    const response = await axios.post("http://localhost:5000/appi/login", {
      email: formData.email,
      password: formData.password,
    });

    alert(response.data.message);

    // Redirection selon le rôle
    window.location.href = response.data.redirect;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Email ou mot de passe incorrect !");
    } else {
      alert("Erreur lors de la connexion !");
      console.error(error);
    }
  }
};


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-12 text-white shadow-2xl">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                    <Shield className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">PharmaCare Admin</h3>
                    <p className="text-sm text-blue-200">Système de Gestion Officine</p>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-6">Espace Administration</h2>
              <p className="text-blue-100 text-lg mb-8">
                Accédez à votre tableau de bord pour gérer les étudiants, employés, diplômes et légalisations.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Shield size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Accès sécurisé</p>
                    <p className="text-sm text-blue-100">Authentification à deux facteurs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Gestion centralisée</p>
                    <p className="text-sm text-blue-100">Tous vos outils en un seul endroit</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Suivi en temps réel</p>
                    <p className="text-sm text-blue-100">Statistiques et rapports détaillés</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-xl border border-white border-opacity-20">
                <p className="text-sm text-blue-100">
                  💡 <span className="font-semibold">Astuce :</span> Utilisez votre email professionnel pour vous connecter
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <a 
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Retour à l'accueil</span>
            </a>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Connexion Admin</h2>
              <p className="text-gray-600">Connectez-vous à votre espace d'administration</p>
            </div>

            

            <div className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Professionnel <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="admin@officine.mg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button
  onClick={handleLoginSubmit}
  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all mt-4"
>
  Se connecter
</button>

              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                  Mot de passe oublié ?
                </a>
              </div>

             

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Nouveau dans l'équipe ?</span>
                </div>
              </div>

              <p className="text-center text-gray-600">
                Pas encore de compte ?{' '}
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Créer un compte
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-12 text-white shadow-2xl">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <UserCircle className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Rejoignez l'équipe</h3>
                  <p className="text-sm text-purple-200">PharmaCare Admin</p>
                </div>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-6">Inscription Équipe</h2>
            <p className="text-purple-100 text-lg mb-8">
              Créez votre compte pour accéder aux outils de gestion de l'officine.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div>
                  <p className="font-semibold">Accès instantané</p>
                  <p className="text-sm text-purple-100">Après validation de votre compte</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div>
                  <p className="font-semibold">Formation incluse</p>
                  <p className="text-sm text-purple-100">Tutoriels et support 24/7</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div>
                  <p className="font-semibold">Sécurité maximale</p>
                  <p className="text-sm text-purple-100">Données chiffrées et protégées</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-xl border border-white border-opacity-20">
              <p className="text-sm text-purple-100">
                🔒 <span className="font-semibold">Confidentialité :</span> Vos informations sont strictement confidentielles
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-h-[90vh] overflow-y-auto">
          <a 
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour à l'accueil</span>
          </a>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Inscription Admin</h2>
            <p className="text-gray-600">Créez votre compte administrateur</p>
          </div>

          <div className="space-y-5" onSubmit={handleSignupSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Rakoto"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Jean"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Professionnel <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="jean.rakoto@officine.mg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum 8 caractères avec majuscules, minuscules et chiffres
              </p>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-1 text-purple-600 rounded" />
              <span className="text-sm text-gray-600">
                J'accepte les conditions d'utilisation et la politique de confidentialité de PharmaCare Admin
              </span>
            </label>

            <button
              onClick={handleSignupSubmit}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <UserCircle className="inline mr-2" size={20} />
              Créer mon compte administrateur
            </button>

            <p className="text-center text-gray-600">
              Vous avez déjà un compte ?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthPages;