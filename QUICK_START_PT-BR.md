# 🚀 Guia Rápido - Setup Sólida Zeladoria (Windows)

## ✅ 3 Passos Simples para Funcionamento

### 1️⃣ Instalar Node.js e Dependências

```bash
# Abra o PowerShell e execute:
npm install
```

### 2️⃣ Configurar Email (ESSENCIAL)

**Copiar `.env.example` para `.env`:**
- Abra a pasta do projeto
- Duplicar arquivo `.env.example` → renomear para `.env`

**Editar o arquivo `.env`:**

```
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=sua-senha-de-app
TWILIO_ACCOUNT_SID=deixar-vazio-por-enquanto
TWILIO_AUTH_TOKEN=deixar-vazio-por-enquanto  
TWILIO_PHONE_NUMBER=deixar-vazio-por-enquanto
PORT=3000
```

**🔐 Gerar Senha de App do Gmail:**

1. Abra https://myaccount.google.com/
2. Clique em **Segurança** (lado esquerdo)
3. **Autenticação em 2 etapas** → Ativar
4. Volte e procure por **Senhas de app**
5. Selecione: Mail + Windows
6. Copie a senha de 16 caracteres
7. Cole em `EMAIL_PASSWORD` no `.env`

✅ **Apenas com Gmail funciona 100%!**

### 3️⃣ Iniciar o Servidor

```bash
npm run dev
```

Você verá:
```
========================================
🚀 Servidor de Contato Sólida Zeladoria
========================================
⏱️ Rodando na porta 3000
🌐 URL: http://localhost:3000
...
```

## 🧪 Testar o Formulário

1. Abra http://localhost:3000 no navegador
2. Clique em "Fale Conosco"
3. Preencha o formulário
4. Clique em "Enviar Mensagem"
5. ✅ Popup de sucesso aparece
6. 📧 Email é enviado para Comercial@solidazeladoria.com.br
7. 📧 Email de confirmação vai para o seu email

## 🎯 Fluxo Invisível

Quando o usuário envia a mensagem:
- ✅ Popup sucesso aparece (usuário vê isso)
- 🔄 Atrás dos panos:
  - Email vai para comercial
  - Email de confirmação vai para usuário
  - WhatsApp tentará enviar (se Twilio configurado)
  - **Usuário NÃO vê nada disso!**

## ⚙️ WhatsApp (Opcional)

Se quiser WhatsApp automático:

1. Acesse https://www.twilio.com/ 
2. Crie conta gratuita (créditos de teste)
3. Vá em **Messaging** > **Try it out**
4. Configure WhatsApp
5. Copie credenciais para `.env`:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`

**SEM Twilio:** WhatsApp não funciona, mas EMAIL SIM! 

## 🐛 Troubleshooting

### Erro: "Cannot find module 'express'"
```bash
npm install
```

### Erro: "Connection refused"
- Verifique se `npm run dev` está rodando
- Verifique se está na porta 3000
- Tente porta diferente: editar `.env` → `PORT=3001`

### Erro: "Gmail authentication failed"
- ✅ Use **senha de app** (16 caracteres), não a senha da conta
- ✅ Ative **autenticação 2 etapas** no Gmail
- ✅ Permita **apps menos seguro** (talvez necessário)

### Teste de Configuração
```bash
# Para verificar se tudo está ok:
curl http://localhost:3000/api/test-config
```

## 📁 Estrutura de Arquivos Criada

```
SolidaZeladoria/
├── server.js           ← API de contato
├── script.js           ← Atualizado com fetch
├── index.html          ← Formulário atualizado
├── styles.css
├── package.json        ← Dependências
├── .env                ← Configurações (CRIAR)
├── .env.example        ← Modelo
├── API_SETUP.md        ← Documentação completa
└── setup.sh            ← Script de setup (Linux/Mac)
```

## 📞 Suporte

Se tiver problemas:

1. Leia `API_SETUP.md` (documentação completa)
2. Verifique o console do PowerShell para erros
3. Teste com: `curl http://localhost:3000/api/health`

## 🎉 Pronto!

Agora o site tem:
- ✅ Formulário funcional
- ✅ Envio automático para email
- ✅ Popup de sucesso
- ✅ Resposta automática ao usuário
- ✅ (Opcional) WhatsApp automático

**Nenhum usuário vê a API funcionando - tudo é transparente!**

---

Desenvolvido para: **Sólida Zeladoria**
