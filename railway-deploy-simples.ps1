# 🚀 Script de Deploy no Railway - Sistema Controladoria Municipal
Write-Host "🎯 Preparando Sistema SCM para Deployment no Railway..." -ForegroundColor Green

# Testar build
Write-Host "📦 Testando build do projeto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build realizado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro no build. Verifique o código." -ForegroundColor Red
    exit 1
}

# Criar railway.json
Write-Host "⚙️ Criando configuração railway.json..." -ForegroundColor Yellow

@"
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build",
    "startCommand": "npm start"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
"@ | Out-File -FilePath "railway.json" -Encoding UTF8

Write-Host "✅ Arquivo railway.json criado!" -ForegroundColor Green
Write-Host "`n🎉 PROJETO PRONTO PARA DEPLOYMENT!" -ForegroundColor Green
Write-Host "`n📋 Acesse: https://railway.app" -ForegroundColor Cyan
Write-Host "📋 New Project → Deploy from GitHub repo" -ForegroundColor Cyan
Write-Host "📋 Configure as variáveis do arquivo .env.example" -ForegroundColor Cyan