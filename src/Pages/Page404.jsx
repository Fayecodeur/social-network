// Page404.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../css/page404.css"; // Importez un fichier CSS pour le style

const Page404 = () => {
  return (
    <div className="page404-container">
      <div className="page404-content">
        <h1 className="page404-title">404</h1>
        <p className="page404-message">
          Oups ! La page que vous cherchez n'existe pas.
        </p>
        <Link to="/connexion" className="page404-button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Page404;
