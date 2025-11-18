# 🚀 GUIA RENDER - DEPLOYMENT PASSO A PASSO
# Control.ia - Sistema de Controladoria Municipal com IA

## 📱 PASSO 1: ACESSAR RENDER
1. Abra seu navegador
2. Acesse: https://render.com
3. Clique em "Sign Up" (se for novo) ou "Log In"

## 🆕 PASSO 2: CRIAR NOVO SERVIÇO
1. No dashboard, clique em "New" (canto superior direito)
2. Selecione "Web Service" 🌐
3. Conecte sua conta GitHub:
   - Clique em "Connect GitHub"
   - Autorize o Render a acessar seus repositórios
   - Selecione o repositório do seu projeto

## ⚙️ PASSO 3: CONFIGURAR O SERVIÇO
**Copie estas configurações exatamente:**

### 📋 Configurações Básicas:
- **Name:** `scm-sistema` (ou o nome que preferir)
- **Environment:** Node
- **Region:** Oregon (US) ou Frankfurt (EU) - escolha o mais próximo
- **Branch:** main (ou master)

### 🔧 Build & Start Commands:
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

### 💾 Plano:
- **Plan:** Free (0$/month) ✅
- **Instance Type:** Web Service

## 🔐 PASSO 4: CONFIGURAR VARIÁVEIS DE AMBIENTE
**Clique em "Advanced" e depois "Add Environment Variable"**

**ADICIONE ESTAS 5 VARIÁVEIS OBRIGATÓRIAS:**

```bash
# 1. URL do Supabase
VITE_SUPABASE_URL=coloque_sua_url_aqui

# 2. Chave Anon do Supabase
VITE_SUPABASE_ANON_KEY=coloque_sua_chave_anon_aqui

# 3. URL do Supabase (backend)
SUPABASE_URL=coloque_sua_url_aqui

# 4. Service Role Key do Supabase
SUPABASE_SERVICE_ROLE_KEY=coloque_sua_service_role_aqui

# 5. Chave do Google AI Studio
VITE_GEMINI_API_KEY=coloque_sua_chave_gemini_aqui
```

**VARIÁVEIS OPCIONAIS (recomendado):**
```bash
NODE_ENV=production
PORT=8080
```

## 🚀 PASSO 5: DEPLOYAR
1. Clique no botão **"Create Web Service"** 🟢
2. Aguarde 2-4 minutos
3. Render vai mostrar:
   - ⏳ Build em progresso
   - ✅ Deploy concluído
   - 🌐 URL do seu sistema

## ✅ PASSO 6: VERIFICAR DEPLOYMENT
**Quando terminar, você verá:**
- Status: **Live** ✅
- URL: `https://seu-app-xyz.onrender.com`
- Build: **Success** ✅

## 🎯 PASSO 7: TESTAR SEU SISTEMA
1. Acesse a URL fornecida
2. Teste as funcionalidades:
   - Login/Cadastro ✅
   - Dashboard ✅
   - Upload de documentos ✅
   - IA de análise ✅

---

## 🚨 **SE ENCONTRAR ERROS:**

### Erro de Build:
- Verifique se `npm run build` funciona localmente
- Confirme que todas variáveis estão configuradas

### Erro de Deploy:
- Verifique os logs no dashboard do Render
- Confirme que o arquivo `render.json` está no repositório

### Erro de Conexão:
- Teste as credenciais do Supabase
- Verifique se as chaves estão corretas

---

## 📞 **SUPORTE IMEDIATO:**
Se precisar de ajuda durante o processo:
1. Verifique os logs no Render
2. Teste localmente: `npm run dev`
3. Confirme que o build funciona: `npm run build`

---

## 🎉 **PARABÉNS!**
Após seguir estes passos, seu **Sistema de Controladoria Municipal com IA** estará online e funcionando perfeitamente!

**URL será algo como:** `https://scm-sistema-abc123.onrender.com`

---

**🔗 Links úteis:**
- Dashboard Render: https://dashboard.render.com
- Documentação: https://render.com/docs
- Suporte: https://render.com/support