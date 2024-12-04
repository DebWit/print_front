"use client";

import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import axios from 'axios';
import { getMsalInstance } from '@/msalInstance';

const getPhoto = async () => {
    try {
        const msalInstance = await getMsalInstance();
        const accounts = msalInstance.getAllAccounts();

        if (accounts.length > 0) {
            const account = accounts[0];

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["https://graph.microsoft.com/User.Read"],
                account: account,
            });

            const accessToken = tokenResponse.accessToken;

            const response = await axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                responseType: 'arraybuffer',
            });

            const base64Image = btoa(
                new Uint8Array(response.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            return `data:image/jpeg;base64,${base64Image}`;
        }
    } catch (error) {
        console.error('Erro ao buscar a foto:', error);
        return '/user-sample.jpg'; // Fallback para a imagem padrão
    }
};


function Navbar({ isHome = false, text = "Lorem Ipsum", anchor = "#" }: { isHome?: boolean, text?: string, anchor?: string }) {
    const [userPhoto, setUserPhoto] = useState('/user-sample.jpg'); // Estado inicial com a imagem padrão

    useEffect(() => {
        const fetchPhoto = async () => {
            const photoUrl = await getPhoto();
            setUserPhoto(photoUrl);
        };

        fetchPhoto();
    }, []);

    const start = isHome ? (
        <img alt="Logo" src="/print-logo.png" height="60" className="p-mr-2" />
    ) : (
        <a href={anchor} title="Back" className="ml-2 p-2 z-5">
            <span
                className="pi pi-arrow-left p-mr-2 py-1"
                style={{ fontSize: "1.5rem", color: "#fff" }}
            />
        </a>
    );

    const end = (
        <img
            alt="User"
            src={userPhoto}
            height="60"
            className="p-ml-2 border-circle border-solid border-white-alpha-90"
            style={{ aspectRatio: '1/1', objectFit: "cover" }}
        />
    );

    const title_page = (
        <div className="absolute z-0 w-full flex justify-content-center align-items-center h-3rem">
            <div className="text-center uppercase" style={{ color: "#fff", fontSize: "1.25rem", userSelect: "none" }}>
                {text}
            </div>
        </div>
    );

    return (
        <>
            {isHome ? (
                <Menubar start={start} end={end} style={{ backgroundColor: "#060153", border: "none", borderRadius: 0 }} className="px-3 py-2" />
            ) : (
                <>
                    <div className="w-full flex h-3rem" style={{ backgroundColor: "#060153" }}>
                        {start}
                        {title_page}
                    </div>
                </>
            )}
        </>
    );
}

export default Navbar;