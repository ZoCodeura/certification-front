import React, { useState } from 'react';
import { Link, Links } from 'react-router-dom';
import { Menu, X, ChevronRight, Users, Award, TrendingUp, Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation */}
      <header className="fixed w-full top-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">PharmaCare</h1>
                <p className="text-xs text-gray-500">Gestion Intelligente</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#accueil" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Accueil
              </a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Services
              </a>
              <a href="#apropos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                À propos
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              
              <Link to="/Logine"   className="px-6 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-all">
                Se connecter
              </Link>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all">
                S'inscrire
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col gap-4 mt-4">
                <a href="#accueil" className="text-gray-700 hover:text-blue-600 font-medium">
                  Accueil
                </a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">
                  Services
                </a>
                <a href="#apropos" className="text-gray-700 hover:text-blue-600 font-medium">
                  À propos
                </a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
                  Contact
                </a>
                <button className="px-6 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-all text-left">
                  Se connecter
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                  S'inscrire
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-6">
                🚀 Solution N°1 en gestion universitaire
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transformez la gestion de votre
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> établissement</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Une plateforme complète pour gérer vos étudiants, diplômes et certifications avec la sécurité de la blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/DemandeDiplome" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-2">
                  Commencer gratuitement
                  <ArrowRight size={20} />
                </Link>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all">
                  Voir la démo
                </button>
              </div>
              <div className="mt-8 flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold text-gray-900">10K+</p>
                  <p className="text-gray-600">Étudiants</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">50+</p>
                  <p className="text-gray-600">Universités</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">98%</p>
                  <p className="text-gray-600">Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-2xl transform rotate-3 absolute"></div>
              <div className="w-full h-96 bg-white rounded-3xl shadow-2xl relative z-10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Award className="text-white" size={64} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Certifications Sécurisées</h3>
                  <p className="text-gray-600">Technologie Blockchain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Description de l'Entreprise */}
      <section id="apropos" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Qui sommes-nous ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PharmaCare est la solution de référence pour la gestion moderne des établissements d'enseignement supérieur et des organismes de certification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Nous révolutionnons la gestion universitaire en combinant innovation technologique et simplicité d'utilisation. Notre plateforme permet aux établissements de se concentrer sur l'essentiel : l'éducation et la réussite des étudiants.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Avec l'intégration de la blockchain, nous garantissons l'authenticité et la traçabilité des diplômes, luttant ainsi contre la fraude académique.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                  Innovation
                </div>
                <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold">
                  Sécurité
                </div>
                <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                  Fiabilité
                </div>
                <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">
                  Excellence
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white">
                <Users size={40} className="mb-4" />
                <h4 className="text-2xl font-bold mb-2">10,000+</h4>
                <p>Utilisateurs actifs</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white">
                <Award size={40} className="mb-4" />
                <h4 className="text-2xl font-bold mb-2">5,000+</h4>
                <p>Diplômes certifiés</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white">
                <TrendingUp size={40} className="mb-4" />
                <h4 className="text-2xl font-bold mb-2">98%</h4>
                <p>Taux de satisfaction</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl text-white">
                <Shield size={40} className="mb-4" />
                <h4 className="text-2xl font-bold mb-2">100%</h4>
                <p>Données sécurisées</p>
              </div>
            </div>
          </div>

          {/* Valeurs */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Nos Valeurs
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Intégrité</h4>
                <p className="text-gray-600">
                  Nous garantissons la transparence et l'authenticité dans toutes nos opérations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h4>
                <p className="text-gray-600">
                  Nous croyons en la force du travail d'équipe et des partenariats solides.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Excellence</h4>
                <p className="text-gray-600">
                  Nous visons l'excellence dans chaque aspect de notre service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à transformer votre gestion ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'établissements qui font déjà confiance à PharmaCare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              Commencer maintenant
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all">
              Contactez-nous
            </button>
          </div>
        </div>
      </section>

      {/* Footer Moderne */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">PC</span>
                </div>
                <h3 className="text-xl font-bold">PharmaCare</h3>
              </div>
              <p className="text-gray-400 mb-4">
                La solution innovante pour la gestion moderne des établissements universitaires.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Produit</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Démo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Entreprise</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Presse</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail size={20} className="text-blue-400" />
                  <span>contact@pharmacare.fr</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone size={20} className="text-blue-400" />
                  <span>+33 1 23 45 67 89</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <MapPin size={20} className="text-blue-400" />
                  <span>Paris, France</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 PharmaCare. Tous droits réservés.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Politique de confidentialité
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Conditions d'utilisation
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Mentions légales
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;