# 🚀 Script de Deploy no Railway - Sistema Controladoria Municipal
# Execute este script para preparar o projeto para deployment

Write-Host "🎯 Preparando Sistema SCM para Deployment no Railway..." -ForegroundColor Green

# Verificar se o build está funcionando
Write-Host "📦 Verificando build do projeto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build realizado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro no build. Verifique o código." -ForegroundColor Red
    exit 1
}

# Criar arquivo railway.json otimizado
Write-Host "⚙️ Criando configuração railway.json..." -ForegroundColor Yellow

$railwayConfig = @"
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build",
    "startCommand": "npm start"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  },
  "environments": {
    "production": {
      "variables": {
        "NODE_ENV": "production",
        "PORT": "8080"
      }
    }
  }
}
"@

$railwayConfig | Out-File -FilePath "railway.json" -Encoding UTF8
Write-Host "✅ Arquivo railway.json criado!" -ForegroundColor Green

# Mostrar instruções
Write-Host "`n🎉 PROJETO PRONTO PARA DEPLOYMENT!" -ForegroundColor Green
Write-Host "`n📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Acesse: https://railway.app" -ForegroundColor White
Write-Host "2. Clique em 'New Project' → 'Deploy from GitHub repo'" -ForegroundColor White
Write-Host "3. Conecte seu repositório GitHub" -ForegroundColor White
Write-Host "4. Configure as variáveis de ambiente (ver .env.example)" -ForegroundColor White
Write-Host "5. Clique em 'Deploy'" -ForegroundColor White

Write-Host "`n🔐 Variáveis necessárias:" -ForegroundColor Yellow
Write-Host "- VITE_SUPABASE_URL" -ForegroundColor White
Write-Host "- VITE_SUPABASE_ANON_KEY" -ForegroundColor White
Write-Host "- SUPABASE_URL" -ForegroundColor White
Write-Host "- SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor White
Write-Host "- VITE_GEMINI_API_KEY" -ForegroundColor White

Write-Host "`n🚀 Após configurar, seu sistema estará online!" -ForegroundColor Green