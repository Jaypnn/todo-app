import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import StatusButton from "./StatusButton";
import ConfirmModal from "./ConfirmModal";

function TaskRow({ task, refreshTasks }) {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleEdit = () => {
        navigate(`/edit/${task.id}`);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/tasks/${task.id}`);
            refreshTasks();
            setShowConfirm(false);
        } catch (error) {
            console.error("Erro ao deletar task", error);
        }
    };

    return (
        <>
            <div className="bg-white p-4 rounded shadow flex items-center justify-between">
                <div>
                    <p className="text-lg font-semibold">{task.title}</p>
                    <p className="text-sm text-gray-600">ID: {task.id}</p>
                    {task.description && (
                        <p className="text-sm text-gray-800">{task.description}</p>
                    )}
                </div>
                <div className="flex gap-2 items-center">
                    <StatusButton task={task} refreshTasks={refreshTasks} />
                    <button
                        onClick={handleEdit}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                        Deletar
                    </button>
                </div>
            </div>

            <ConfirmModal
                isOpen={showConfirm}
                title="Confirmar Exclusão"
                message={`Tem certeza que deseja deletar a task "${task.title}"?`}
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
}

export default TaskRow;
