const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes - Simple implementation for Render
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Control.ia System Online' });
});

// Auth routes
app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email e senha são obrigatórios' });
  }
  return res.json({ success: true, data: { id: '1', email, role: 'admin' } });
});

app.post('/api/auth/signout', (req, res) => {
  return res.json({ success: true });
});

// CRUD routes for all modules
const handleCRUD = (req, res, collectionName) => {
  switch (req.method) {
    case 'GET':
      return res.json({ success: true, data: [] });
    case 'POST':
      const newItem = { ...req.body, id: Math.random().toString(36).substr(2, 9) };
      return res.status(201).json({ success: true, data: newItem });
    default:
      return res.status(405).json({ success: false, error: 'Método não permitido' });
  }
};

// Data routes
app.get('/api/normas', (req, res) => handleCRUD(req, res, 'normas'));
app.post('/api/normas', (req, res) => handleCRUD(req, res, 'normas'));

app.get('/api/ouvidoria', (req, res) => handleCRUD(req, res, 'ouvidoria'));
app.post('/api/ouvidoria', (req, res) => handleCRUD(req, res, 'ouvidoria'));

app.get('/api/auditorias', (req, res) => handleCRUD(req, res, 'auditorias'));
app.post('/api/auditorias', (req, res) => handleCRUD(req, res, 'auditorias'));

app.get('/api/disciplinar', (req, res) => handleCRUD(req, res, 'disciplinar'));
app.post('/api/disciplinar', (req, res) => handleCRUD(req, res, 'disciplinar'));

app.get('/api/transparencia', (req, res) => handleCRUD(req, res, 'transparencia'));
app.post('/api/transparencia', (req, res) => handleCRUD(req, res, 'transparencia'));

// IA routes
app.post('/api/ia/contratos', (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ success: false, error: 'Texto é obrigatório' });
  }
  
  return res.json({ 
    success: true, 
    data: { 
      analise: 'Análise de contrato municipal - IA Gemini não configurada',
      riscos: ['Risco: Cláusulas abusivas detectadas', 'Risco: Prazos inadequados'],
      recomendacoes: ['Revisar cláusulas de penalidade', 'Ajustar prazos de entrega']
    }
  });
});

app.post('/api/ia/parcerias', (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ success: false, error: 'Texto é obrigatório' });
  }
  
  return res.json({ 
    success: true, 
    data: { 
      analise: 'Análise de parceria municipal - IA Gemini não configurada',
      beneficios: ['Benefício: Economia de recursos', 'Benefício: Eficiência operacional'],
      riscos: ['Risco: Dependência de terceiros', 'Risco: Perda de controle'],
      recomendacoes: ['Estabelecer KPIs claros', 'Definir saída estratégica']
    }
  });
});

// Orçamento routes
app.get('/api/orcamento/execucao/:ano', (req, res) => {
  const { ano } = req.params;
  return res.json({
    success: true,
    data: {
      ano: parseInt(ano),
      percentual_execucao: 75,
      valor_total: 1000000,
      valor_executado: 750000,
      categorias: [
        { nome: 'Pessoal', orcado: 400000, executado: 380000 },
        { nome: 'Serviços', orcado: 300000, executado: 220000 },
        { nome: 'Obras', orcado: 300000, executado: 150000 }
      ]
    }
  });
});

// File upload - simulated
app.post('/api/upload', (req, res) => {
  return res.json({
    success: true,
    data: {
      url: '#',
      fileName: 'arquivo-simulado.pdf',
      size: 1024,
      type: 'application/pdf',
      note: 'Upload não disponível - Configure Supabase para upload real'
    }
  });
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo deu errado!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Control.ia rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});