const { spawn } = require('child_process');
const path = require('path');

let backendProcess = null;

function startDev() {
    if (backendProcess) stop();

    console.log('🔵 Iniciando backend via .jar...');

    const jarPath = path.resolve(__dirname, '..', 'backend', 'target', 'todolist-0.0.1-SNAPSHOT.jar');

    backendProcess = spawn(
        'java',
        ['-jar', jarPath, '--spring.profiles.active=dev'],
        {
            cwd: path.resolve(__dirname, '..', 'backend'),
            shell: true,
            stdio: 'inherit'
        }
    );

    backendProcess.on('close', (code) => {
        console.log(`⚪ Backend encerrado com código ${code}`);
        backendProcess = null;
    });

    backendProcess.on('error', (err) => {
        console.error('❌ Erro ao iniciar backend:', err);
    });
}

function stop() {
    if (backendProcess) {
        console.log('🛑 Encerrando backend...');
        backendProcess.kill('SIGTERM');
        backendProcess = null;
    } else {
        console.log('⚠️ Nenhum backend rodando.');
    }
}

module.exports = { startDev, stop };
