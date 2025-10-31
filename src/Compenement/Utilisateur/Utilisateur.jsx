import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, User } from "lucide-react";

const API_URL = "http://localhost:5001/appi/utilisateurs";

const Utilisateur = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    role: "ETUDIANT",
    actif: true,
  });

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get(API_URL);
      setUtilisateurs(res.data);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingUser(null);
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        role: "ETUDIANT",
        actif: true,
      });
      fetchUtilisateurs();
    } catch (error) {
      console.error("Erreur de sauvegarde :", error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Voulez-vous supprimer cet utilisateur ?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUtilisateurs();
      } catch (error) {
        console.error("Erreur de suppression :", error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion des utilisateurs</h1>
          <p className="text-gray-600">Liste complète des utilisateurs</p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg transform hover:scale-105"
        >
          <Plus size={20} />
          <span className="font-semibold">Nouvel utilisateur</span>
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <User size={32} className="text-white" />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">Remplissez les informations ci-dessous</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-blue-500 rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 bg-gray-50 rounded-b-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Mot de passe</label>
                  <input
                    type="password"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Rôle</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="ETUDIANT">ETUDIANT</option>
                    <option value="RESPONSABLE">RESPONSABLE</option>
                    <option value="PRESIDENT">PRESIDENT</option>
                  </select>
                </div>

                <div className="space-y-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="actif"
                    checked={formData.actif}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <label className="text-sm font-semibold text-gray-700">Actif</label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md transition-all transform hover:scale-105"
                >
                  {editingUser ? "Mettre à jour" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABLEAU */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Nom</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Rôle</th>
                <th className="px-6 py-4 text-left">Actif</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {utilisateurs.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{user.id}</td>
                  <td className="px-6 py-4">{user.nom} {user.prenom}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.actif ? "Oui" : "Non"}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(user)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Utilisateur;
