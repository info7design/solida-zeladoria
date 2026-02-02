# 🎯 Passo a Passo Final - Iniciar o Sistema

## 1️⃣ ABRA O POWERSHELL NA PASTA DO PROJETO

Pressione `Shift + Clique direito` → `Abrir PowerShell aqui`

## 2️⃣ INSTALE AS DEPENDÊNCIAS

```powershell
npm install
```

Aguarde a instalação (pode levar 2-3 minutos)

## 3️⃣ CONFIGURE O EMAIL

1. **Crie o arquivo `.env`:**
   - Procure por `.env.example` na pasta
   - Copie ele (Ctrl+C)
   - Cole na mesma pasta (Ctrl+V) 
   - Renomeie de `.env.example - Cópia` para `.env`

2. **Edite o arquivo `.env`:**
   - Abra com Bloco de Notas
   - Preencha apenas estas 2 linhas:
   ```
   EMAIL_USER=seu-email@gmail.com
   EMAIL_PASSWORD=sua-senha-de-app
   ```

3. **Gere a senha de app do Gmail:**
   - Abra https://myaccount.google.com/
   - Clique em **Segurança**
   - Ative **Autenticação em 2 etapas** (se não tiver)
   - Procure por **Senhas de app**
   - Selecione: **Mail** + **Windows**
   - Copie a senha de 16 caracteres
   - Cole em `EMAIL_PASSWORD` no arquivo `.env`

4. **Salve o arquivo `.env`**

## 4️⃣ INICIE O SERVIDOR

No PowerShell, execute:

```powershell
npm run dev
```

Você verá algo como:

```
========================================
🚀 Servidor de Contato Sólida Zeladoria
========================================
⏱️ Rodando na porta 3000
🌐 URL: http://localhost:3000
📧 Email de comercial: Comercial@solidazeladoria.com.br
💬 WhatsApp: 12982993709
📡 Endpoint: POST /api/send-contact
========================================
```

✅ **Se vir isso, está funcionando!**

## 5️⃣ TESTE O FORMULÁRIO

1. Abra seu navegador: http://localhost:3000
2. Clique em "Fale Conosco" (no menu)
3. Preencha o formulário:
   - Nome: Seu Nome
   - Email: seu-email@gmail.com
   - Assunto: Orçamento para Condomínio
   - Mensagem: Teste do formulário

4. Clique "Enviar Mensagem"

5. ✅ Um popup dirá: "Mensagem Enviada!"

6. 📧 Verifique seus emails:
   - **Email 1:** Você receberá um email de confirmação
   - **Email 2:** O comercial receberá no: Comercial@solidazeladoria.com.br

## 6️⃣ PRONTO! 🎉

Seu sistema está funcionando completamente!

---

## ❌ Se algo der errado...

### Erro: "npm: O termo não é reconhecido"
- Node.js não está instalado
- Baixe em: https://nodejs.org/
- Reinicie o PowerShell depois

### Erro: "Cannot find module 'express'"
```powershell
npm install
```

### Erro: "Gmail authentication failed"
- ✅ Você gerou a senha de app? (não a senha da conta)
- ✅ Ativou autenticação 2 etapas?
- ✅ Copiou certo os 16 caracteres?

### Não está vendo o PopUp
- Abra F12 (Developer Tools)
- Vá na aba "Console"
- Procure por erros em vermelho

### Email não está chegando
- Verifique spam/lixo eletrônico
- Verifique se colocou email certo em `EMAIL_USER`
- Verifique os logs no PowerShell (haverá ✅ ou ❌)

---

## 📚 Documentos Importantes

- **`QUICK_START_PT-BR.md`** - Guia rápido
- **`API_SETUP.md`** - Documentação técnica completa
- **`IMPLEMENTATION_SUMMARY.md`** - O que foi criado
- **`DEPLOY.md`** - Como colocar online

---

## ✨ O que Vai Acontecer

Quando um usuário enviar mensagem pelo site:

1. Usuário **preenche** formulário e clica "Enviar"
2. **Popup aparece** → "Mensagem Enviada!" ✅
3. **Atrás dos panos** (usuário não vê):
   - 📧 Email vai pro comercial
   - 📧 Email de confirmação vai pro usuário
   - 💬 WhatsApp envia (se configurado)
4. Usuário **fecha o popup** e continua navegando
5. **Ninguém vê a API funcionando** - tudo é transparente! 🎭

---

## 🚀 Próximo Passo (quando quiser colocar online)

Leia: `DEPLOY.md`

---

**Desenvolvido para:** Sólida Zeladoria
**Suporte:** Leia os arquivos .md na pasta
