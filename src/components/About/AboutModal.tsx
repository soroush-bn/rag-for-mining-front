import { useState } from 'react';
import './AboutModal.css';

export function AboutModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="about-floating-btn" onClick={() => setIsOpen(true)}>
        About
      </button>

      {isOpen && (
        <div className="about-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="about-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="about-modal-close" onClick={() => setIsOpen(false)}>
              &times;
            </button>
            <h2>Mining Safety RAG</h2>
            <p>Multi modal RAG for safety regulations at mines in NL</p>
            
            <div className="features-grid">
              <div className="feature-section">
                <h3>Backend</h3>
                <ul>
                  <li>FastApi</li>
                  <li>Clean architecture</li>
                  <li>Dependency injection</li>
                  <li>ChromaDB</li>
                  <li>Pinecone</li>
                  <li>VertexAI</li>
                  <li>Gemini</li>
                  <li>pdf, image and text embeddings</li>
                  <li>unit test for each layer</li>
                  <li>decoupled layers</li>
                  <li>mocked repositories for tests</li>
                  <li>integration tests</li>
                </ul>
              </div>

              <div className="feature-section">
                <h3>Deployment and cloud</h3>
                <ul>
                  <li>github CI/CD</li>
                  <li>git flow</li>
                  <li>Docker</li>
                  <li>AWS ECR</li>
                  <li>AWS Lambda</li>
                  <li>AWS monitoring</li>
                  <li>Google Cloud</li>
                  <li>semi automatic deployment for safety purposes</li>
                  <li>branch rule sets</li>
                  <li>Pinecone</li>
                  <li>Vercel</li>
                </ul>
              </div>

              <div className="feature-section">
                <h3>Front End</h3>
                <ul>
                  <li>React</li>
                  <li>Vite</li>
                  <li>Vercel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
