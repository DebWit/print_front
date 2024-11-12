import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';

function NavbarEventos() {

    const start = <img alt="Voltar" src="./public/icons/voltar.png" height="60" className="p-mr-2" />;
    return (
        <div style={{ backgroundColor: "#2B22BB", minHeight: '100vh' }}>
            <Menubar start={start} style={{backgroundColor: "#FFFFFF"}} className="NavbarEventos" />
            </div>
    )
}

export default NavbarEventos; 




