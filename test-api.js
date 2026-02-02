// Arquivo de teste para verificar se a API está funcionando
// Cole no console do navegador (F12 -> Console)

// Teste 1: Verificar se o servidor está rodando
async function testarServidor() {
    try {
        const response = await fetch('http://localhost:3000/api/health');
        const data = await response.json();
        console.log('✅ Servidor está rodando!', data);
    } catch (error) {
        console.error('❌ Servidor não está respondendo:', error.message);
        console.log('💡 Dica: Execute "npm run dev" no terminal');
    }
}

// Teste 2: Verificar configuração
async function testarConfig() {
    try {
        const response = await fetch('http://localhost:3000/api/test-config');
        const data = await response.json();
        console.log('⚙️ Configuração:', data);
        
        if (data.email_configured) {
            console.log('✅ Email configurado');
        } else {
            console.log('❌ Email NÃO configurado - crie o arquivo .env');
        }
        
        if (data.twilio_configured) {
            console.log('✅ Twilio configurado (WhatsApp habilitado)');
        } else {
            console.log('⚠️ Twilio NÃO configurado (WhatsApp desabilitado)');
        }
    } catch (error) {
        console.error('❌ Erro ao verificar configuração:', error.message);
    }
}

// Teste 3: Enviar mensagem de teste
async function testarEnvio() {
    const dadosTeste = {
        name: 'Teste de Contato',
        email: 'seu-email@gmail.com', // ALTERE PARA SEU EMAIL
        subject: 'Teste',
        message: 'Esta é uma mensagem de teste da API'
    };

    try {
        console.log('📤 Enviando mensagem de teste...');
        const response = await fetch('http://localhost:3000/api/send-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosTeste)
        });

        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Mensagem enviada com sucesso!');
            console.log('📧 Verifique o email: seu-email@gmail.com');
            console.log('📧 Verifique também: Comercial@solidazeladoria.com.br');
        } else {
            console.error('❌ Erro:', data.error);
        }
    } catch (error) {
        console.error('❌ Erro ao enviar:', error.message);
    }
}

// Teste 4: Executar todos os testes
async function testarTudo() {
    console.clear();
    console.log('🧪 Iniciando testes da API...\n');
    
    console.log('--- Teste 1: Servidor ---');
    await testarServidor();
    
    console.log('\n--- Teste 2: Configuração ---');
    await testarConfig();
    
    console.log('\n--- Teste 3: Envio (DESCOMENTE PARA EXECUTAR) ---');
    console.log('// await testarEnvio()');
}

// Executar todos os testes
testarTudo();

console.log('\n═══════════════════════════════════════');
console.log('💡 Comandos disponíveis:');
console.log('═══════════════════════════════════════');
console.log('testarServidor()  - Verifica se server está rodando');
console.log('testarConfig()    - Verifica configuração (email, twilio)');
console.log('testarEnvio()     - Envia mensagem de teste');
console.log('testarTudo()      - Executa todos os testes');
console.log('═══════════════════════════════════════\n');
