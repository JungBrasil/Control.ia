@echo off
echo 🚀 PREPARACAO PARA DEPLOYMENT RENDER
echo.
echo 📋 Verificando pre-requisitos...

echo ✅ Verificando Node.js...
node --version

echo ✅ Verificando npm...
npm --version

echo 🔨 Testando build do projeto...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Erro no build. Corrija antes de prosseguir.
    exit /b 1
)

echo ✅ Build realizado com sucesso!

if exist "render.json" (
    echo ✅ Arquivo render.json encontrado!
) else (
    echo ❌ Arquivo render.json nao encontrado!
    exit /b 1
)

if exist "package.json" (
    echo ✅ Arquivo package.json encontrado!
) else (
    echo ❌ Arquivo package.json nao encontrado!
    exit /b 1
)

echo.
echo 📜 Scripts disponiveis:
type package.json | findstr "scripts"

echo.
echo 🎉 PROJETO PRONTO PARA DEPLOYMENT NO RENDER!
echo.
echo 📋 Proximos passos:
echo 1. Acesse: https://dashboard.render.com
echo 2. Clique em 'New' → 'Web Service'
echo 3. Conecte seu GitHub
echo 4. Configure com as informacoes do GUIA_RENDER_DETALHADO.md
echo 5. Adicione as 5 variaveis de ambiente obrigatorias
echo 6. Deploy! 🚀
echo.
echo 🔗 Links importantes:
echo - Render Dashboard: https://dashboard.render.com
echo - Seu guia: GUIA_RENDER_DETALHADO.md
echo - Variaveis necessarias: Veja .env.example
echo.
pause