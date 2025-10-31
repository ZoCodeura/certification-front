import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, GraduationCap } from "lucide-react";

const API_URL = "http://localhost:5000/appi/universites";

const Universite = () => {
  const [universites, setUniversites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUniv, setEditingUniv] = useState(null);
  const [formData, setFormData] = useState({
    nom_univ: "",
    president_nom: "",
    email_president: "",
  });

  useEffect(() => {
    fetchUniversites();
  }, []);

  const fetchUniversites = async () => {
    try {
      const res = await axios.get(API_URL);
      setUniversites(res.data);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUniv) {
        await axios.put(`${API_URL}/${editingUniv.id_univ}`, formData);
      } else {
        // Pas besoin d'envoyer cle_privee, le backend la génère automatiquement
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingUniv(null);
      setFormData({
        nom_univ: "",
        president_nom: "",
        email_president: "",
      });
      fetchUniversites();
    } catch (error) {
      console.error("Erreur de sauvegarde :", error);
    }
  };

  const deleteUniv = async (id) => {
    if (window.confirm("Voulez-vous supprimer cette université ?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUniversites();
      } catch (error) {
        console.error("Erreur de suppression :", error);
      }
    }
  };

  const handleEdit = (univ) => {
    setEditingUniv(univ);
    // On ne permet pas d’éditer la clé privée
    setFormData({
      nom_univ: univ.nom_univ,
      president_nom: univ.president_nom,
      email_president: univ.email_president,
    });
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion des universités</h1>
          <p className="text-gray-600">Liste complète des universités enregistrées</p>
        </div>
        <button
          onClick={() => {
            setEditingUniv(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg transform hover:scale-105"
        >
          <Plus size={20} />
          <span className="font-semibold">Nouvelle université</span>
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <GraduationCap size={32} className="text-white" />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingUniv ? "Modifier l'université" : "Nouvelle université"}
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
                  <label className="block text-sm font-semibold text-gray-700">Nom de l'université</label>
                  <input
                    type="text"
                    name="nom_univ"
                    value={formData.nom_univ}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Nom du président</label>
                  <input
                    type="text"
                    name="president_nom"
                    value={formData.president_nom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Email du président</label>
                  <input
                    type="email"
                    name="email_president"
                    value={formData.email_president}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
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
                  {editingUniv ? "Mettre à jour" : "Enregistrer"}
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
                <th className="px-6 py-4 text-left">Nom de l'université</th>
                <th className="px-6 py-4 text-left">Président</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Clé privée (générée auto)</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {universites.map((univ) => (
                <tr key={univ.id_univ} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{univ.id_univ}</td>
                  <td className="px-6 py-4">{univ.nom_univ}</td>
                  <td className="px-6 py-4">{univ.president_nom}</td>
                  <td className="px-6 py-4">{univ.email_president}</td>
                  <td className="px-6 py-4 truncate max-w-xs text-gray-500 italic">
                    {univ.cle_privee ? univ.cle_privee.substring(0, 50) + "..." : "Non générée"}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(univ)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteUniv(univ.id_univ)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
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

export default Universite;
