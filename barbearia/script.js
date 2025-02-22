function mostrarMensagemSucesso(nome, servico, barbeiro, dataFormatada, horario) {
    // Criar elemento de mensagem
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-sucesso';
    mensagem.innerHTML = `
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Agendamento Confirmado!</h4>
            <p>Olá ${nome}, seu agendamento foi realizado com sucesso!</p>
            <hr>
            <p class="mb-0">
                Serviço: ${servico}<br>
                Barbeiro: ${barbeiro}<br>
                Data: ${dataFormatada}<br>
                Horário: ${horario}
            </p>
        </div>
    `;

    // Adicionar ao topo do formulário
    const form = document.getElementById('agendamentoForm');
    form.parentNode.insertBefore(mensagem, form);

    // Remover mensagem após 5 segundos
    setTimeout(() => {
        mensagem.remove();
    }, 5000);
}

function enviarAgendamento(event) {
    event.preventDefault();

    // Pegar valores do formulário
    const nome = document.getElementById('nomeCliente').value;
    const servico = document.getElementById('servicoEscolhido').value;
    const barbeiro = document.getElementById('barbeiroEscolhido').value;
    const data = document.getElementById('dataEscolhida').value;
    const horario = document.getElementById('horarioEscolhido').value;

    // Formatar data
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

    // Mensagem para a barbearia
    const mensagemBarbearia = `Novo agendamento:%0A%0A` +
        `Nome: ${nome}%0A` +
        `Serviço: ${servico}%0A` +
        `Barbeiro: ${barbeiro}%0A` +
        `Data: ${dataFormatada}%0A` +
        `Horário: ${horario}`;

    // Número da barbearia (substitua pelo número real)
    const numeroBarbearia = "558498699449"; // Formato: 55 + DDD + número

    // Enviar mensagem para a barbearia
    const whatsappWindow = window.open(`https://wa.me/${numeroBarbearia}?text=${mensagemBarbearia}`, '_blank');

    // Fechar a janela do WhatsApp automaticamente após 1 segundo
    setTimeout(() => {
        if (whatsappWindow) {
            whatsappWindow.close();
        }
    }, 1000);

    // Mostrar mensagem de sucesso no site
    mostrarMensagemSucesso(nome, servico, barbeiro, dataFormatada, horario);

    // Limpar formulário
    document.getElementById('agendamentoForm').reset();

    return false;
}

// Função para mostrar mensagem de erro
function mostrarMensagemErro(mensagem) {
    const mensagemElement = document.createElement('div');
    mensagemElement.className = 'mensagem-erro';
    mensagemElement.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Erro!</h4>
            <p>${mensagem}</p>
        </div>
    `;

    const form = document.getElementById('agendamentoForm');
    form.parentNode.insertBefore(mensagemElement, form);

    setTimeout(() => {
        mensagemElement.remove();
    }, 5000);
}

// Adicionar função para mostrar loading
function mostrarLoading() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
        </div>
    `;

    const form = document.getElementById('agendamentoForm');
    form.parentNode.insertBefore(loadingElement, form);

    return loadingElement;
}

// Adicionar classe scrolled à navbar ao rolar
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Animação de elementos ao scroll
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.animate-up');

    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                element.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar elementos visíveis no carregamento inicial
});
