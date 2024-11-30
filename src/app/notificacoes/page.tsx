'use client';
import { useState } from "react";
import Navbar from "../components/Navbar";
import SidebarNotificacoes from "../components/SideBar";
import "./style.css";

interface Notification {
    notification_id: string;
    title: string;
    timestamp: number;
    description: string;
    has_seen: boolean;
}

export default function Notificacoes() {
    const [notificacoes, setNotificacoes] = useState<Notification[]>([
        {
            notification_id: "d65308fd-6940-4d6d-92b5-6247d8af834a",
            title: "Notificação 1",
            timestamp: 1732725960,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium perferendis fuga veritatis tempore nemo. At maiores exercitationem nihil rem doloremque suscipit dolorem, expedita, cum porro eaque dignissimos quasi eum nostrum.",
            has_seen: false
        },
        {
            notification_id: "a0f0ecf7-e86d-40ab-8bc7-e9d9d9f3c842",
            title: "Notificação 2",
            timestamp: 1732801320,
            description: "Exercitationem perspiciatis dolorum, magni hic error recusandae suscipit iusto nobis est? Consequatur mollitia voluptas officia quaerat nisi sequi quaerat, accusamus ad quisquam. Optio laborum saepe neque nulla.",
            has_seen: false
        },
        {
            notification_id: "b82edb14-88ea-4754-b67e-b1d0c1a50239",
            title: "Notificação 3",
            timestamp: 1732897640,
            description: "Quis voluptatibus sunt nesciunt similique? Beatae, velit quaerat! Nulla, ipsum deserunt accusantium sapiente eius. Quisquam obcaecati dolorum rerum laborum est tempora, quibusdam nobis quae aliquam praesentium?",
            has_seen: false
        },
        {
            notification_id: "f1a2d953-e7b5-44a3-b710-c6b50635b02c",
            title: "Notificação 4",
            timestamp: 1732983960,
            description: "Sed enim vitae velit voluptatem repellendus, odio ut, veniam veritatis tempora dignissimos saepe mollitia ab distinctio. Autem neque dolores reprehenderit mollitia doloribus facere.",
            has_seen: false
        }
    ]);

    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const handleNotificationClick = (notification: Notification) => {
        setSelectedNotification(notification);
        setSidebarVisible(true);
        setNotificacoes((prevNotificacoes) =>
            prevNotificacoes.map((notif) =>
                notif.notification_id === notification.notification_id
                    ? { ...notif, has_seen: true }
                    : notif
            )
        );
    };

    const formatTimestamp = (timestamp: number): string => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

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
                                    className={`remove-button ml-3 lg:ml-0 ${notification.has_seen ? "seen" : "unseen"}`}
                                />
                                <h3>{notification.title}</h3>
                                <p>{formatTimestamp(notification.timestamp)}</p>
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
