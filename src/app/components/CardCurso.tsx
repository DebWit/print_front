import React from 'react'; 
import { Card } from 'primereact/card';

export default function CardCurso({title, photo, style}: {title: string, photo: string, style: any}) {
    return (
        <div className="card">
            <Card style={style.card}>
            <div className="grid">
                <div className="col-4">
                    <img style={style.photo} src="/background-splash.png" alt={`Foto do Coordenador: ${title}`} />
                </div>
                <div className="col-8 mt-3">
                    <h3 className='name-coordinator mx-3 my-0' style={style.name}>
                        {title}
                    </h3>
                    <h4 className='mx-3 my-0' style={{"color": "white"}}>Coordenador</h4>
                </div>
            </div>
            </Card>
        </div>
    )
}