# 🚀 SCRIPT DE PREPARAÇÃO PARA RENDER
# Execute antes do deployment para verificar tudo

echo "📋 Verificando pré-requisitos para Render..."

# Verificar Node.js
echo "✅ Verificando Node.js..."
node --version

# Verificar npm
echo "✅ Verificando npm..."
npm --version

# Testar build
echo "🔨 Testando build do projeto..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build realizado com sucesso!"
else
    echo "❌ Erro no build. Corrija antes de prosseguir."
    exit 1
fi

# Verificar se render.json existe
if [ -f "render.json" ]; then
    echo "✅ Arquivo render.json encontrado!"
else
    echo "❌ Arquivo render.json não encontrado!"
    exit 1
fi

# Verificar package.json
if [ -f "package.json" ]; then
    echo "✅ Arquivo package.json encontrado!"
else
    echo "❌ Arquivo package.json não encontrado!"
    exit 1
fi

# Mostrar scripts disponíveis
echo "📜 Scripts disponíveis no package.json:"
grep -A 10 '"scripts"' package.json

echo ""
echo "🎉 PROJETO PRONTO PARA DEPLOYMENT NO RENDER!"
echo ""
echo "📋 Próximos passos:"
echo "1. Acesse: https://dashboard.render.com"
echo "2. Clique em 'New' → 'Web Service'"
echo "3. Conecte seu GitHub"
echo "4. Configure com as informações do GUIA_RENDER_DETALHADO.md"
echo "5. Adicione as 5 variáveis de ambiente obrigatórias"
echo "6. Deploy! 🚀"
echo ""
echo "🔗 Links importantes:"
echo "- Render Dashboard: https://dashboard.render.com"
echo "- Seu guia: GUIA_RENDER_DETALHADO.md"
echo "- Variáveis necessárias: Veja .env.example"