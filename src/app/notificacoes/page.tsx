'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMsalInstance } from "../../msalInstance";
import Navbar from "../components/Navbar";
import SidebarNotificacoes from "../components/SideBar";
import "./style.css";

interface Notification {
    notification_id: string;
    title: string;
    creation_date: number;
    description: string;
    has_seen: string[]; // Updated to store member IDs of users who have seen the notification
}

export default function Notificacoes() {
    const [notificacoes, setNotificacoes] = useState<Notification[]>([]);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [accounts, setAccounts] = useState<any[]>([]);

    useEffect(() => {
        const initializeMsal = async () => {
            try {
                const msalInstance = await getMsalInstance();
                const msalAccounts = msalInstance.getAllAccounts();

                if (msalAccounts.length === 0) {
                    throw new Error("Usuário não autenticado. Faça login novamente.");
                }

                setAccounts(msalAccounts);

                const tokenResponse = await msalInstance.acquireTokenSilent({
                    scopes: ["User.Read"],
                    account: msalAccounts[0],
                });

                const response = await axios.get(
                    `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-all-notifications`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.accessToken}`,
                        },
                    }
                );
                console.log(response.data.notifications)
                setNotificacoes(response.data.notifications);
            } catch (err: any) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        initializeMsal();
    }, []);

    const updateNotificationSeen = async (notification: Notification) => {
        try {
            const msalInstance = await getMsalInstance();

            if (accounts.length === 0) {
                throw new Error("Usuário não autenticado. Faça login novamente.");
            }

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: accounts[0],
            });

            const memberId = accounts[0].localAccountId;

            await axios.post(
                `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/update-notification`,
                {
                    notification_id: notification.notification_id,
                    has_seen: notification.has_seen.includes(memberId)
                        ? notification.has_seen
                        : [...notification.has_seen, memberId],
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );
        } catch (err: any) {
            console.error("Erro ao atualizar notificação:", err.response ? err.response.data.message : err.message);
        }
    };

    const handleNotificationClick = async (notification: Notification) => {
        if (accounts.length === 0) {
            throw new Error("Usuário não autenticado.");
        }

        const memberId = accounts[0].localAccountId;
        const updatedNotification = {
            ...notification,
            has_seen: notification.has_seen.includes(memberId)
                ? notification.has_seen
                : [...notification.has_seen, memberId],
        };

        setSelectedNotification(notification);
        setSidebarVisible(true);
        setNotificacoes((prevNotificacoes) =>
            prevNotificacoes.map((notif) =>
                notif.notification_id === notification.notification_id
                    ? updatedNotification
                    : notif
            )
        );

        await updateNotificationSeen(updatedNotification);
    };

    const formatCreationDate = (creation_date: number): string => {
        const date = new Date(creation_date);
        return date.toLocaleString();
    };

    if (loading) {
        return <p>Carregando notificações...</p>;
    }

    if (error) {
        return <p>Erro ao carregar notificações: {error}</p>;
    }

    return (
        <>
            <Navbar text="Notificações" anchor="/home" />
            <div className="grid flex flex-column align-items-center m-0 p-0">
                <div className="col-12 lg:col-8 p-0">
                    {notificacoes.map((notification) => (
                        <div
                            key={notification.notification_id}
                            className="notification-item"
                            onClick={() => handleNotificationClick(notification)}
                        >
                            <div className="ml-3 lg:ml-0">
                                <button
                                    className={`remove-button ml-3 lg:ml-0 ${notification.has_seen.includes(
                                        accounts[0]?.localAccountId
                                    ) ? "seen" : "unseen"}`}
                                />
                                <h3>{notification.title}</h3>
                                <p>{formatCreationDate(notification.creation_date)}</p>
                            </div>
                            <p>{notification.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <SidebarNotificacoes
                visible={isSidebarVisible}
                onHide={() => setSidebarVisible(false)}
                notification={selectedNotification}
            />
        </>
    );
}
