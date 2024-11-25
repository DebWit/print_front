'use client';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function CardPadrao({ dados }: { dados: Object }) {
    const header = (
        <img alt="Card" src={dados.course_photo} />
    );

    const customTitle = (
        <div className="flex justify-content-between align-items-center">
            <span style={{ fontFamily: "'Lilita One', sans-serif", fontSize: "24px", color: "black" }}>
                {dados.name}
            </span>
            <a href={`/curso/${dados.course_id}`} style={{ textDecoration: 'none' }}>
                <Button label="VER" className="ml-2" style={{ backgroundColor: "#060153" }} />
            </a>
        </div>
    );

    return (
        <div className="card flex justify-content-center mt-2">
            <Card title={customTitle} header={header}>
            </Card>
        </div>
    );
}
