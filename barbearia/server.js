const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Configurações do WhatsApp Business API
const WHATSAPP_TOKEN = 'EAAJgpx4sS7sBO7vkLzyJ7IWqCcNmwGB7ZBNKpVFQaGX5RkraLSpsYZBkCnrKWbuQXWUIOisKVAA3o09hErQ0YjNcNGSEVNUUTzHre2uVDgZBmyIZA3zXFT29y8IVPkEjOl6ZAYZBgsxZBTIAdhzPdE3GxYPNZCZCCn9IHs18L693mYGWUH0v3qTZCBj1XdRmvv1ZA5PMQZDZD'; // Obtido do Meta for Developers
const PHONE_NUMBER_ID = '3645469815597081'; // Obtido do Meta for Developers
const VERSION = 'v17.0';
const BASE_URL = `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}`;
const NUMERO_BARBEARIA = '15557368120'; // Seu número real com código do país

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5500', // or your frontend URL
    credentials: true
}));
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.json({ message: 'Servidor está funcionando!' });
});

app.post('/api/agendar', async (req, res) => {
    try {
        const { nome, servico, barbeiro, data, horario } = req.body;
        console.log('1. Dados recebidos:', { nome, servico, barbeiro, data, horario });

        const mensagem = `*Novo Agendamento*\n\n` +
            `*Cliente:* ${nome}\n` +
            `*Serviço:* ${servico}\n` +
            `*Barbeiro:* ${barbeiro}\n` +
            `*Data:* ${data}\n` +
            `*Horário:* ${horario}`;

        // Fazer a requisição para a API do WhatsApp
        const response = await axios({
            method: 'POST',
            url: `${BASE_URL}/messages`,
            headers: {
                'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: {
                messaging_product: 'whatsapp',
                to: NUMERO_BARBEARIA,
                type: 'text',
                text: {
                    body: mensagem
                }
            }
        });

        console.log('Resposta da API:', response.data);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Erro:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Erro ao processar agendamento',
            details: error.response?.data
        });
    }
});

// Rotas de teste
app.get('/test', (req, res) => {
    res.json({ message: 'Rota de teste funcionando!' });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'API está funcionando!' });
});

// Adicionar middleware de erro
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
    console.error('Erro do servidor:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Rotas disponíveis:');
    console.log('- http://localhost:' + PORT + ' (principal)');
    console.log('- http://localhost:' + PORT + '/test (teste)');
    console.log('- http://localhost:' + PORT + '/api/test (teste da API)');
});