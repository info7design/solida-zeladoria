#!/bin/bash

echo "================================================"
echo "Setup Sólida Zeladoria API de Contato"
echo "================================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "Download em: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

echo ""
echo "✅ Dependências instaladas!"
echo ""
echo "================================================"
echo "Próximo Passo: Configurar o arquivo .env"
echo "================================================"
echo ""
echo "1. Copie o arquivo .env.example para .env:"
echo "   cp .env.example .env"
echo ""
echo "2. Abra o arquivo .env e preencha com:"
echo "   - EMAIL_USER: seu email Gmail"
echo "   - EMAIL_PASSWORD: senha de app do Gmail"
echo "   - TWILIO_ACCOUNT_SID: seu Account SID do Twilio"
echo "   - TWILIO_AUTH_TOKEN: seu Auth Token do Twilio"
echo "   - TWILIO_PHONE_NUMBER: número do Twilio"
echo ""
echo "3. Leia o arquivo API_SETUP.md para instruções detalhadas"
echo ""
echo "4. Para iniciar o servidor:"
echo "   npm run dev"
echo ""
echo "================================================"
