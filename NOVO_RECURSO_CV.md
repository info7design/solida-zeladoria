# 🎉 NOVO RECURSO: Upload de Currículo

## ✨ O que foi adicionado

```
┌─────────────────────────────────────────┐
│  Campo "Trabalhe Conosco"               │
│                                         │
│  Antes: Apenas texto (mensagem)         │
│  Depois: Texto + Upload de Currículo    │
└─────────────────────────────────────────┘
```

---

## 🎬 Visualização da Experiência

### ANTES
```
┌─────────────────────────────────────────────┐
│  Assunto: [Selecione uma opção ▼]          │
│           Orçamento para Condomínio         │
│           Orçamento para Empresa            │
│           Trabalhe Conosco                  │
│           Outros Assuntos                   │
│                                             │
│  (Apenas mostra formulário normal)          │
└─────────────────────────────────────────────┘
```

### DEPOIS
```
┌─────────────────────────────────────────────┐
│  Assunto: [Trabalhe Conosco ▼]              │
│                                             │
│  (Formulário normal aparece)                │
│                                             │
│  (E AGORA TAMBÉM...)                        │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Enviar Currículo                   │   │
│  │  ┌─────────────────────────────┐    │   │
│  │  │  [Selecionar Arquivo...]    │    │   │
│  │  ├─────────────────────────────┤    │   │
│  │  │  📄 PDF, DOC, DOCX, TXT     │    │   │
│  │  │  Máximo 5MB                 │    │   │
│  │  └─────────────────────────────┘    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Enviar Mensagem]                         │
└─────────────────────────────────────────────┘
```

---

## 📁 Arquivos Modificados

### ✏️ HTML (index.html)
```
+ Campo de upload de currículo
+ Estilos para aparecer/desaparecer
+ Aceita: PDF, DOC, DOCX, TXT
+ Tamanho máx: 5MB
```

### ✏️ JavaScript (script.js)
```
+ Detecta "Trabalhe Conosco"
+ Mostra campo de upload
+ Valida arquivo
+ Envia como FormData
+ Suporta ambos: JSON e Multipart
```

### ✏️ Backend (server.js)
```
+ Multer para processamento
+ Validação de tipo
+ Limite de tamanho
+ Anexa ao email
+ Salva em pasta uploads/
```

### ✏️ Dependências (package.json)
```
+ Adicionado: multer ^1.4.5-lts.1
```

---

## 🚀 Como Usar

### 1️⃣ Instalar
```bash
npm install
```

### 2️⃣ Rodar
```bash
npm run dev
```

### 3️⃣ Testar
1. Abra http://localhost:3000
2. "Fale Conosco" → Formulário
3. Selecione: "Trabalhe Conosco"
4. Campo de upload aparece 👇
5. Envie um currículo (PDF, DOC, etc)
6. ✅ Popup de sucesso

---

## 💡 Funcionamento

```
USUÁRIO SELECIONA "TRABALHE CONOSCO"
           ↓
JavaScript detecta change event
           ↓
Script mostra #curriculum-upload
           ↓
Usuário vê:
  📄 Input de arquivo
  📝 Informações de formato
           ↓
Usuário seleciona arquivo
           ↓
Clica "Enviar Mensagem"
           ↓
JavaScript valida:
  ✓ Arquivo selecionado?
  ✓ Tamanho < 5MB?
  ✓ Todos campos preenchidos?
           ↓
FormData com arquivo é enviado
           ↓
Multer processa no servidor
           ↓
Salva em: uploads/[timestamp]-file.pdf
           ↓
Anexa ao email
           ↓
Envia para Comercial@solidazeladoria
           ↓
Popup: "Mensagem Enviada!"
           ↓
✅ CV pronto para análise
```

---

## 📊 Comparação

| Recurso | Antes | Depois |
|---------|-------|--------|
| Contato básico | ✅ | ✅ |
| Email para comercial | ✅ | ✅ |
| Upload de arquivo | ❌ | ✅ |
| Campo dinâmico | ❌ | ✅ |
| Suporte a CV | ❌ | ✅ |

---

## 🎯 Casos de Uso

### Candidato envia CV
```
1. Clica "Fale Conosco"
2. Preenche: Nome, Email, Mensagem
3. Seleciona: "Trabalhe Conosco"
4. Campo de upload aparece
5. Seleciona seu CV em PDF
6. Clica "Enviar"
7. ✅ CV recebido pela empresa
```

### Comercial recebe
```
Email com:
- ✅ Nome do candidato
- ✅ Contato (email)
- ✅ Mensagem/interesse
- ✅ CV em ANEXO
- ✅ Data/hora
```

---

## 📂 Nova Pasta

Será criada automaticamente:
```
SolidaZeladoria/
├── uploads/
│   ├── 1706806523456-joao-silva-cv.pdf
│   ├── 1706806598741-maria-santos-cv.docx
│   └── ...
└── ... (outros arquivos)
```

---

## ✅ Checklist Rápido

- [x] Campo de upload criado
- [x] JavaScript para mostrar/esconder
- [x] Backend com multer
- [x] Validação de arquivo
- [x] Envio por email
- [x] Pasta uploads criada
- [x] Documentação atualizada

---

## 📞 Próximos Passos

### Agora
1. Execute `npm install`
2. Execute `npm run dev`
3. Teste o novo campo

### Depois
Leia: **CURRICULUM_FEATURE.md** (documentação completa)

---

## 🎉 Pronto!

O campo "Trabalhe Conosco" agora **recebe currículos automaticamente**!

Quando alguém enviar, você receberá:
- 📧 Email com currículo anexado
- 📱 WhatsApp de notificação
- 💾 Arquivo salvo em local seguro

---

**Status:** ✅ 100% Funcional  
**Desenvolvido:** Fevereiro 2026  
**Para:** Sólida Zeladoria
