# 🌐 Deploy e Produção

## Quando você estiver pronto para colocar online

### Passo 1: Mudar a URL da API

Atualmente, o arquivo `script.js` envia mensagens para `http://localhost:3000`.

Quando você fazer deploy, você precisa:

#### Opção A: Heroku (mais simples)

1. Criar conta em https://www.heroku.com/
2. Instalar Heroku CLI
3. No PowerShell:
```bash
heroku create seu-app-name
heroku config:set EMAIL_USER=seu-email@gmail.com
heroku config:set EMAIL_PASSWORD=sua-senha-de-app
git push heroku main
```

4. Sua API ficará em: `https://seu-app-name.herokuapp.com`

#### Opção B: AWS / DigitalOcean / Render

1. Seguir instruções do provedor
2. Fazer upload dos arquivos
3. Instalar dependências: `npm install`
4. Iniciar servidor: `npm start`

### Passo 2: Atualizar script.js

Depois que seu servidor estiver online, edite `script.js`:

**De:**
```javascript
const response = await fetch('http://localhost:3000/api/send-contact', {
```

**Para:**
```javascript
const response = await fetch('https://seu-dominio.com/api/send-contact', {
```

Ou se estiver no mesmo servidor:
```javascript
const response = await fetch('/api/send-contact', {
```

### Passo 3: Testar em Produção

1. Abra seu site
2. Preencha o formulário
3. Verifique se os emails chegam corretamente

## 📋 Checklist de Deploy

- [ ] Criar arquivo `.env` com credenciais
- [ ] Testar localmente com `npm run dev`
- [ ] Fazer deploy do servidor
- [ ] Atualizar URL em `script.js`
- [ ] Testar formulário no site ao vivo
- [ ] Verificar logs do servidor

## 🔐 Variáveis de Ambiente em Produção

**Nunca** compartilhe seu `.env`!

Se você usar Heroku:
```bash
heroku config:set VARIAVEL_NOME=valor
heroku config:set EMAIL_USER=seu-email@gmail.com
heroku config:set EMAIL_PASSWORD=sua-senha
```

Se você usar outro provedor, consulte a documentação para setar variáveis de ambiente.

## 📊 Monitoramento

Você pode criar um dashboard simples:

1. Salvar mensagens em um banco de dados
2. Criar uma página de admin para visualizá-las
3. Receber notificações em tempo real

(Isso é mais avançado - consulte documentação do seu provedor)

## 💡 Dicas

- Teste sempre em produção depois de fazer alterações
- Monitore os logs do servidor para erros
- Faça backup do seu `.env`
- Atualize Node.js e pacotes periodicamente

---

Qualquer dúvida, consulte a documentação do seu provedor de hosting!
