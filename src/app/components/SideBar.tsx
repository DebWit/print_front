import React from "react";
import { Sidebar } from "primereact/sidebar";

interface Notification {
  notification_id: string;
  title: string;
  timestamp: number;
  description: string;
  has_seen: boolean;
}

interface SidebarNotificacoesProps {
  visible: boolean;
  onHide: () => void;
  notification: Notification | null;
}

const SidebarNotificacoes: React.FC<SidebarNotificacoesProps> = ({
  visible,
  onHide,
  notification,
}) => {
  return (
    <Sidebar visible={visible} onHide={onHide} fullScreen>
      {notification ? (
        <>
          <h2>{notification.title}</h2>
          <p>{new Date(notification.timestamp * 1000).toLocaleString()}</p>
          <p>{notification.description}</p>
        </>
      ) : (
        <p>Nenhuma notificação selecionada.</p>
      )}
    </Sidebar>
  );
};

export default SidebarNotificacoes;
