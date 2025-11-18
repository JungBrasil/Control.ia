#!/bin/bash

echo "🚀 Iniciando deploy do Sistema de Controladoria Municipal para Railway..."

# Verificar se Railway CLI está instalado
if ! command -v railway &> /dev/null; then
    echo "📦 Instalando Railway CLI..."
    npm install -g @railway/cli
fi

# Fazer login no Railway
echo "🔐 Fazendo login no Railway..."
railway login

# Inicializar projeto Railway
if [ ! -f "railway.json" ]; then
    echo "📝 Inicializando projeto Railway..."
    railway init --name "SCM-Sistema-Controladoria-Municipal"
fi

# Configurar variáveis de ambiente
echo "⚙️ Configurando variáveis de ambiente..."
echo "Por favor, configure as seguintes variáveis no dashboard da Railway:"
echo "- VITE_SUPABASE_URL"
echo "- VITE_SUPABASE_ANON_KEY" 
echo "- SUPABASE_URL"
echo "- SUPABASE_SERVICE_ROLE_KEY"
echo "- VITE_GEMINI_API_KEY"

# Fazer deploy
echo "📤 Fazendo deploy..."
railway up

echo "✅ Deploy concluído!"
echo "🌐 Acesse seu sistema no link fornecido pelo Railway"