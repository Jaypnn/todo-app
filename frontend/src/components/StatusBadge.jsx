function StatusBadge({ status }) {
    const statusColors = {
        A_FAZER: "bg-blue-600",
        EM_ANDAMENTO: "bg-yellow-500",
        CONCLUIDO: "bg-green-600",
        PAUSADO: "bg-gray-500",
    };

    const statusLabels = {
        A_FAZER: "A Fazer",
        EM_ANDAMENTO: "Em Andamento",
        CONCLUIDO: "Concluído",
        PAUSADO: "Pausado",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-white text-sm ${statusColors[status]}`}
        >
      {statusLabels[status] || status}
    </span>
    );
}

export default StatusBadge;
