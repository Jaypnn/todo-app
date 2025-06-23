export async function testBackendConnection(baseURL, expectedProfile) {
    try {
        const response = await fetch(`${baseURL}/health`);
        const data = await response.json();

        const backendOnline =
            response.status === 200 && data.profile === expectedProfile;

        console.log(
            `✔️ Teste Backend: status=${response.status}, profile=${data.profile}, esperado=${expectedProfile}`
        );

        return backendOnline;
    } catch (error) {
        console.error("❌ Erro ao testar conexão com backend:", error);
        return false;
    }
}
