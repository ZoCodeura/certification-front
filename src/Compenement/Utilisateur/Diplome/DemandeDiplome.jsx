import React, { useState } from 'react';
import { Award, User, GraduationCap, Building2, Send, CheckCircle, ArrowLeft, AlertCircle, FileUp } from 'lucide-react';
import axios from 'axios';

const DemandeDiplome = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    diplome: '',
    etablissement: '',
    recu: null // ✅ Nouveau champ pour le reçu
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const diplomes = ['Baccalauréat', 'Licence', 'Master', 'Doctorat'];
  const etablissements = ['Fianarantsoa', 'Antananarivo', 'Toliara', 'Mahajanga'];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    // ✅ Gère le champ de fichier séparément
    if (name === 'recu') {
      setFormData({
        ...formData,
        recu: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.nom || !formData.prenom || !formData.diplome || !formData.etablissement || !formData.recu) {
      setError('Veuillez remplir tous les champs obligatoires et importer le reçu bancaire');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // ✅ Utilisation de FormData pour envoyer le fichier
      const data = new FormData();
      data.append('nom', formData.nom);
      data.append('prenom', formData.prenom);
      data.append('diplome', formData.diplome);
      data.append('etablissement', formData.etablissement);
      data.append('recu', formData.recu);

      const response = await axios.post('http://localhost:5000/api/demandes', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Demande créée:', response.data);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ nom: '', prenom: '', diplome: '', etablissement: '', recu: null });
      }, 3000);
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
            <CheckCircle className="text-white" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Demande envoyée !</h2>
          <p className="text-gray-600 mb-6">
            Votre demande de diplôme a été enregistrée avec succès. Vous recevrez une notification une fois votre diplôme validé.
          </p>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-800 font-semibold">
              📧 Un email de confirmation vous a été envoyé
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <a 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Retour à l'accueil</span>
          </a>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Demande de Diplôme</h1>
              <p className="text-gray-600">Remplissez le formulaire pour obtenir votre certification</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Pourquoi PharmaCare ?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Certification Blockchain</h4>
                    <p className="text-sm text-gray-600">Vos diplômes sont sécurisés et vérifiables à vie</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Traitement rapide</h4>
                    <p className="text-sm text-gray-600">Recevez votre diplôme en 24-48 heures</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Reconnu officiellement</h4>
                    <p className="text-sm text-gray-600">Validé par les établissements partenaires</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">💡 Le saviez-vous ?</h3>
              <p className="text-blue-100 mb-4">
                Plus de <span className="font-bold text-white">5,000 diplômes</span> ont été certifiés via notre plateforme blockchain, garantissant leur authenticité.
              </p>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="text-sm">
                  <span className="font-bold">100%</span> de nos utilisateurs recommandent PharmaCare
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Informations du diplômé</h2>
                <p className="text-gray-600">Tous les champs marqués d'un <span className="text-red-500">*</span> sont obligatoires</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                  <p className="text-red-800 text-sm font-semibold">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Nom & Prénom */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="inline mr-2" size={16} />
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Entrez votre nom" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="inline mr-2" size={16} />
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Entrez votre prénom" />
                  </div>
                </div>

                {/* ✅ Nouveau champ fichier */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FileUp className="inline mr-2" size={16} />
                    Reçu bancaire (scan) <span className="text-red-500">*</span>
                  </label>
                  <input type="file" name="recu" accept="image/*,.pdf"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50" />
                  {formData.recu && (
                    <p className="text-sm text-gray-600 mt-2">📎 Fichier sélectionné : {formData.recu.name}</p>
                  )}
                </div>

                {/* Diplôme */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <GraduationCap className="inline mr-2" size={16} />
                    Type de Diplôme <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {diplomes.map((diplome) => (
                      <button key={diplome} type="button"
                        onClick={() => setFormData({ ...formData, diplome })}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          formData.diplome === diplome
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        {diplome}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Établissement */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building2 className="inline mr-2" size={16} />
                    Établissement <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {etablissements.map((etablissement) => (
                      <button key={etablissement} type="button"
                        onClick={() => setFormData({ ...formData, etablissement })}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          formData.etablissement === etablissement
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        {etablissement}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Récapitulatif */}
                {(formData.nom || formData.prenom || formData.diplome || formData.etablissement) && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="font-bold text-gray-800 mb-3">📋 Récapitulatif de votre demande</h3>
                    <div className="space-y-2 text-sm">
                      {formData.nom && <p><span className="font-semibold">Nom :</span> {formData.nom}</p>}
                      {formData.prenom && <p><span className="font-semibold">Prénom :</span> {formData.prenom}</p>}
                      {formData.diplome && <p><span className="font-semibold">Diplôme :</span> {formData.diplome}</p>}
                      {formData.etablissement && <p><span className="font-semibold">Établissement :</span> {formData.etablissement}</p>}
                      {formData.recu && <p><span className="font-semibold">Fichier :</span> {formData.recu.name}</p>}
                    </div>
                  </div>
                )}

                {/* Bouton */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}>
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Soumettre ma demande
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  En soumettant ce formulaire, vous acceptez nos conditions d'utilisation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandeDiplome;
