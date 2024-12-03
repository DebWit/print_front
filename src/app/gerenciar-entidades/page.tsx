'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMsalInstance } from "../../msalInstance";
import Navbar from "../components/Navbar";
import './style.css';

export default function GerenciarEntidades() {
    const [searchTerm, setSearchTerm] = useState("");
    const [studentOrganizations, setStudentOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentOrganizations = async () => {
            try {
                const msalInstance = await getMsalInstance();
                const accounts = msalInstance.getAllAccounts();

                if (accounts.length === 0) {
                    throw new Error("User not authenticated. Please log in again.");
                }

                const tokenResponse = await msalInstance.acquireTokenSilent({
                    scopes: ["User.Read"],
                    account: accounts[0],
                });

                const response = await axios.get(
                    "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-all-student-organizations",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.accessToken}`,
                        },
                    }
                );

                setStudentOrganizations(response.data.student_organizations);
            } catch (err: any) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentOrganizations();
    }, []);

    const filteredStudentOrganizations = studentOrganizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteStudentOrganization = async (stu_org_id) => {
        try {
            const msalInstance = await getMsalInstance();
            const accounts = msalInstance.getAllAccounts();

            if (accounts.length === 0) {
                throw new Error("User not authenticated. Please log in again.");
            }

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: accounts[0],
            });

            await axios.post(
                `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/delete-student-organization`,
                { stu_org_id },
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            setStudentOrganizations(
                studentOrganizations.filter(org => org.stu_org_id !== stu_org_id)
            );
        } catch (err: any) {
            setError(err.response ? err.response.data.message : err.message);
        }
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
                    placeholder="Procure entidade..." 
                />
                <i className="pi pi-search p-3 search-icon"></i>
            </div>
            <div className="grid flex justify-content-center mt-2 mx-0">
                {loading && <p>Carregando Entidades Estudantis...</p>}
                {error && <p>Error Carregando Entidades Estudantis: {error}</p>}
                {!loading && !error && filteredStudentOrganizations.map((org) => (
                    <div key={org.stu_org_id} className="col-11 lg:col-8">
                        <div className="p-card">
                            <div className="p-card-body">
                                <h4>{org.name}</h4>
                                <p>{org.description}</p>
                                <a 
                                    className="ml-1 p-button p-button-warning" 
                                    href={`/gerenciar-entidade/${org.stu_org_id}`}
                                >
                                    <i className="pi pi-pencil"></i>
                                </a>
                                <button 
                                    className="ml-2 p-button p-button-danger"
                                    onClick={() => deleteStudentOrganization(org.stu_org_id)}
                                >
                                    <i className="pi pi-minus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-4 lg:col-8 col-12">
                    <a 
                        href="/create-student-organization" 
                        className="p-button p-component add mr-2"
                    >
                        +
                    </a>
                </div>
            </div>
        </div>
    );
}
