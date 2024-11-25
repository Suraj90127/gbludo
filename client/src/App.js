import React, { useEffect, useState } from "react";
import AppContent from "./AppContent";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


const App = () => {

  return (
    <Router>
    <AppContent />
  </Router>
  );
};

export default App;
