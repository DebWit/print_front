import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';

function NavbarHome() {
    // const op = useRef(null);

    const start = <img alt="Logo" src="/print-logo.png" height="60" className="p-mr-2" />;

    const end = <img alt="User" src="/user-sample.jpg" height="60" className="p-ml-2 border-circle border-solid border-white-alpha-90   " style={{aspectRatio: '1/1', objectFit: "cover"}} />;

    // const end = (
    //     <>
    //       <img
    //         alt="User"
    //         src="/user-icon.png"
    //         height="60"
    //         className="p-ml-2 border-circle"
    //         style={{ cursor: 'pointer', aspectRatio: '1/1', objectFit: "cover" }}
    //         onClick={(e) => op.current.toggle(e)}
    //       />
    //       <OverlayPanel ref={op} id="overlay_panel" style={{ width: '200px' }} className="overlaypanel-demo">
    //         <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
    //           <li style={{ padding: '8px 0', cursor: 'pointer' }} onClick={() => console.log('Profile clicked')}>Profile</li>
    //           <li style={{ padding: '8px 0', cursor: 'pointer' }} onClick={() => console.log('Settings clicked')}>Settings</li>
    //           <li style={{ padding: '8px 0', cursor: 'pointer' }} onClick={() => console.log('Logout clicked')}>Logout</li>
    //         </ul>
    //       </OverlayPanel>
    //     </>
    //   );
    return (
        <Menubar start={start} end={end} style={{backgroundColor: "#060153"}} className="px-3 py-2" />
    )
}

export default NavbarHome;