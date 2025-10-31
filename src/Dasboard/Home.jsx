import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Home = () => {
  return (
    <div className="font-sans text-gray-800">

      {/* Header / Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold text-blue-700">MonEntreprise</h1>
          <nav className="space-x-6">
            <a href="#home" className="hover:text-blue-500 transition-colors">Accueil</a>
            <a href="#description" className="hover:text-blue-500 transition-colors">Description</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero / Home Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-32 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Bienvenue chez MonEntreprise
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Nous fournissons des solutions innovantes et modernes pour votre entreprise. 
          Découvrez nos services et rejoignez notre communauté.
        </p>
      </section>

      {/* Description de l'entreprise */}
      <section id="description" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-0 max-w-5xl text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">À propos de nous</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            MonEntreprise est spécialisée dans le développement de solutions web et mobiles. 
            Notre mission est de créer des applications fiables et performantes pour améliorer 
            l’expérience utilisateur et aider les entreprises à croître.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-xl mb-2 text-blue-700">Innovation</h4>
              <p className="text-gray-600">Nous développons des solutions créatives adaptées aux besoins modernes.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-xl mb-2 text-blue-700">Fiabilité</h4>
              <p className="text-gray-600">Nos produits sont sécurisés, stables et performants pour tous les utilisateurs.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-xl mb-2 text-blue-700">Support</h4>
              <p className="text-gray-600">Nous assurons un support rapide et efficace pour nos clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-6 md:px-0 max-w-5xl text-center">
          <h5 className="text-xl font-bold mb-4">Contactez-nous</h5>
          <p className="mb-6">contact@monentreprise.com | +261 34 12 345 67</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
          </div>
          <p className="text-gray-400 text-sm">© 2025 MonEntreprise. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
