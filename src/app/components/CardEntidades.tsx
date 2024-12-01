'use client';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function CardPadrao({ dados }: { dados: any }) {
    const header = (
        <img
            alt="Card"
            src={dados.course_photo}
            style={{
                width: "100%", 
                height: "200px", 
                objectFit: "cover",
            }}
        />
    );

    const customTitle = (
        <div className="flex justify-content-between align-items-center">
            <span
                style={{
                    fontFamily: "'Lilita One', sans-serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 1.5rem)",
                    color: "black",
                }}
            >
                {dados.name}
            </span>
            <a
                href={`/entidade/${dados.name
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}`}
                style={{ textDecoration: "none" }}
            >
                <Button
                    label="VER"
                    className="ml-2"
                    style={{ backgroundColor: "#060153" }}
                />
            </a>
        </div>
    );

    return (
        <div
            className="card flex justify-content-center mt-2"
            style={{
                display: "flex",
                flexDirection: "column",
                height: "350px",
                width: "100%",
                maxWidth: "300px", 
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            <Card
                title={customTitle}
                header={header}
                style={{
                    height: "100%",
                }}
            ></Card>
        </div>
    );
}
