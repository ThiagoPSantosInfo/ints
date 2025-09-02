// Configurações do Supabase
const SUPABASE_URL = 'https://krufgtdilzrxzxbnxdho.supabase.co/rest/v1/Leads';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydWZndGRpbHpyeHp4Ym54ZGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDY3ODQsImV4cCI6MjA3MTI4Mjc4NH0.dnp6xiXJDlfbAAJOswhP8fyE8cVGu_duHzumMbF9OoA';

// Elementos do DOM
const form = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');
const buttonText = document.getElementById('buttonText');
const loading = document.getElementById('loading');
const messageDiv = document.getElementById('message');
const nomeInput = document.getElementById('nome');
const telefoneInput = document.getElementById('telefone');

// Função para mostrar mensagem
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    
    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

// Função para mostrar estado de loading
function setLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        buttonText.style.display = 'none';
        loading.classList.remove('hidden');
        loading.classList.add('show');
    } else {
        submitBtn.disabled = false;
        buttonText.style.display = 'inline';
        loading.classList.add('hidden');
        loading.classList.remove('show');
    }
}

// Função para validar telefone (formato básico)
function isValidPhone(phone) {
    // Remove todos os caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    // Verifica se tem pelo menos 10 dígitos
    return cleanPhone.length >= 10;
}

// Função para enviar dados para o Supabase
async function enviarLead(nome, telefone) {
    try {
        const response = await fetch(SUPABASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_API_KEY,
                'Authorization': `Bearer ${SUPABASE_API_KEY}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                nome: nome,
                telefone: telefone,
                data_cadastro: new Date().toISOString()
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
        }

        return true;
    } catch (error) {
        console.error('Erro ao enviar lead:', error);
        throw error;
    }
}

// Função para limpar o formulário
function limparFormulario() {
    nomeInput.value = '';
    telefoneInput.value = '';
}

// Event listener para o formulário
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nome = nomeInput.value.trim();
    const telefone = telefoneInput.value.trim();
    
    // Validações
    if (!nome) {
        showMessage('Por favor, preencha o nome completo.', 'error');
        nomeInput.focus();
        return;
    }
    
    if (!telefone) {
        showMessage('Por favor, preencha o telefone.', 'error');
        telefoneInput.focus();
        return;
    }
    
    if (!isValidPhone(telefone)) {
        showMessage('Por favor, insira um telefone válido com pelo menos 10 dígitos.', 'error');
        telefoneInput.focus();
        return;
    }
    
    // Mostrar loading
    setLoading(true);
    
    try {
        // Enviar dados para o Supabase
        await enviarLead(nome, telefone);
        
        // Mostrar sucesso
        showMessage('Cadastro realizado com sucesso! Obrigado por se cadastrar.', 'success');
        
        // Limpar formulário
        limparFormulario();
        
    } catch (error) {
        // Mostrar erro
        let errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
        
        if (error.message.includes('409')) {
            errorMessage = 'Este telefone já está cadastrado.';
        } else if (error.message.includes('400')) {
            errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
        } else if (error.message.includes('401')) {
            errorMessage = 'Erro de autenticação. Tente novamente mais tarde.';
        }
        
        showMessage(errorMessage, 'error');
    } finally {
        // Esconder loading
        setLoading(false);
    }
});

// Formatação automática do telefone (opcional)
telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
        e.target.value = value;
    }
});

// Validação em tempo real
nomeInput.addEventListener('input', function() {
    if (this.value.trim().length > 0 && messageDiv.textContent.includes('nome')) {
        messageDiv.classList.add('hidden');
    }
});

telefoneInput.addEventListener('input', function() {
    if (this.value.trim().length > 0 && messageDiv.textContent.includes('telefone')) {
        messageDiv.classList.add('hidden');
    }
});