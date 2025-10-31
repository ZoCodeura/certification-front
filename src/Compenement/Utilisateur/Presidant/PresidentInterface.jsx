import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, Ban, Search, Filter, Eye, Calendar, User, GraduationCap, Building2, RefreshCw, AlertCircle } from 'lucide-react';

const PresidentInterface = () => {
  const [demandes, setDemandes] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('all');
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchDemandes();
  }, []);

  useEffect(() => {
    let filtered = demandes;

    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.diplome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.etablissement.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatut !== 'all') {
      filtered = filtered.filter(d => d.statut === filterStatut);
    }

    setFilteredDemandes(filtered);
  }, [searchTerm, filterStatut, demandes]);

  const fetchDemandes = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/demandes');
      const data = await response.json();
      setDemandes(data.data || []);
      setFilteredDemandes(data.data || []);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de charger les demandes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatut = async (id, nouveauStatut) => {
    setActionLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/demandes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statut: nouveauStatut })
      });
      
      if (!response.ok) throw new Error('Erreur lors de la mise à jour');
      
      setSuccessMessage(`Demande ${nouveauStatut.toLowerCase()} avec succès !`);
      setShowModal(false);
      setSelectedDemande(null);
      
      await fetchDemandes();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors de la mise à jour');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatutBadge = (statut) => {
    const styles = {
      'En attente': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Validé': 'bg-green-100 text-green-800 border-green-300',
      'Rejeté': 'bg-red-100 text-red-800 border-red-300',
      'Annulé': 'bg-gray-100 text-gray-800 border-gray-300'
    };
    return styles[statut] || 'bg-gray-100 text-gray-800';
  };

  const stats = {
    total: demandes.length,
    enAttente: demandes.filter(d => d.statut === 'En attente').length,
    valide: demandes.filter(d => d.statut === 'Validé').length,
    rejete: demandes.filter(d => d.statut === 'Rejeté').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Espace Président</h1>
              <p className="text-gray-600">Validation et gestion des demandes de diplômes</p>
            </div>
          </div>

          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />
              <p className="text-green-800 font-semibold">{successMessage}</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="text-red-600" size={24} />
              <p className="text-red-800 font-semibold">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Total Demandes</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">En Attente</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.enAttente}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Calendar className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Validés</p>
                <p className="text-3xl font-bold text-green-600">{stats.valide}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Rejetés</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejete}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom, prénom, diplôme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={filterStatut}
                  onChange={(e) => setFilterStatut(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="En attente">En attente</option>
                  <option value="Validé">Validé</option>
                  <option value="Rejeté">Rejeté</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </div>

              <button
                onClick={fetchDemandes}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <RefreshCw size={20} />
                Actualiser
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">Chargement des demandes...</p>
            </div>
          ) : filteredDemandes.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 font-semibold">Aucune demande trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Nom Complet</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Diplôme</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Établissement</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Statut</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDemandes.map((demande) => (
                    <tr key={demande.id} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">#{demande.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            {demande.prenom[0]}{demande.nom[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{demande.prenom} {demande.nom}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{demande.diplome}</td>
                      <td className="px-6 py-4 text-gray-700">{demande.etablissement}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(demande.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatutBadge(demande.statut)}`}>
                          {demande.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedDemande(demande);
                            setShowModal(true);
                          }}
                          className="mx-auto flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 font-semibold rounded-lg hover:bg-purple-200 transition-all"
                        >
                          <Eye size={16} />
                          Gérer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showModal && selectedDemande && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Gestion de la demande</h2>
                    <p className="text-purple-100 text-sm mt-1">Demande #{selectedDemande.id}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setShowModal(false);
                      setSelectedDemande(null);
                    }}
                    className="text-white hover:bg-purple-500 rounded-full p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Informations du candidat</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Nom</p>
                      <p className="font-semibold text-gray-800">{selectedDemande.nom}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Prénom</p>
                      <p className="font-semibold text-gray-800">{selectedDemande.prenom}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Diplôme</p>
                      <p className="font-semibold text-gray-800">{selectedDemande.diplome}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Établissement</p>
                      <p className="font-semibold text-gray-800">{selectedDemande.etablissement}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Date de demande</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(selectedDemande.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Statut actuel</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatutBadge(selectedDemande.statut)}`}>
                        {selectedDemande.statut}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Actions disponibles</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleUpdateStatut(selectedDemande.id, 'Validé')}
                      disabled={actionLoading || selectedDemande.statut === 'Validé'}
                      className="py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle size={20} />
                      Valider
                    </button>

                    <button
                      onClick={() => handleUpdateStatut(selectedDemande.id, 'Rejeté')}
                      disabled={actionLoading || selectedDemande.statut === 'Rejeté'}
                      className="py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle size={20} />
                      Rejeter
                    </button>

                    <button
                      onClick={() => handleUpdateStatut(selectedDemande.id, 'Annulé')}
                      disabled={actionLoading || selectedDemande.statut === 'Annulé'}
                      className="py-3 px-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Ban size={20} />
                      Annuler
                    </button>
                  </div>
                </div>

                {actionLoading && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-blue-800 font-semibold">Traitement en cours...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresidentInterface;