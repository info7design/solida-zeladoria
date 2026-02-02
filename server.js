const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// Criar pasta de uploads se não existir
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configurar multer para upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo não permitido'), false);
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configuração Nodemailer para Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Função para enviar para WhatsApp via Twilio (opcional)
async function sendWhatsApp(phoneNumber, message) {
    try {
        // Se não estiver configurado Twilio, apenas registra no console
        if (!process.env.TWILIO_ACCOUNT_SID) {
            console.log('⚠️ Twilio não configurado - WhatsApp não será enviado');
            console.log('Mensagem que seria enviada:');
            console.log(message);
            return true; // Continua mesmo sem Twilio
        }

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_PHONE_NUMBER;

        await axios.post(
            `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            new URLSearchParams({
                Body: message,
                From: `whatsapp:${fromNumber}`,
                To: `whatsapp:+55${phoneNumber}`
            }),
            {
                auth: {
                    username: accountSid,
                    password: authToken
                }
            }
        );
        console.log('✅ Mensagem WhatsApp enviada para ' + phoneNumber);
        return true;
    } catch (error) {
        console.error('⚠️ Erro ao enviar WhatsApp:', error.message);
        // Retorna true mesmo com erro (não bloqueia o fluxo)
        return true;
    }
}

// Rota para enviar contato
app.post('/api/send-contact', upload.single('curriculum'), async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validação básica
        if (!name || !email || !subject || !message) {
            // Limpar arquivo se houver erro
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ 
                success: false, 
                error: 'Todos os campos são obrigatórios' 
            });
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // Limpar arquivo se houver erro
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ 
                success: false, 
                error: 'Email inválido' 
            });
        }

        console.log('\n📬 Novo contato recebido:');
        console.log('Nome:', name);
        console.log('Email:', email);
        console.log('Assunto:', subject);
        console.log('Mensagem:', message);
        if (req.file) {
            console.log('Currículo:', req.file.filename);
        }

        // Email para o comercial
        let emailBody = `
Novo contato do website - ${subject}

Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}

---
Dados do formulário enviado automaticamente pelo site.
Data: ${new Date().toLocaleString('pt-BR')}
        `;

        // 1. Enviar email para o comercial
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'Comercial@solidazeladoria.com.br',
                subject: `[SITE] Novo Contato - ${subject}`,
                text: emailBody,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FBBF24;">📬 Novo Contato - Sólida Zeladoria</h2>
                    <hr style="border: 1px solid #FBBF24;">
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Assunto:</strong> ${subject}</p>
                    <hr>
                    <h3>Mensagem:</h3>
                    <p style="white-space: pre-wrap; background: #f5f5f5; padding: 10px; border-radius: 5px;">
${message}
                    </p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        Enviado em: ${new Date().toLocaleString('pt-BR')}
                    </p>
                </div>
                `
            };

            // Se houver currículo, anexar ao email
            if (req.file) {
                mailOptions.attachments = [
                    {
                        filename: req.file.originalname,
                        path: req.file.path
                    }
                ];
            }

            await transporter.sendMail(mailOptions);
            console.log('✅ Email enviado para comercial');
        } catch (error) {
            console.error('❌ Erro ao enviar email para comercial:', error.message);
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            throw error;
        }

        // 2. Enviar resposta automática para o usuário
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Recebemos sua mensagem - Sólida Zeladoria',
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FBBF24;">✅ Mensagem Recebida!</h2>
                    <p>Olá <strong>${name}</strong>,</p>
                    <p>Obrigado por entrar em contato conosco! Sua mensagem foi recebida com sucesso.</p>
                    ${subject === 'Trabalhe Conosco' ? '<p>Seu currículo foi anexado e será analisado por nossa equipe de RH.</p>' : '<p>Nossa equipe analisará sua solicitação e retornará em breve.</p>'}
                    <hr style="border: 1px solid #FBBF24;">
                    <h3>Resumo da sua mensagem:</h3>
                    <p><strong>Assunto:</strong> ${subject}</p>
                    <p style="white-space: pre-wrap; background: #f5f5f5; padding: 10px; border-radius: 5px;">
${message}
                    </p>
                    <hr style="border: 1px solid #FBBF24;">
                    <h3>Outras formas de contato:</h3>
                    <p>
                        📞 Telefone: (12) 98299-3709<br>
                        💬 WhatsApp: (12) 98299-3709<br>
                        📧 Email: contato@solidazeladoria.com.br
                    </p>
                    <hr>
                    <p style="color: #666; font-size: 12px; text-align: center;">
                        Sólida Zeladoria - Segurança e Organização que seu condomínio merece<br>
                        <a href="https://solidazeladoria.com.br" style="color: #FBBF24; text-decoration: none;">www.solidazeladoria.com.br</a>
                    </p>
                </div>
                `
            });
            console.log('✅ Email de resposta automática enviado para ' + email);
        } catch (error) {
            console.error('⚠️ Erro ao enviar resposta automática:', error.message);
        }

        // 3. Enviar para WhatsApp
        const whatsappMessage = `
*📬 Novo Contato - Sólida Zeladoria*

👤 *Nome:* ${name}
📧 *Email:* ${email}
📌 *Assunto:* ${subject}

💬 *Mensagem:*
${message}

${req.file ? '📎 *Currículo anexado*' : ''}

---
Formulário de contato do site
${new Date().toLocaleString('pt-BR')}
        `;

        await sendWhatsApp('12982993709', whatsappMessage);

        res.json({ 
            success: true, 
            message: 'Mensagem enviada com sucesso!' 
        });

        console.log('✅ Processo completo finalizado\n');

    } catch (error) {
        console.error('❌ Erro ao processar contato:', error.message);
        // Limpar arquivo se houver erro
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ 
            success: false, 
            error: 'Erro ao enviar mensagem. Tente novamente mais tarde.' 
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rota para teste da configuração
app.get('/api/test-config', (req, res) => {
    const config = {
        email_configured: !!process.env.EMAIL_USER,
        twilio_configured: !!process.env.TWILIO_ACCOUNT_SID,
        email_user: process.env.EMAIL_USER ? process.env.EMAIL_USER.replace(/@.*/, '@****') : 'não configurado',
        port: process.env.PORT || 3000
    };
    res.json(config);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('\n========================================');
    console.log('🚀 Servidor de Contato Sólida Zeladoria');
    console.log('========================================');
    console.log(`⏱️ Rodando na porta ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('📧 Email de comercial: Comercial@solidazeladoria.com.br');
    console.log('💬 WhatsApp: 12982993709');
    console.log('📡 Endpoint: POST /api/send-contact');
    console.log('========================================\n');
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (error) => {
    console.error('❌ Erro não tratado:', error);
});
