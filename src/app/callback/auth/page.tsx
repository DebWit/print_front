'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMsalInstance } from "../../../msalInstance";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthResponse = async () => {
            try {
                const msalInstance = await getMsalInstance();
                const response = await msalInstance.handleRedirectPromise();

                if (response) {
                    localStorage.setItem("msal_id_token", response.idToken || "");
                    localStorage.setItem("msal_access_token", response.accessToken || "");

                    console.log("Login bem-sucedido:", response);
                    router.push("/home");
                } else {
                    console.error("Nenhuma resposta recebida. Redirecionando para erro.");
                    router.push("/error");
                }
            } catch (error) {
                console.error("Erro ao processar a autenticação:", error);
                router.push("/error");
            }
        };

        handleAuthResponse();
    }, [router]);

    return (
        <div>
            <h1>Processando Autenticação...</h1>
            <p>Aguarde enquanto processamos sua autenticação.</p>
        </div>
    );
}
