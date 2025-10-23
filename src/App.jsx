import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Dasboard/DashboardLayout";
import Dashboard from "./Dasboard/Dashboard";
import Etudiant from "./Dasboard/Etudiant";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout principal : Sidebar + Header */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="etudiant" element={<Etudiant />} />
          <Route path="universite" element={<div className="p-6">Page Université en développement...</div>} />
          <Route path="president" element={<div className="p-6">Page Président en développement...</div>} />
          <Route path="blockchain" element={<div className="p-6">Page Blockchain en développement...</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
