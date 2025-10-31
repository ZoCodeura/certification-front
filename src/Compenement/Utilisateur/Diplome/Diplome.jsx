import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, FileText } from "lucide-react";

const API_URL = "http://localhost:5000/appi/diplomes";
const API_ETUDIANTS = "http://localhost:5000/appi/etudiants";
const API_UNIVERSITES = "http://localhost:5000/appi/universites";
const API_UTILISATEURS = "http://localhost:5000/appi/utilisateurs";

const Diplome = () => {
  const [diplomes, setDiplomes] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [universites, setUniversites] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDiplome, setEditingDiplome] = useState(null);
  const [formData, setFormData] = useState({
    id_etudiant: "",
    id_univ: "",
    id_utilisateur: "",
    type_diplome: "",
    date_creation: "",
    date_validation: "",
    statut: "en_attente",
  });

  useEffect(() => {
    fetchDiplomes();
    fetchEtudiants();
    fetchUniversites();
    fetchUtilisateurs();
  }, []);

  const fetchDiplomes = async () => {
    try {
      const res = await axios.get(API_URL);
      setDiplomes(res.data);
    } catch (error) {
      console.error("Erreur chargement diplômes :", error);
    }
  };

  const fetchEtudiants = async () => {
    try {
      const res = await axios.get(API_ETUDIANTS);
      setEtudiants(res.data);
    } catch (error) {
      console.error("Erreur chargement étudiants :", error);
    }
  };

  const fetchUniversites = async () => {
    try {
      const res = await axios.get(API_UNIVERSITES);
      setUniversites(res.data);
    } catch (error) {
      console.error("Erreur chargement universités :", error);
    }
  };

  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get(API_UTILISATEURS);
      setUtilisateurs(res.data);
    } catch (error) {
      console.error("Erreur chargement utilisateurs :", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDiplome) {
        await axios.put(`${API_URL}/${editingDiplome.id_diplome}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingDiplome(null);
      resetForm();
      fetchDiplomes();
    } catch (error) {
      console.error("Erreur sauvegarde :", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id_etudiant: "",
      id_univ: "",
      id_utilisateur: "",
      type_diplome: "",
      date_creation: "",
      date_validation: "",
      statut: "en_attente",
    });
  };

  const deleteDiplome = async (id) => {
    if (window.confirm("Voulez-vous supprimer ce diplôme ?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchDiplomes();
      } catch (error) {
        console.error("Erreur suppression :", error);
      }
    }
  };

  const handleEdit = (diplome) => {
    setEditingDiplome(diplome);
    setFormData({
      id_etudiant: diplome.id_etudiant ?? "",
      id_univ: diplome.id_univ ?? "",
      id_utilisateur: diplome.id_utilisateur ?? "",
      type_diplome: diplome.type_diplome ?? "",
      date_creation: diplome.date_creation?.split("T")[0] || "",
      date_validation: diplome.date_validation?.split("T")[0] || "",
      statut: diplome.statut ?? "en_attente",
    });
    setShowModal(true);
  };

  const getNomEtudiant = (id) =>
    etudiants.find((e) => e.id_etudiant === id)?.nom || "—";

  const getNomUniversite = (id) =>
    universites.find((u) => u.id_univ === id)?.nom_univ || "—";

  const getNomUtilisateur = (id) =>
    utilisateurs.find((u) => u.id_utilisateur === id)?.nom || "—";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gestion des diplômes
          </h1>
          <p className="text-gray-600">Liste complète des diplômes</p>
        </div>
        <button
          onClick={() => {
            setEditingDiplome(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg transform hover:scale-105"
        >
          <Plus size={20} />
          <span className="font-semibold">Nouveau diplôme</span>
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText size={32} className="text-white" />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingDiplome ? "Modifier le diplôme" : "Nouveau diplôme"}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Remplissez les informations ci-dessous
                  </p>
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
                {/* Étudiant */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Étudiant
                  </label>
                  <select
                    name="id_etudiant"
                    value={formData.id_etudiant ?? ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="">-- Choisir un étudiant --</option>
                    {etudiants.map((e) => (
                      <option key={`etudiant-${e.id}`} value={String(e.id)}>
                        {e.nom} {e.prenom}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Université */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Université
                  </label>
                  <select
                    name="id_univ"
                    value={formData.id_univ ?? ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="">-- Choisir une université --</option>
                    {universites.map((u) => (
                      <option key={`univ-${u.id_univ}`} value={String(u.id_univ)}>
                        {u.nom_univ}
                      </option>
                    ))}
                  </select>
                </div>

               
                {/* Utilisateur */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Utilisateur
                  </label>
                  <select
                    name="id_utilisateur"
                    value={formData.id_utilisateur ?? ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="">-- Choisir un utilisateur --</option>
                    {utilisateurs.map((u) => (
                      <option key={`util-${u.id}`} value={String(u.id)}>
                        {u.nom} {u.prenom}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type de diplôme */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Type de diplôme
                  </label>
                  <select
                    name="type_diplome"
                    value={formData.type_diplome ?? ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="">-- Choisir --</option>
                    <option value="Baccalauréat">Baccalauréat</option>
                    <option value="Licence">Licence</option>
                    <option value="Master">Master</option>
                    <option value="Doctorat">Doctorat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Date création
                  </label>
                  <input
                    type="date"
                    name="date_creation"
                    value={formData.date_creation ?? ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Date validation
                  </label>
                  <input
                    type="date"
                    name="date_validation"
                    value={formData.date_validation ?? ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Statut
                  </label>
                  <select
                    name="statut"
                    value={formData.statut ?? "en_attente"}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="en_attente">En attente</option>
                    <option value="valide">Validé</option>
                    <option value="rejete">Rejeté</option>
                  </select>
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
                  {editingDiplome ? "Mettre à jour" : "Enregistrer"}
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
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Étudiant</th>
                <th className="px-6 py-4 text-left">Université</th>
                <th className="px-6 py-4 text-left">Utilisateur</th>
                <th className="px-6 py-4 text-left">Statut</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {diplomes.map((d) => (
                <tr key={d.id_diplome} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {d.id_diplome}
                  </td>
                  <td className="px-6 py-4">{d.type_diplome}</td>
                  <td className="px-6 py-4">{getNomEtudiant(d.id)}</td>
                  <td className="px-6 py-4">{getNomUniversite(d.id_univ)}</td>
                  <td className="px-6 py-4">{getNomUtilisateur(d.id)}</td>
                  <td className="px-6 py-4 capitalize">{d.statut}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(d)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteDiplome(d.id_diplome)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                    >
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

export default Diplome;
