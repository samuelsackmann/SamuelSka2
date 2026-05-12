import { Bardo } from "./bardo";
import { Mago } from "./mago";

// ======================================
// PERSONAGENS
// ======================================

let mago = new Mago(
  "Mago",
  46,
  85,
  20
);

let bardo = new Bardo(
  "Bardo",
  40,
  100,
  30
);

// ======================================
// TURNO
// ======================================

let turnoAtual = 0;

// ======================================
// ELEMENTOS HTML
// ======================================

// VIDA MAGO

const textoVidaMago =
document.getElementById(
  "hp1"
) as HTMLElement;

const barraVidaMago =
document.getElementById(
  "vida1"
) as HTMLElement;

// VIDA BARDO

const textoVidaBardo =
document.getElementById(
  "hp2"
) as HTMLElement;

const barraVidaBardo =
document.getElementById(
  "vida2"
) as HTMLElement;

// MANA

const barraManaMago =
document.getElementById(
  "manaMago"
) as HTMLElement;

const textoManaMago =
document.getElementById(
  "manaTexto"
) as HTMLElement;

// ÁLCOOL

const barraAlcoolBardo =
document.getElementById(
  "alcoolBardo"
) as HTMLElement;

const textoAlcoolBardo =
document.getElementById(
  "alcoolTexto"
) as HTMLElement;

// BOTÕES

const botaoUltimateMago =
document.getElementById(
  "ultiMago"
) as HTMLButtonElement;

const botaoUltimateBardo =
document.getElementById(
  "ultiBardo"
) as HTMLButtonElement;

// BOTÃO RESET

const botaoResetar =
document.getElementById(
  "resetarBatalha"
) as HTMLButtonElement;

// ÁREA DE AÇÕES

const areaAcoesMago =
document.getElementById(
  "acoesMago"
) as HTMLElement;

const areaAcoesBardo =
document.getElementById(
  "acoesBardo"
) as HTMLElement;

// IMAGENS

const imagemMago =
document.getElementById(
  "imgjogadorum"
) as HTMLImageElement;

const imagemBardo =
document.getElementById(
  "imgjogadordois"
) as HTMLImageElement;

// CONSOLE

const consoleBatalha =
document.getElementById(
  "console"
) as HTMLElement;

// ======================================
// ATUALIZA INTERFACE
// ======================================

function atualizarTela(): void {

  atualizarVida();

  atualizarMana();

  atualizarAlcool();

  atualizarUltimates();

  atualizarTurnos();

}

// ======================================
// VIDA
// ======================================

function atualizarVida(): void {

  textoVidaMago.innerHTML =
  `${mago.getvida()} / ${mago.getvidaMax()}`;

  barraVidaMago.style.width =
  `${mago.getvidaPercentual()}%`;

  textoVidaBardo.innerHTML =
  `${bardo.getvida()} / ${bardo.getvidaMax()}`;

  barraVidaBardo.style.width =
  `${bardo.getvidaPercentual()}%`;

}

// ======================================
// MANA
// ======================================

function atualizarMana(): void {

  barraManaMago.style.width =
  `${mago.mana}%`;

  textoManaMago.innerHTML =
  `${mago.mana}/100`;

}

// ======================================
// ÁLCOOL
// ======================================

function atualizarAlcool(): void {

  barraAlcoolBardo.style.width =
  `${bardo.alcool}%`;

  textoAlcoolBardo.innerHTML =
  `${bardo.alcool}/100`;

}

// ======================================
// ULTIMATES
// ======================================

function atualizarUltimates(): void {

  botaoUltimateMago.disabled =
  mago.mana < 100;

  botaoUltimateBardo.disabled =
  bardo.alcool < 100;

}

// ======================================
// TURNOS
// ======================================

function atualizarTurnos(): void {

  const turnoDoMago =
  turnoAtual % 2 == 0;

  // TURNO DO MAGO

  if (turnoDoMago) {

    areaAcoesMago.classList.remove(
      "bloqueado"
    );

    areaAcoesBardo.classList.add(
      "bloqueado"
    );

  }

  // TURNO DO BARDO

  else {

    areaAcoesBardo.classList.remove(
      "bloqueado"
    );

    areaAcoesMago.classList.add(
      "bloqueado"
    );

  }

}

// ======================================
// SISTEMA DE BATALHA
// ======================================

function executarTurno(
  ataque: number,
  jogador: number
): void {

  // SE ALGUÉM MORREU

  if (
    !mago.isvivo() ||
    !bardo.isvivo()
  ) {

    return;

  }

  // TURNO DO MAGO

  if (
    turnoAtual % 2 == 0 &&
    jogador == 1
  ) {

    mago.atacar(
      bardo,
      ataque
    );

    turnoAtual++;

  }

  // TURNO DO BARDO

  else if (
    turnoAtual % 2 == 1 &&
    jogador == 2
  ) {

    bardo.atacar(
      mago,
      ataque
    );

    turnoAtual++;

  }

  atualizarTela();

  verificarVencedor();

}

// ======================================
// VERIFICA VENCEDOR
// ======================================

function verificarVencedor(): void {

  // BARDO VENCEU

  if (!mago.isvivo()) {

    mago.log(
      "🎸 Bardo venceu!"
    );

  }

  // MAGO VENCEU

  if (!bardo.isvivo()) {

    mago.log(
      "🔥 Mago venceu!"
    );

  }

}

// ======================================
// RESETAR BATALHA
// ======================================

function resetarBatalha(): void {

  // RESETA TURNO

  turnoAtual = 0;

  // RECRIA PERSONAGENS

  mago = new Mago(
    "Mago",
    46,
    85,
    20
  );

  bardo = new Bardo(
    "Bardo",
    40,
    100,
    30
  );

  // RESETA IMAGENS

  imagemMago.src =
  mago.getimage();

  imagemBardo.src =
  bardo.getimage();

  // LIMPA CONSOLE

  consoleBatalha.innerHTML =
  "<p>⚔️ Nova batalha iniciada!</p>";

  // ATUALIZA TELA

  atualizarTela();

}

// ======================================
// EVENTO BOTÃO RESET
// ======================================

botaoResetar.addEventListener(
  "click",
  resetarBatalha
);

// ======================================
// IMAGENS
// ======================================

imagemMago.src =
mago.getimage();

imagemBardo.src =
bardo.getimage();

// ======================================
// INICIAR
// ======================================

atualizarTela();

// ======================================
// BOTÕES HTML
// ======================================

(window as any).ataqueMago =
function (
  ataque: number
): void {

  executarTurno(
    ataque,
    1
  );

};

(window as any).ataqueBardo =
function (
  ataque: number
): void {

  executarTurno(
    ataque,
    2
  );

};