'use client';

import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "../../msalConfig";
import "./style.css";

const msalInstance = new PublicClientApplication(msalConfig);

export default function Login() {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeMSAL = async () => {
            try {
                await msalInstance.initialize();
                setIsInitialized(true);
            } catch (error) {
                console.error("MSAL initialization failed:", error);
            }
        };
        initializeMSAL();
    }, []);

    const handleLogin = async () => {
        if (!isInitialized) {
            console.error("MSAL is not initialized yet.");
            return;
        }

        try {
            const loginResponse = await msalInstance.loginRedirect(loginRequest);
            console.log("Login successful:", loginResponse);
            window.location.href = "/home";
        } catch (error) {
            console.error("Login failed:", error);
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
                    disabled={!isInitialized}
                />
            </div>
        </div>
    );
}
