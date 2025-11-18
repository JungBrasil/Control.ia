# Deploy script para Railway - Sistema de Controladoria Municipal
Write-Host "🚀 Iniciando deploy do Sistema de Controladoria Municipal para Railway..." -ForegroundColor Green

# Verificar se Railway CLI está instalado
$railwayInstalled = Get-Command railway -ErrorAction SilentlyContinue
if (-not $railwayInstalled) {
    Write-Host "📦 Railway CLI não encontrado. Por favor, instale manualmente:"
    Write-Host "npm install -g @railway/cli" -ForegroundColor Yellow
    Write-Host "Ou acesse: https://railway.app para fazer deploy via dashboard web" -ForegroundColor Yellow
    exit 1
}

# Fazer login no Railway
Write-Host "🔐 Fazendo login no Railway..." -ForegroundColor Blue
railway login

# Inicializar projeto Railway
if (-not (Test-Path "railway.json")) {
    Write-Host "📝 Inicializando projeto Railway..." -ForegroundColor Blue
    railway init --name "SCM-Sistema-Controladoria-Municipal"
}

# Build do projeto
Write-Host "🔨 Fazendo build do projeto..." -ForegroundColor Blue
npm run build

# Configurar variáveis de ambiente
Write-Host "⚙️ Configurando variáveis de ambiente..." -ForegroundColor Blue
Write-Host "Por favor, configure as seguintes variáveis no dashboard da Railway:" -ForegroundColor Yellow
Write-Host "- VITE_SUPABASE_URL" -ForegroundColor Yellow
Write-Host "- VITE_SUPABASE_ANON_KEY" -ForegroundColor Yellow
Write-Host "- SUPABASE_URL" -ForegroundColor Yellow
Write-Host "- SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor Yellow
Write-Host "- VITE_GEMINI_API_KEY" -ForegroundColor Yellow

# Fazer deploy
Write-Host "📤 Fazendo deploy..." -ForegroundColor Blue
railway up

Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host "🌐 Acesse seu sistema no link fornecido pelo Railway" -ForegroundColor Green
Write-Host "📖 Lembre-se de configurar as variáveis de ambiente no dashboard!" -ForegroundColor Yellow