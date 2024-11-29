export default function BottomBar({ disabled = undefined }: { disabled?: number }){

    const className = "text-white h-full flex align-items-center justify-content-center md:w-5rem";

    return (
        <>
            <div className="fixed bottom-0 flex flex-wrap md:justify-content-center justify-content-evenly align-items-center w-full mx-0 h-4rem mt-4" style={{backgroundColor: "#060153"}}>
                <a href={disabled === 1 ? "#" : "/mapa"} className={className} style={{textDecoration: "none", width: "20%", background: (disabled === 1 ? "#2B22BB99" : "")  }}><i className="pi pi-map font-light" style={{ fontSize: '2rem' }}></i></a>
                <a href={disabled === 2 ? "#" : "/minhaagenda"} className={className} style={{textDecoration: "none", width: "20%", background: (disabled === 2 ? "#2B22BB99" : "") }}><i className="pi pi-calendar font-light" style={{ fontSize: '2rem' }}></i></a>
                <a href={disabled === 3 ? "#" : "/home"} className={className} style={{textDecoration: "none", width: "20%", background: (disabled === 3 ? "#2B22BB99" : "") }}><i className="pi pi-home font-light" style={{ fontSize: '2rem'}}></i></a>
                <a href={disabled === 4 ? "#" : "/eventos"} className={className} style={{textDecoration: "none", width: "20%", background: (disabled === 4 ? "#2B22BB99" : "") }}><i className="pi pi-bars font-light" style={{ fontSize: '2rem' }}></i></a>
                <a href={disabled === 5 ? "#" : "/notificacoes"} className={className} style={{textDecoration: "none", width: "20%", background: (disabled === 5 ? "#2B22BB99" : "") }}><i className="pi pi-bell font-light" style={{ fontSize: '2rem' }}></i></a>
            </div>
            <div className="w-full h-4rem mt-4"></div>
        </>
    )

}