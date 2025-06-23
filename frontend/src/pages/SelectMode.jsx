import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { testBackendConnection } from "../services/backendControl";
import { setApiBaseUrl } from "../services/api";

const backendManager = window.backendManager;

function SelectMode() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showWarning, setShowWarning] = useState(false);

    const connectTo = async (mode) => {
        const expectedProfile = mode === "docker" ? "prod" : "dev";
        const baseURL = "http://localhost:8080/api";

        setLoading(true);

        const isConnected = await testBackendConnection(baseURL, expectedProfile);

        if (isConnected) {
            setApiBaseUrl(mode);
            setLoading(false);
            navigate("/home");
            return;
        }

        const isRunningDev = await testBackendConnection(baseURL, "dev");
        const isRunningProd = await testBackendConnection(baseURL, "prod");
        const isRunning = isRunningDev || isRunningProd;

        if (isRunning) {
            console.log("🔄 Encerrando backend atual...");
            backendManager.stop();
            await new Promise((res) => setTimeout(res, 2000));
        }

        if (mode === "docker") {
            backendManager.startDocker();
        } else {
            backendManager.startDev();
        }

        let attempts = 0;
        let connected = false;

        while (attempts < 15) {
            connected = await testBackendConnection(baseURL, expectedProfile);
            if (connected) break;
            await new Promise((res) => setTimeout(res, 1000));
            attempts++;
        }

        setLoading(false);

        if (connected) {
            setApiBaseUrl(mode);
            navigate("/home");
        } else {
            setErrorMessage(
                `❌ Não foi possível conectar ao backend no modo ${mode.toUpperCase()}.\n
Verifique se o backend e/ou Docker estão rodando corretamente.`
            );
            setShowError(true);
        }
    };

    const handleSelectH2 = () => connectTo("h2");

    const handleSelectDocker = () => setShowWarning(true);

    const handleConfirmDocker = () => {
        setShowWarning(false);
        connectTo("docker");
    };

    return (
        <div className="flex flex-col gap-8 items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold">Selecione o modo</h1>
            <div className="flex gap-8">
                <button
                    onClick={handleSelectH2}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded text-lg"
                >
                    H2
                </button>
                <button
                    onClick={handleSelectDocker}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded text-lg"
                >
                    Docker
                </button>
            </div>

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
                        <p className="text-lg font-medium">Testando conexão...</p>
                    </div>
                </div>
            )}

            {showWarning && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-yellow-600">⚠️ Atenção</h2>
                        <p className="mb-6 text-gray-700 whitespace-pre-line">
                            Você está saindo do modo H2 (armazenamento temporário).
                            Os dados feitos aqui não serão salvos.
                            O aplicativo tentará iniciar o backend no modo Docker (MySQL - armazenamento persistente).
                            Caso não esteja funcionando, você retornará para a seleção de modos.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowWarning(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDocker}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showError && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-red-600">Erro de conexão</h2>
                        <p className="mb-6 text-gray-700 whitespace-pre-line">{errorMessage}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowError(false)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SelectMode;
