function enviarAgendamento(event) {
    event.preventDefault();

    // Pegar valores do formulário
    const nome = document.getElementById('nomeCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;
    const servico = document.getElementById('servicoEscolhido').value;
    const barbeiro = document.getElementById('barbeiroEscolhido').value;
    const data = document.getElementById('dataEscolhida').value;
    const horario = document.getElementById('horarioEscolhido').value;

    // Formatar data
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

    // Mensagem para o cliente
    const mensagemCliente = `Olá! Confirmação de agendamento:%0A%0A` +
        `Nome: ${nome}%0A` +
        `Serviço: ${servico}%0A` +
        `Barbeiro: ${barbeiro}%0A` +
        `Data: ${dataFormatada}%0A` +
        `Horário: ${horario}%0A%0A` +
        `Seu agendamento foi realizado com sucesso!`;

    // Mensagem para a barbearia
    const mensagemBarbearia = `Novo agendamento:%0A%0A` +
        `Nome: ${nome}%0A` +
        `Telefone: ${telefone}%0A` +
        `Serviço: ${servico}%0A` +
        `Barbeiro: ${barbeiro}%0A` +
        `Data: ${dataFormatada}%0A` +
        `Horário: ${horario}`;

    // Número da barbearia (substitua pelo número real)
    const numeroBarbearia = "5511999999999"; // Formato: 55 + DDD + número

    // Enviar mensagem para o cliente
    window.open(`https://wa.me/55${telefone.replace(/\D/g, '')}?text=${mensagemCliente}`);

    // Enviar mensagem para a barbearia
    setTimeout(() => {
        window.open(`https://wa.me/${numeroBarbearia}?text=${mensagemBarbearia}`);
    }, 1000);

    // Limpar formulário
    document.getElementById('agendamentoForm').reset();

    return false;
}

// Adicionar classe scrolled à navbar ao rolar
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Animação de elementos ao scroll
document.addEventListener('DOMContentLoaded', function() {
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
