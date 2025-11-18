# 🚀 Guia de Deploy - Sistema de Controladoria Municipal (SCM) com IA

## 📋 Pré-requisitos

1. **Contas necessárias:**
   - Railway account (https://railway.app)
   - Supabase account (https://supabase.com)
   - Google AI Studio account (https://makersuite.google.com)

2. **Ferramentas instaladas:**
   - Node.js 18+ 
   - Git
   - Railway CLI (opcional)

## 🔧 Configuração de Variáveis de Ambiente

Antes do deploy, configure o arquivo `.env` com suas credenciais:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google AI Studio
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🚄 Deploy no Railway (Recomendado)

### Opção 1: Deploy via Railway Dashboard

1. Acesse https://railway.app
2. Clique em "New Project" → "Deploy from GitHub repo"
3. Conecte seu repositório GitHub
4. Railway detectará automaticamente o projeto Node.js
5. Configure as variáveis de ambiente no dashboard
6. Clique em "Deploy"

### Opção 2: Deploy via Railway CLI

```bash
# Instale o Railway CLI
npm install -g @railway/cli

# Login no Railway
railway login

# Inicialize o projeto
railway init

# Configure as variáveis
railway variables set VITE_SUPABASE_URL=your_url
railway variables set VITE_SUPABASE_ANON_KEY=your_key
railway variables set SUPABASE_URL=your_url
railway variables set SUPABASE_SERVICE_ROLE_KEY=your_key
railway variables set VITE_GEMINI_API_KEY=your_key

# Deploy
railway up
```

## 🔗 Deploy Alternativo - Netlify

Se preferir Netlify para frontend + backend functions:

1. Acesse https://netlify.com
2. Conecte seu repositório GitHub
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Configure environment variables
5. Deploy

## 🎯 Deploy Alternativo - Render

1. Acesse https://render.com
2. Crie uma Web Service
3. Conecte seu repositório
4. Configure:
   - Environment: Node
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. Configure environment variables
6. Deploy

## 📊 Configuração do Supabase

1. Crie um novo projeto no Supabase
2. Execute as migrations SQL do diretório `supabase/migrations/`
3. Configure as políticas de segurança (RLS)
4. Obtenha as credenciais para o arquivo `.env`

## 🔍 Verificação Pós-Deploy

Após o deploy bem-sucedido, verifique:

1. **Frontend:** Acesse a URL fornecida
2. **API:** Teste endpoints em `/api/health`
3. **Banco de dados:** Verifique conexão com Supabase
4. **IA:** Teste funcionalidade de análise de documentos

## 📚 Funcionalidades do Sistema

✅ **Módulos Implementados:**
- Gabinete do Controlador-Geral (Planejamento, Integridade e Gestão Interna)
- Auditoria e Fiscalização com IA
- Corregedoria e Processos Administrativos  
- Ouvidoria e Transparência Pública
- Dashboard Consolidado
- Sistema de Autenticação
- Upload de Documentos
- Integração com Google AI Studio

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs no dashboard da plataforma
2. Confirme que todas as variáveis de ambiente estão configuradas
3. Teste localmente com `npm run dev`
4. Consulte a documentação técnica em `.trae/documents/`

## 🔐 Segurança

- Todas as chaves de API estão protegidas no backend
- Implementamos autenticação JWT
- Dados sensíveis são criptografados
- Políticas de segurança configuradas no Supabase

---

**Parabéns! 🎉** Seu Sistema de Controladoria Municipal com IA está agora em produção!