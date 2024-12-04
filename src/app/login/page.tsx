'use client';

import React from "react";
import { Button } from "primereact/button";
import { getMsalInstance } from "../../msalInstance";
import { loginRequest } from "../../msalConfig";
import "./style.css";

export default function Login() {
    const handleLogin = async () => {
        try {
            const msalInstance = await getMsalInstance();
            const loginResponse = await msalInstance.loginPopup(loginRequest);

            if (loginResponse) {
                console.log("Login bem-sucedido:", loginResponse);
    
                const account = msalInstance.getActiveAccount();
                console.log(account)
                if (!account) {
                    msalInstance.setActiveAccount(loginResponse.account);
                    console.log(account)
                }
    
                window.location.href = "/home";
            }
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
