'use client';
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './style.css';

export default function GerenciarCursos() {
    const [searchTerm, setSearchTerm] = useState("");
    const [cursos, setCursos] = useState([
        {
            course_id: "3d9221a7-ef6b-4b6a-90ed-aa6de72c5504",
            course_name: "Ciência da Computação",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores eos quis, in repudiandae delectus reprehenderit? Id fuga officia sapiente."
        },
        {
            course_id: "2a3121b7-bf9e-4f6d-8e1c-4d76c7a09cfa",
            course_name: "Sistema de Informação",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores eos quis, in repudiandae delectus reprehenderit? Id fuga officia sapiente."
        },
        {
            course_id: "7b3216c9-1ad8-4e52-8c5a-68874a076b9c",
            course_name: "Design",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores eos quis, in repudiandae delectus reprehenderit? Id fuga officia sapiente."
        },
        {
            course_id: "8a2725d3-26a4-4f0f-bc59-8d7e35edb42e",
            course_name: "Engenharia Mecânica",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores eos quis, in repudiandae delectus reprehenderit? Id fuga officia sapiente."
        }
    ]);

    const filteredCursos = cursos.filter(curso =>
        curso.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteCourse = (course_id) => {
        setCursos(cursos.filter(curso => curso.course_id !== course_id));
    };

    return (
        <div>
            <Navbar text="Gerenciar Cursos" anchor="/home" />
            <div className="p-inputgroup mt-3 flex justify-content-center" style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <input 
                    type="text" 
                    className="p-inputtext p-component" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Pesquisar curso..." 
                />
                <i className="pi pi-search p-3 search-icon"></i>
            </div>
            <div className="grid flex justify-content-center mt-2 mx-0">
                {filteredCursos.map((curso) => (
                    <div key={curso.course_id} className="col-11 lg:col-8">
                        <div className="p-card">
                            <div className="p-card-body">
                                <h4>{curso.course_name}</h4>
                                <p>{curso.description}</p>
                                <a className="mr-1 p-button p-button-warning" href={`/gerenciar-curso/${curso.course_id}`}>
                                    <i className="pi pi-pencil"></i>
                                </a>
                                <button 
                                    className="p-button p-component p-button-danger" 
                                    onClick={() => deleteCourse(curso.course_id)}
                                >
                                    <i className="pi pi-minus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            <div className="mt-4 lg:col-8 col-12">
                <a 
                    href="/criar-curso" 
                    className="p-button p-component add mr-2"
                    >
                    +
                </a>
            </div>
        </div>
        </div>
    );
}
