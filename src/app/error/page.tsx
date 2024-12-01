'use client';

import React from "react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
    const router = useRouter();

    const handleRetry = () => {
        router.push("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Erro de Autenticação</h1>
            <p>Não foi possível concluir o login. Tente novamente.</p>
            <button
                onClick={handleRetry}
                style={{ padding: "10px 20px", marginTop: "20px" }}
            >
                Tentar novamente
            </button>
        </div>
    );
}
