import { useState } from "react";
import api from "../services/api";

const statuses = [
    { label: "A Fazer", value: "A_FAZER", color: "bg-blue-600" },
    { label: "Em Andamento", value: "EM_ANDAMENTO", color: "bg-yellow-500" },
    { label: "Concluído", value: "CONCLUIDO", color: "bg-green-600" },
    { label: "Pausado", value: "PAUSADO", color: "bg-gray-500" },
];

function StatusButton({ task, refreshTasks }) {
    const [isOpen, setIsOpen] = useState(false);

    const currentStatus = statuses.find((s) => s.value === task.status);

    const handleSelect = async (status) => {
        try {
            await api.put(`/tasks/${task.id}`, {
                id: task.id,
                title: task.title,
                description: task.description,
                status: status.value,
            });
            refreshTasks();
            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao alterar status", error);
        }
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-white ${currentStatus.color}`}
                >
                    {currentStatus.label}
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute z-50 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        {statuses.map((status) => (
                            <button
                                key={status.value}
                                onClick={() => handleSelect(status)}
                                className={`${
                                    status.value === task.status ? "font-bold" : "font-normal"
                                } group flex items-center w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100`}
                            >
                <span
                    className={`w-3 h-3 rounded-full mr-2 ${status.color}`}
                ></span>
                                {status.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default StatusButton;
