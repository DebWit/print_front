import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { parseJsonFile } from 'next/dist/build/load-jsconfig';
import "./../style.css";

function Navbar({ isHome = false, text = "Lorem Ipsum", anchor = "#"}: { isHome?: boolean, text?: string, anchor?: string }) {
    const start = isHome ? <img alt="Logo" src="/print-logo.png" height="60" className="p-mr-2" />
    : <a href={anchor} title="Back"><span className="pi pi-arrow-left py-1" style={{ fontSize: "1.5rem", color: "#060153"}} /></a>;
    
    const end = <img alt="User" src="/user-sample.jpg" height="60" className="p-ml-2 border-circle border-solid border-white-alpha-90   " style={{aspectRatio: '1/1', objectFit: "cover"}} />;
    const title_page = (
        <div className="max-w-full w-screen justify-content-center z-0">
            <div className="text-center text-2xl font-bold uppercase" style={{color: "#060153"}}>{text}</div>
        </div>
    )
    const item = [{label: text,
        template: title_page
    }];
    return (
        <>
            {isHome ? 
            (<Menubar start={start} end={end} style={{backgroundColor: "#060153"}} className="px-3 py-2" />) :
            (<Menubar start={start} model={item} style={{backgroundColor: "#fff", wordBreak: "normal"}} className="py-2" />)
            }
        </>
    )
}

export default Navbar;