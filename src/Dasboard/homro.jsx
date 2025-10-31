import React, { useState } from "react";
import axios from "axios";

const AuthPage = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    etablissement: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==== LOGIN ====
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/appi/login", {
        email: formData.email,
        password: formData.password
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la connexion.");
    }
  };

  // ==== SIGNUP ====
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/appi/signup", formData);
      alert(res.data.message);
      setCurrentPage("login");
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform transform hover:scale-[1.01]">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {currentPage === "login" ? "Connexion Étudiant" : "Inscription Étudiant"}
        </h1>

        {currentPage === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Se connecter
            </button>
            <p className="text-center text-sm mt-4">
              Pas encore de compte ?{" "}
              <button
                type="button"
                onClick={() => setCurrentPage("signup")}
                className="text-blue-600 hover:underline"
              >
                S’inscrire
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email universitaire"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="text"
              name="telephone"
              placeholder="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="text"
              name="etablissement"
              placeholder="Établissement"
              value={formData.etablissement}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Créer un compte
            </button>
            <p className="text-center text-sm mt-4">
              Déjà inscrit ?{" "}
              <button
                type="button"
                onClick={() => setCurrentPage("login")}
                className="text-indigo-600 hover:underline"
              >
                Se connecter
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
