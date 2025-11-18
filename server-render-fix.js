const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware essencial
app.use(cors({
  origin: ['https://sistema-controladoria-municipal.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Log para debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check - essencial para Render
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Control.ia System Online',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
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

// CRUD routes para todos os módulos
const handleCRUD = (req, res, collectionName) => {
  try {
    switch (req.method) {
      case 'GET':
        return res.json({ success: true, data: [], message: `${collectionName} listados com sucesso` });
      case 'POST':
        const newItem = { 
          ...req.body, 
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString()
        };
        return res.status(201).json({ 
          success: true, 
          data: newItem,
          message: `${collectionName} criado com sucesso`
        });
      default:
        return res.status(405).json({ success: false, error: 'Método não permitido' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Rotas de dados
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
  try {
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
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/ia/parcerias', (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Orçamento routes
app.get('/api/orcamento/execucao/:ano', (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// File upload - simulated
app.post('/api/upload', (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Catch-all para API - retorna 404 para rotas API não encontradas
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: `Rota API não encontrada: ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      'GET /api/health',
      'POST /api/auth/signin',
      'POST /api/auth/signout',
      'GET /api/normas',
      'POST /api/normas',
      'GET /api/ouvidoria',
      'POST /api/ouvidoria',
      'GET /api/auditorias',
      'POST /api/auditorias',
      'GET /api/disciplinar',
      'POST /api/disciplinar',
      'GET /api/transparencia',
      'POST /api/transparencia',
      'POST /api/ia/contratos',
      'POST /api/ia/parcerias',
      'GET /api/orcamento/execucao/:ano',
      'POST /api/upload'
    ]
  });
});

// Serve arquivos estáticos do diretório dist
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// SPA catch-all - serve index.html para todas as outras rotas
app.get('*', (req, res) => {
  console.log(`[SPA] Serving index.html for: ${req.url}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error(`[SPA] Error serving index.html:`, err);
      res.status(500).send('Erro ao carregar aplicação');
    }
  });
});

// Error handling middleware - deve ser o último
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url}:`, err.stack);
  
  // Se for requisição de API, retorna JSON
  if (req.url.startsWith('/api/')) {
    return res.status(500).json({ 
      success: false,
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Erro ao processar requisição'
    });
  }
  
  // Se for página web, retorna HTML simples
  res.status(500).send(`
    <!DOCTYPE html>
    <html>
    <head><title>Erro - Control.ia</title></head>
    <body>
      <h1>Erro no servidor</h1>
      <p>Ocorreu um erro ao processar sua requisição.</p>
      <p>Por favor, tente novamente mais tarde.</p>
    </body>
    </html>
  `);
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Control.ia rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`📁 Diretório de build: ${path.join(__dirname, 'dist')}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido, encerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT recebido, encerrando servidor...');
  process.exit(0);
});