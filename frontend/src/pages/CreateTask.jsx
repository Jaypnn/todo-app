import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateTask() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("A_FAZER");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/tasks", {
                title,
                description,
                status,
            });
            navigate("/home");
        } catch (error) {
            console.error("Erro ao criar task", error);
        }
    };

    const statusOptions = [
        { label: "A Fazer", value: "A_FAZER" },
        { label: "Em Andamento", value: "EM_ANDAMENTO" },
        { label: "Concluído", value: "CONCLUIDO" },
        { label: "Pausado", value: "PAUSADO" },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Criar Nova Task</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
                <input
                    type="text"
                    placeholder="Título (obrigatório)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border p-2 rounded"
                >
                    {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate("/home")}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateTask;
