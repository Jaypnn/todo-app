import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import TaskRow from "../components/TaskRow";

function Home() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [orderBy, setOrderBy] = useState("id");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Erro ao buscar tasks:", error);
            setTasks([]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreate = () => {
        navigate("/create");
    };

    const filteredTasks = tasks
        .filter((task) => {
            const matchesSearch =
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.id.toString().includes(search);
            const matchesStatus =
                statusFilter === "all" || task.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (orderBy === "id") return a.id - b.id;
            if (orderBy === "title") return a.title.localeCompare(b.title);
            if (orderBy === "status") return a.status.localeCompare(b.status);
            return 0;
        });

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Lista de Tasks</h1>

            <div className="flex gap-4 mb-4 flex-wrap">
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Nova Task
                </button>
                <input
                    type="text"
                    placeholder="Pesquisar por ID ou Título..."
                    className="border px-4 py-2 rounded flex-1 min-w-[200px]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                    className="border px-4 py-2 rounded"
                >
                    <option value="id">Ordenar por ID</option>
                    <option value="title">Ordenar por Título</option>
                    <option value="status">Ordenar por Status</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border px-4 py-2 rounded"
                >
                    <option value="all">Todos os Status</option>
                    <option value="A_FAZER">A Fazer</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="PAUSADO">Pausado</option>
                    <option value="CONCLUIDO">Concluído</option>
                </select>
            </div>

            {filteredTasks.length === 0 ? (
                <p className="text-gray-600">Nenhuma task encontrada.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {filteredTasks.map((task) => (
                        <TaskRow key={task.id} task={task} refreshTasks={fetchTasks} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
