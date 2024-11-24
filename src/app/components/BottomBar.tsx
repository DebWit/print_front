export default function BottomBar() {


    return (
        <>
            <div className="fixed bottom-0 flex flex-wrap md:justify-content-center justify-content-evenly align-items-center w-full mx-0 h-4rem md:gap-5 mt-4" style={{backgroundColor: "#060153"}}>
                <a href="/maps" className="text-white"><i className="pi pi-map" style={{ fontSize: '2rem' }}></i></a>
                <a href="/my-calendar" className="text-white"><i className="pi pi-calendar" style={{ fontSize: '2rem' }}></i></a>
                <a href="/home" className="text-white"><i className="pi pi-home" style={{ fontSize: '2rem' }}></i></a>
                <a href="/events" className="text-white"><i className="pi pi-bars" style={{ fontSize: '2rem' }}></i></a>
                <a href="/notifications" className="text-white"><i className="pi pi-bell" style={{ fontSize: '2rem' }}></i></a>
            </div>
        </>
    )

}