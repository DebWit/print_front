import { Button } from 'primereact/button';
import "./style.css";

export default function Login() {
    return (
        <div className="grid m-0 p-0">
            <div className="col-10 mt-8 mb-3 flex flex-column mx-auto p-0 img-container">
                <img src="/print-logo.png" alt="Logo"/>
                <p className="texto-entrada m-auto">Seja bem-vindo!</p>
            </div>
            <div className="col-12 flex justify-content-center p-0 btn-container">
                <Button label="ENTRAR" icon="pi pi-microsoft" iconPos="right" className='btn-login px-4 py-3 '/>
            </div>
        </div>
    )
}