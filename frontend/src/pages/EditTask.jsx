import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";

function EditTask() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("A_FAZER");

    const [initialTask, setInitialTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await api.get(`/tasks/${id}`);
            const { title, description, status } = response.data;
            setTitle(title);
            setDescription(description);
            setStatus(status);
            setInitialTask({ title, description, status });
        } catch (error) {
            console.error("Erro ao buscar task", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/tasks/${id}`, {
                title,
                description,
                status,
            });
            navigate("/home");
        } catch (error) {
            console.error("Erro ao editar task", error);
        }
    };

    const handleBack = () => {
        const hasChanges =
            title !== initialTask.title ||
            description !== initialTask.description ||
            status !== initialTask.status;

        if (hasChanges) {
            setShowModal(true);
        } else {
            navigate("/home");
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
            <h1 className="text-3xl font-bold mb-2">Editar Task #{id}</h1>
            <StatusBadge status={status} />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 mt-4">
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
                        onClick={handleBack}
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

            {/* Modal de confirmação */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Descartar alterações?</h2>
                        <p className="mb-6">
                            Você tem alterações não salvas. Deseja descartar?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Continuar editando
                            </button>
                            <button
                                onClick={() => navigate("/home")}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Descartar alterações
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditTask;
