const display = document.querySelector('.display');
const botoes = document.querySelectorAll('.botao');
let expressao = '';

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const valor = botao.textContent.trim();

    if (valor === '=') {
      try {
        const resultado = eval(expressao.replace(/x/g, '*'));
        display.textContent = resultado;
        expressao = String(resultado);
      } catch (erro) {
        display.textContent = 'Erro';
        expressao = '';
      }
      return;
    }

    if (valor === 'C') {
      expressao = '';
      display.textContent = '0';
      return;
    }

    if (display.textContent === '0' && /[0-9]/.test(valor)) {
      expressao = valor;
    } else {
      expressao += valor;
    }

    display.textContent = expressao;
  });
});
