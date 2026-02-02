#!/usr/bin/env bash

# ===================================================================
# SCRIPT DE INICIALIZAÇÃO RÁPIDA - Sólida Zeladoria
# ===================================================================
# Este script irá:
# 1. Verificar se Node.js está instalado
# 2. Instalar dependências
# 3. Criar arquivo .env se não existir
# 4. Iniciar o servidor
# ===================================================================

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   🚀 SÓLIDA ZELADORIA - Sistema de Contato                ║"
echo "║   Inicialização Automática                                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo ""
    echo "Por favor, instale Node.js em:"
    echo "   https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Instalar dependências se não existir node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    echo "✅ Dependências instaladas!"
else
    echo "✅ Dependências já estão instaladas"
fi

echo ""

# Criar .env se não existir
if [ ! -f ".env" ]; then
    echo "⚠️ Arquivo .env não encontrado!"
    echo ""
    echo "Criando arquivo .env baseado em .env.example..."
    cp .env.example .env
    echo "✅ Arquivo .env criado!"
    echo ""
    echo "Você precisa editar o arquivo .env com:"
    echo "  1. EMAIL_USER = seu email Gmail"
    echo "  2. EMAIL_PASSWORD = sua senha de app do Gmail"
    echo ""
    echo "Leia COMECE_AQUI.md para instruções detalhadas!"
    echo ""
else
    echo "✅ Arquivo .env encontrado"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   🎯 Iniciando Servidor                                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

npm run dev
