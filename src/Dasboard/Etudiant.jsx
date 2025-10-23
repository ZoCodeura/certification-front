import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, GraduationCap } from "lucide-react";

const API_URL = "http://localhost:5000/appi/etudiants"

const Etudiant = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    email: "",
    telephone: "",
    adresse: "",
    anneeEntree: "",
    universite: "",
    filiere: "",
    niveau: "",
  });

  // Charger les étudiants
  useEffect(() => {
    fetchEtudiants();
  }, []);

  const fetchEtudiants = async () => {
    try {
      const res = await axios.get(API_URL);
      setEtudiants(res.data);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  // Modification des inputs
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Ajouter ou modifier un étudiant
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await axios.put(`${API_URL}/${editingStudent.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingStudent(null);
      setFormData({
        matricule: "",
        nom: "",
        prenom: "",
        dateNaissance: "",
        lieuNaissance: "",
        email: "",
        telephone: "",
        adresse: "",
        anneeEntree: "",
        universite: "",
        filiere: "",
        niveau: "",
      });
      fetchEtudiants();
    } catch (error) {
      console.error("Erreur de sauvegarde :", error);
    }
  };

  // Supprimer un étudiant
  const deleteStudent = async (id) => {
    if (window.confirm("Voulez-vous supprimer cet étudiant ?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchEtudiants();
      } catch (error) {
        console.error("Erreur de suppression :", error);
      }
    }
  };

  // Modifier un étudiant
  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gestion des Étudiants
          </h1>
          <p className="text-gray-600">Liste complète des étudiants inscrits</p>
        </div>
        <button
          onClick={() => {
            setEditingStudent(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg transform hover:scale-105"
        >
          <Plus size={20} />
          <span className="font-semibold">Nouvel Étudiant</span>
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
                    {editingStudent ? "Modifier l'étudiant" : "Nouvel Étudiant"}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "matricule", label: "Matricule" },
                  { name: "nom", label: "Nom" },
                  { name: "prenom", label: "Prénom" },
                  { name: "dateNaissance", label: "Date de Naissance", type: "date" },
                  { name: "lieuNaissance", label: "Lieu de Naissance" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "telephone", label: "Téléphone" },
                  { name: "adresse", label: "Adresse" },
                  { name: "anneeEntree", label: "Année d'entrée", type: "date" },
                  { name: "universite", label: "Université" },
                  { name: "filiere", label: "Filière" },
                  { name: "niveau", label: "Niveau" },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                ))}
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
                  {editingStudent ? "Mettre à jour" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABLEAU */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Nom</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Université</th>
                <th className="px-6 py-4 text-left">Filière</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {etudiants.map((et) => (
                <tr key={et.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{et.id}</td>
                  <td className="px-6 py-4">{et.nom} {et.prenom}</td>
                  <td className="px-6 py-4">{et.email}</td>
                  <td className="px-6 py-4">{et.universite}</td>
                  <td className="px-6 py-4">{et.filiere}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(et)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteStudent(et.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
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

export default Etudiant;
