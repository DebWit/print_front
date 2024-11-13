import { Button } from 'primereact/button';
import "./style.css";

export default function Login() {
    return (
        <>
            <div className="flex align-content-center justify-content-center ">
                <img src="/print-logo.png" alt="Logo" className="md:w-3 p-5" />
            </div>
            <div className="flex align-content-center justify-content-center bg-white">
                <Button label="ENTRAR" icon="pi pi-microsoft" iconPos="right" className='btn-login px-4 py-3'/>
            </div>
        </>
    )
}