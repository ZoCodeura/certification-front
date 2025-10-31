import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Dasboard/DashboardLayout";
import Dashboard from "./Dasboard/Dashboard";
import Etudiant from "./Compenement/Utilisateur/Etudiantss/Etudiantssss";
import Utilisateur from "./Compenement/Utilisateur/Utilisateur";
import Universite from "./Compenement/Utilisateur/Universite/Universite";
import Diplome from "./Compenement/Utilisateur/Diplome/Diplome";
import Home from "./Dasboard/Home";
import Homme from "./Dasboard/Homme"
import Homeee from "./Dasboard/homro" 
import DemandeDiplome from "./Compenement/Utilisateur/Diplome/DemandeDiplome";
import PresidentInterface from "./Compenement/Utilisateur/Presidant/PresidentInterface";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout principal : Sidebar + Header */}
        <Route path="/" element={<Homme/>}></Route>
        <Route path="/eeeee" element={<PresidentInterface/>}></Route>
        <Route path="/Logine" element={<Homeee/>}></Route>
        <Route path="/DemandeDiplome" element={<DemandeDiplome/>}></Route>
        <Route path="/eeee" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="Utilisateur" element={<Utilisateur />} />
          <Route path="etudiant" element={<Etudiant />} />
          <Route path="universite" element={<Universite />} />
          <Route path="Diplome" element={< Diplome/>} />
          <Route path="blockchain" element={<div className="p-6">Page Blockchain en développement...</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
