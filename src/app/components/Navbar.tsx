import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { parseJsonFile } from 'next/dist/build/load-jsconfig';
import { title } from 'process';

function Navbar({ isHome = false, text = "Lorem Ipsum", anchor = "#"}: { isHome?: boolean, text?: string, anchor?: string }) {
    const start = isHome ? <img alt="Logo" src="/print-logo.png" height="60" className="p-mr-2" />
    : <a href={anchor} title="Back" className='ml-2 p-2'><span className="pi pi-arrow-left 
    p-mr-2 py-1" style={{ fontSize: "1.5rem", color: "#fff"}} /></a>;
    
    const end = <img alt="User" src="/user-sample.jpg" height="60" className="p-ml-2 border-circle border-solid border-white-alpha-90 " style={{aspectRatio: '1/1', objectFit: "cover"}} />;
    const title_page = (
        <div className="w-full flex justify-content-center align-items-center">
            <div className="text-center text-1xl font-bold uppercase" style={{color: "#fff"}}>{text}</div>
        </div>
    )

    return (
        <>
            {isHome ? 
            (<Menubar start={start} end={end} style={{backgroundColor: "#060153"}} className="px-3 py-2" />) :
            (<>
            <div className='w-full flex' style={{backgroundColor: "#060153"}}>
                {start}
                {title_page}
            </div>
            {/* <Menubar start={start} end={title_page} style={{backgroundColor: "#060153"}} className="px-3 py-2" />)> */}
            </>
            )}
        </>
    )
}

export default Navbar;