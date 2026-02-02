# ✨ Atualização: Campo "Trabalhe Conosco" com Upload de Currículo

## 🎉 Novo Recurso

Adicionamos a funcionalidade de **upload de currículo** ao campo "Trabalhe Conosco".

---

## 📝 Como Funciona

### 1️⃣ Usuário seleciona "Trabalhe Conosco"
```
Quando o usuário escolhe "Trabalhe Conosco" no dropdown de Assunto...
```

### 2️⃣ Campo de upload aparece automaticamente
```
Um campo com design especial (borda azul tracejada) aparece para upload
```

### 3️⃣ Usuário envia currículo junto com a mensagem
```
- Seleciona arquivo (PDF, DOC, DOCX, TXT)
- Máximo 5MB
- Envia junto com nome, email e mensagem
```

### 4️⃣ Sistema processa e envia
```
- Email para comercial COM CURRÍCULO ANEXADO
- Resposta automática para usuário
- WhatsApp de notificação
```

---

## 🛠️ Mudanças Técnicas

### Frontend (script.js)
✅ Detecta quando "Trabalhe Conosco" é selecionado  
✅ Mostra/esconde campo de upload  
✅ Valida arquivo antes de enviar  
✅ Envia como FormData com arquivo  

### Backend (server.js)
✅ Adicionado multer para processamento de upload  
✅ Validação de tipo de arquivo  
✅ Limite de tamanho (5MB)  
✅ Anexa arquivo ao email  
✅ Limpa arquivo após envio  

### HTML (index.html)
✅ Campo de upload com design atraente  
✅ Aparece apenas quando necessário  
✅ Mensagem sobre formatos aceitos  

---

## 📦 Arquivos Aceitos

| Formato | Extensão | ✅ Aceito |
|---------|----------|----------|
| PDF | .pdf | ✅ |
| Word 2003 | .doc | ✅ |
| Word 2007+ | .docx | ✅ |
| Texto | .txt | ✅ |
| Outros | - | ❌ |

**Tamanho máximo:** 5MB

---

## 🚀 Para Começar

### 1. Atualizar dependências
```bash
npm install
```

### 2. Rodar servidor
```bash
npm run dev
```

### 3. Testar
- Abra http://localhost:3000
- Clique em "Fale Conosco"
- Selecione "Trabalhe Conosco"
- Veja o campo de upload aparecer
- Envie um currículo

---

## 💾 Onde Ficam os Currículos

Os arquivos enviados são salvos em:
```
SolidaZeladoria/uploads/
```

Formato do nome:
```
[timestamp]-nome-original.pdf
```

Exemplo:
```
1706806523456-joao-silva-cv.pdf
```

---

## 📧 O que o Comercial Recebe

Quando alguém envia um currículo:

**Email com:**
- ✅ Nome do candidato
- ✅ Email para contato
- ✅ Mensagem/interesse
- ✅ **Currículo anexado** (arquivo original)
- ✅ Data e hora do envio

---

## 🎁 Recursos Completos

### Quando "Trabalhe Conosco" é selecionado:

1. **Campo visível:**
   - Área com borda azul tracejada
   - Botão de seleção de arquivo
   - Informações de formatos aceitos

2. **Validação:**
   - Verifica se arquivo foi selecionado
   - Valida tipo de arquivo
   - Valida tamanho (máx 5MB)
   - Mostra mensagens de erro claras

3. **Envio:**
   - Envia como multipart/form-data
   - Anexa ao email do comercial
   - Salva no servidor (pasta uploads/)
   - Notifica via WhatsApp

---

## ⚠️ Importante

1. **Pasta uploads/:** Será criada automaticamente na primeira submissão
2. **Backup:** Você pode fazer backup dos currículos recebidos
3. **Limpeza:** Limpe periodicamente a pasta uploads/ para economizar espaço
4. **GDPR:** Guarde currículos apenas pelo tempo necessário

---

## 🧪 Testar Manualmente

### Via Browser (Recomendado)
1. Abra http://localhost:3000
2. Clique "Fale Conosco"
3. Preencha: Nome, Email
4. Selecione: "Trabalhe Conosco"
5. Selecione um PDF na pasta do PC
6. Clique "Enviar Mensagem"
7. ✅ Popup de sucesso deve aparecer

### Via console (Avançado)
```javascript
// Testar upload via fetch
const formData = new FormData();
formData.append('name', 'João Silva');
formData.append('email', 'joao@email.com');
formData.append('subject', 'Trabalhe Conosco');
formData.append('message', 'Gostaria de trabalhar com vocês');
formData.append('curriculum', fileInput.files[0]);

fetch('http://localhost:3000/api/send-contact', {
    method: 'POST',
    body: formData
}).then(r => r.json()).then(d => console.log(d));
```

---

## 🔄 Fluxo de Dados (Trabalhe Conosco)

```
Usuário escolhe "Trabalhe Conosco"
              ↓
Campo de upload aparece
              ↓
Usuário seleciona arquivo
              ↓
Clica "Enviar Mensagem"
              ↓
JavaScript valida:
  ✓ Nome?
  ✓ Email?
  ✓ Arquivo?
  ✓ Tamanho < 5MB?
              ↓
fetch() envia FormData com arquivo
              ↓
Backend (multer) processa arquivo
              ↓
Salva em: uploads/[timestamp]-nome.pdf
              ↓
Envia email com anexo
              ↓
Popup: "Mensagem Enviada!"
              ↓
Arquivo pronto para RH baixar
```

---

## 🎯 Próximos Passos (Opcional)

### Melhorias Futuras

1. **Preview de arquivo:**
   - Mostrar nome do arquivo selecionado

2. **Barra de progresso:**
   - Mostrar progresso do upload

3. **Validação de conteúdo:**
   - Verificar se é realmente um CV

4. **Histórico:**
   - Manter registro de todos os CVs

5. **Banco de dados:**
   - Armazenar em banco em vez de pasta local

---

## 📞 Suporte

Se tiver dúvidas:

- Leia: **COMECE_AQUI.md**
- Leia: **API_SETUP.md**
- Leia: **CHECKLIST.md**

---

## ✅ Checklist de Validação

- [ ] npm install foi executado
- [ ] Servidor rodando com `npm run dev`
- [ ] Campo "Trabalhe Conosco" aparece no dropdown
- [ ] Campo de upload aparece quando selecionado
- [ ] Pode selecionar arquivo
- [ ] Pode enviar
- [ ] Email chega com anexo
- [ ] Arquivo salvo em uploads/
- [ ] Tudo funcionando!

---

**Desenvolvido para:** Sólida Zeladoria  
**Data:** Fevereiro 2026  
**Status:** ✅ Completo
