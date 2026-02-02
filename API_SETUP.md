# Configuração da API de Contato - Sólida Zeladoria

## 📋 Requisitos

- Node.js (v14 ou superior)
- npm (gerenciador de pacotes)
- Conta Gmail com senha de app
- Conta Twilio (para WhatsApp)

## 🚀 Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (baseado em `.env.example`):

```
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=sua-senha-app-google
TWILIO_ACCOUNT_SID=seu-account-sid
TWILIO_AUTH_TOKEN=seu-auth-token
TWILIO_PHONE_NUMBER=+55XXXXXXXXXX
PORT=3000
```

### 3. Configurar Gmail

Para usar Gmail como servidor de email:

1. Acesse sua conta Google: https://myaccount.google.com/
2. Vá em **Segurança** (seção esquerda)
3. Ative **Autenticação em 2 etapas**
4. Volte à segurança e procure por **Senhas de app**
5. Selecione **Mail** e **Windows Computer**
6. Copie a senha de 16 caracteres gerada
7. Use esta senha no `.env` como `EMAIL_PASSWORD`

### 4. Configurar Twilio (WhatsApp)

Para enviar mensagens via WhatsApp:

1. Acesse: https://www.twilio.com/
2. Crie uma conta (teste gratuito com créditos)
3. Vá para **Messaging** > **Services**
4. Crie um novo serviço Messaging
5. Adicione o WhatsApp como canal
6. Copie:
   - **Account SID** → `TWILIO_ACCOUNT_SID`
   - **Auth Token** → `TWILIO_AUTH_TOKEN`
   - **Phone Number do Twilio** → `TWILIO_PHONE_NUMBER`

7. Confirme o número de WhatsApp para teste (12982993709)

## 🏃 Executar

### Desenvolvimento (com auto-reload)

```bash
npm run dev
```

### Produção

```bash
npm start
```

O servidor rodará em `http://localhost:3000`

## 🔌 API Endpoints

### POST /api/send-contact

Envia uma mensagem de contato para email e WhatsApp

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "subject": "Orçamento para Condomínio",
  "message": "Gostaria de um orçamento..."
}
```

**Response (Sucesso):**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!"
}
```

**Response (Erro):**
```json
{
  "success": false,
  "error": "Descrição do erro"
}
```

## 🌐 Integração Frontend

O formulário no `index.html` já está configurado para enviar para a API automaticamente.

A requisição é feita via JavaScript (fetch) diretamente do navegador.

## 🔒 Segurança

- As credenciais estão no `.env` (não incluído no git)
- A API valida todos os campos obrigatórios
- CORS está habilitado para localhost
- Respostas automáticas são enviadas aos usuários

## 📝 Fluxo de Funcionamento

1. Usuário preenche o formulário e clica em "Enviar Mensagem"
2. JavaScript valida os dados e envia para a API
3. API recebe a requisição
4. **Email 1:** Envia para `Comercial@solidazeladoria.com.br`
5. **Email 2:** Envia resposta automática para o usuário
6. **WhatsApp:** Envia para `12982993709`
7. Popup de sucesso aparece no frontend (sem mostrar chamadas à API)

## ⚠️ Troubleshooting

### "Connection refused" ao enviar mensagem
- Verifique se o servidor está rodando (`npm run dev`)
- Verifique se está na porta 3000

### "CORS error"
- Verifique se o frontend está acessando `http://localhost:3000`
- Verifique se o CORS está habilitado no server.js

### "Gmail authentication failed"
- Verifique se você usou a senha de app (16 caracteres), não a senha da conta
- Verifique se a autenticação em 2 etapas está ativada

### "Twilio error"
- Verifique as credenciais do Twilio no `.env`
- Verifique se o número foi confirmado como remetente
- Verifique se há créditos na conta

## 📧 Emails Configurados

- **Para o comercial:** `Comercial@solidazeladoria.com.br`
- **Resposta automática:** Enviada para o email do usuário
- **WhatsApp:** `+5512982993709`

## 🎯 Próximos Passos

1. Testar localmente com `npm run dev`
2. Fazer deploy em um servidor (Heroku, AWS, etc.)
3. Atualizar URL da API no `script.js` (de localhost para URL do servidor)
4. Adicionar camada de validação mais robusta
5. Considerar implementar reCAPTCHA para prevenir spam

---

**Desenvolvido para:** Sólida Zeladoria
**Data:** 2026
