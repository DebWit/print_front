import React from 'react';
import Navbar from '../components/Navbar';
import './style.css';
import 'primeicons/primeicons.css';

const Entidade = () => {
  return (
    <>
      <Navbar text="Dev Community" anchor="/entidade"></Navbar>
      <div className="grid entidade-container">
        <div className="col-12 flex justify-content-center p-0">
          <img
            src="https://d1135f49d6br9m.cloudfront.net/LOGO CONCRETO MAUA.jpg"
            alt="Logo da Entidade"
            className="entidade-logo"
          />
        </div>

        <div className="col-12 flex justify-content-center">
          <a
            href="https://www.instagram.com/devcommunitymaua"
            target="_blank"
            rel="noopener noreferrer"
            className="entidade-button"
            
          >
            <i className="pi pi-instagram" style={{ fontSize: '27px' }}></i>
            DevCommunityMaua
          </a>
        </div>

        <div className="col-12 flex justify-content-center align-items-center">
          <p className="entidade-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non mi vel ipsum vehicula facilisis. Duis sed sem congue diam vulputate commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non mi vel ipsum vehicula facilisis. Duis sed sem congue diam vulputate commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non mi vel ipsum vehicula facilisis. Duis sed sem congue diam vulputate commodo.
          </p>
        </div>

      </div>
    </>
  );
};

export default Entidade;
