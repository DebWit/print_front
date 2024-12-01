'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { getMsalInstance } from "../../msalInstance";
import { loginRequest } from "../../msalConfig";
import "./style.css";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const msalInstance = await getMsalInstance();
                const accounts = msalInstance.getAllAccounts();

                if (accounts.length > 0) {
                    console.log("Usuário já autenticado:", accounts[0]);
                    router.push("/home");
                }
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
            }
        };

        checkAuthentication();
    }, [router]);

    const handleLogin = async () => {
        try {
            const msalInstance = await getMsalInstance();
            await msalInstance.loginRedirect(loginRequest);
        } catch (error) {
            console.error("Erro ao iniciar o login:", error);
        }
    };

    return (
        <div className="grid m-0 p-0">
            <div className="col-10 mt-8 mb-3 flex flex-column mx-auto p-0 img-container">
                <img src="/print-logo.png" alt="Logo" />
                <p className="texto-entrada m-auto">Seja bem-vindo!</p>
            </div>
            <div className="col-12 flex justify-content-center p-0 btn-container">
                <Button
                    label="ENTRAR"
                    icon="pi pi-microsoft"
                    iconPos="right"
                    className="btn-login px-4 py-3"
                    onClick={handleLogin}
                />
            </div>
        </div>
    );
}
