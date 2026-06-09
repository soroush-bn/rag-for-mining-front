import React from 'react';
import headerImg from '../../assets/header.jpg';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="banner-image" style={{ backgroundImage: `url(${headerImg})` }}>
        <div className="banner-overlay">
          <div className="header-title-container">
            <h1 className="header-title">NL Mining Safety RAG</h1>
            <p className="header-subtitle">Interactive Safety Assistant</p>
          </div>
        </div>
      </div>
    </header>
  );
};
