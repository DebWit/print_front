'use client';
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './style.css';

export default function GerenciarEntidades() {
    const [searchTerm, setSearchTerm] = useState("");
    const [entidades, setEntidades] = useState([
        {
            stu_org_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Concreto Mauá",
            description: "O Concreto Mauá estimula a proatividade dos alunos, pensando em soluções diversas para competições acadêmicas sobre projetos completos de arquitetura, uso de concreto e suas mais diversas aplicações. Participamos das competições do Instituto Brasileiro do Concreto (IBRACON) e do American Concrete Institute (ACI). As competições que participamos anualmente são: CONCREBOL, APO (Aparato de Proteção ao Ovo), COCAR (Concreto Colorido de Alta Resistência), QSFV (Quem Sabe Faz Ao Vivo) e OUSADIA.",
            url: "https://d1135f49d6br9m.cloudfront.net/LOGO CONCRETO MAUA.jpg",
            instagram: "https://www.instagram.com/concreto.maua/"
        },
        {
            stu_org_id: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
            name: "IMT Aerodesign",
            description: "Unimos alunos de diversas áreas (engenharia, design, administração e TI), todos motivados a explorar e aprender mais sobre o fascinante mundo aeroespacial. A nossa equipe está envolvida na competição da SAE Aerodesign em São José dos Campos, cujo objetivo é desenvolver aeronaves cargueiras. A competição compreende duas fases, onde são avaliados tanto o projeto quanto a qualidade do voo e a capacidade de carga. O céu não é o limite, para nós, ele é só o começo!",
            url: "https://d1135f49d6br9m.cloudfront.net/Logo Aerodesign.jpg",
            instagram: "https://www.instagram.com/Imt_aerodesign/"
        },
        {
            stu_org_id: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
            name: "Mauá Racing",
            description: "A equipe constitui-se como uma empresa estudantil de automobilismo. Os estudantes projetam, constroem e competem com um veículo de alta performance do tipo fórmula, utilizando um motor de até 710 cilindradas. Durante quatro dias de competição pela SAE Brasil, as equipes realizam provas estáticas e provas dinâmicas. O 1º e 2º colocados conquistam o direito de representar o Brasil na Fórmula SAE nos EUA.",
            url: "https://d1135f49d6br9m.cloudfront.net/Mauá Racing Fórmula.jpg",
            instagram: "https://www.instagram.com/mauaracing/"
        },
        {
            stu_org_id: "6fa85f64-5717-4562-b3fc-2c963f66afa9",
            name: "Eco Mauá",
            description: "Formada por alunos do Instituto Mauá de Tecnologia, a Eco Mauá tem como objetivo produzir veículos com uma maior eficiência energética, podendo ser movidos a gasolina, elétricos ou a hidrogênio. Hoje, a Eco é dividida em 6 setores, são eles: Powertrain, Estruturas, Elétrica, RH, Financeiro e Marketing. Além da eficiência energética, inovação tecnológica, segurança do piloto e impacto ambiental são importantes para a avaliação da equipe. Já participamos em grandes competições, entre elas a Shell Eco-Marathon, Petrobras e Inventum.",
            url: "https://d1135f49d6br9m.cloudfront.net/Logo Eco Mauá.png",
            instagram: "https://www.instagram.com/eco_maua/"
        }
    ]);

    const filteredEntidades = entidades.filter(entidade =>
        entidade.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteEntidade = (stu_org_id) => {
        setEntidades(entidades.filter(entidade => entidade.stu_org_id !== stu_org_id));
    };

    return (
        <div>
            <Navbar text="Gerenciar Entidades" anchor="/home" />
            <div className="p-inputgroup mt-3 flex justify-content-center" style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <input 
                    type="text" 
                    className="p-inputtext p-component" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Pesquisar entidade..." 
                />
                <i className="pi pi-search p-3 search-icon"></i>
            </div>
            <div className="grid flex justify-content-center mt-2 mx-0">
                {filteredEntidades.map((entidade) => (
                    <div key={entidade.stu_org_id} className="col-11 lg:col-8">
                        <div className="p-card">
                            <div className="p-card-body">
                                <h4>{entidade.name}</h4>
                                <p>{entidade.description}</p>
                                <a 
                                    className="ml-1 p-button p-button-warning" 
                                    href={`/gerenciar-entidade/${entidade.stu_org_id}`}
                                >
                                    <i className="pi pi-pencil"></i>
                                </a>
                                <button 
                                    className="ml-2 p-button p-button-danger"
                                    onClick={() => deleteEntidade(entidade.stu_org_id)}
                                >
                                    <i className="pi pi-minus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-4 lg:col-8 col-12">
                    <a 
                        href="/criar-entidade" 
                        className="p-button p-component add mr-2"
                        >
                        +
                    </a>
                </div>
            </div>
        </div>
    );
}
