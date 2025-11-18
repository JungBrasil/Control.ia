// Teste de diagnóstico para verificar o que está acontecendo
console.log('🔍 INICIANDO DIAGNÓSTICO DO SISTEMA SCM');

// Verificar se o React está carregando
if (typeof React !== 'undefined') {
    console.log('✅ React está carregado');
} else {
    console.log('❌ React NÃO está carregado');
}

// Verificar se o ReactDOM está carregando  
if (typeof ReactDOM !== 'undefined') {
    console.log('✅ ReactDOM está carregado');
} else {
    console.log('❌ ReactDOM NÃO está carregado');
}

// Verificar se há elemento root
const rootElement = document.getElementById('root');
if (rootElement) {
    console.log('✅ Elemento root encontrado:', rootElement);
} else {
    console.log('❌ Elemento root NÃO encontrado');
}

// Verificar o conteúdo atual da página
console.log('📄 Conteúdo HTML atual:');
console.log(document.body.innerHTML.substring(0, 500) + '...');

// Tentar carregar o App manualmente
setTimeout(() => {
    console.log('⏰ Verificando após 2 segundos...');
    console.log('Estado do root:', document.getElementById('root')?.innerHTML);
}, 2000);

// Verificar erros de rede
window.addEventListener('error', (event) => {
    console.error('🚨 ERRO GLOBAL:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 PROMISE REJEITADA:', event.reason);
});

console.log('🔍 DIAGNÓSTICO COMPLETO');