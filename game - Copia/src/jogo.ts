import { Bardo } from "./bardo";
import { Mago } from "./mago";

// ======================================
// PERSONAGENS
// ======================================

let mago = new Mago("Mago", 46, 85, 20);
let bardo = new Bardo("Bardo", 40, 100, 30);

// ======================================
// TURNO
// ======================================

let turnoAtual = 0;

// ======================================
// ELEMENTOS HTML
// ======================================

const textoVidaMago = document.getElementById("hp1") as HTMLElement;
const barraVidaMago = document.getElementById("vida1") as HTMLElement;

const textoVidaBardo = document.getElementById("hp2") as HTMLElement;
const barraVidaBardo = document.getElementById("vida2") as HTMLElement;

const barraManaMago = document.getElementById("manaMago") as HTMLElement;
const textoManaMago = document.getElementById("manaTexto") as HTMLElement;

const barraAlcoolBardo = document.getElementById("alcoolBardo") as HTMLElement;
const textoAlcoolBardo = document.getElementById("alcoolTexto") as HTMLElement;

const botaoUltimateMago = document.getElementById("ultiMago") as HTMLButtonElement;
const botaoUltimateBardo = document.getElementById("ultiBardo") as HTMLButtonElement;

const botaoResetar = document.getElementById("resetarBatalha") as HTMLButtonElement;

const areaAcoesMago = document.getElementById("acoesMago") as HTMLElement;
const areaAcoesBardo = document.getElementById("acoesBardo") as HTMLElement;

const imagemMago = document.getElementById("imgjogadorum") as HTMLImageElement;
const imagemBardo = document.getElementById("imgjogadordois") as HTMLImageElement;

const consoleBatalha = document.getElementById("console") as HTMLElement;

// ======================================
// FLASH ANIME
// ======================================

function flashAnime(): void {
  const flash = document.getElementById("flash") as HTMLElement;

  flash.style.opacity = "1";

  setTimeout(() => {
    flash.style.opacity = "0";
  }, 120);
}

// ======================================
// EXPLOSÃO
// ======================================

function criarExplosaoBardo(): void {
  const bardoEl = document.getElementById("cardBardo") as HTMLElement;

  const explosao = document.createElement("div");
  explosao.classList.add("explosao");

  explosao.style.left = "50%";
  explosao.style.top = "50%";
  explosao.style.transform = "translate(-50%, -50%)";

  bardoEl.style.position = "relative";
  explosao.style.position = "absolute";

  bardoEl.appendChild(explosao);

  setTimeout(() => explosao.remove(), 600);
}

// ======================================
// MINI METEORO
// ======================================

function criarMiniMeteoroNoBardo(): void {
  const bardoEl = document.getElementById("cardBardo") as HTMLElement;

  const meteoro = document.createElement("div");
  meteoro.classList.add("mini-meteoro");

  meteoro.style.left = "50%";
  meteoro.style.top = "-30px";
  meteoro.style.transform = "translateX(-50%)";

  bardoEl.style.position = "relative";
  meteoro.style.position = "absolute";

  bardoEl.appendChild(meteoro);

  setTimeout(() => meteoro.remove(), 600);
}

// ======================================
// SHAKE
// ======================================

function shakeTela(): void {
  document.body.classList.add("shake");

  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 300);
}

// ======================================
// ATUALIZA TELA
// ======================================

function atualizarTela(): void {
  textoVidaMago.innerHTML =
    `${mago.getvida().toFixed(2)} / ${mago.getvidaMax().toFixed(2)}`;

  barraVidaMago.style.width = `${mago.getvidaPercentual()}%`;

  textoVidaBardo.innerHTML =
    `${bardo.getvida().toFixed(2)} / ${bardo.getvidaMax().toFixed(2)}`;

  barraVidaBardo.style.width = `${bardo.getvidaPercentual()}%`;

  barraManaMago.style.width = `${mago.mana}%`;
  textoManaMago.innerHTML = `${mago.mana}/100`;

  barraAlcoolBardo.style.width = `${bardo.alcool}%`;
  textoAlcoolBardo.innerHTML = `${bardo.alcool}/100`;

  botaoUltimateMago.disabled = mago.mana < 100;
  botaoUltimateBardo.disabled = bardo.alcool < 100;

  const turnoDoMago = turnoAtual % 2 === 0;

  if (turnoDoMago) {
    areaAcoesMago.classList.remove("bloqueado");
    areaAcoesBardo.classList.add("bloqueado");
  } else {
    areaAcoesBardo.classList.remove("bloqueado");
    areaAcoesMago.classList.add("bloqueado");
  }
}

// ======================================
// BATALHA
// ======================================

function executarTurno(ataque: number, jogador: number): void {
  if (!mago.isvivo() || !bardo.isvivo()) return;

  // ☄️ METEORO ULTIMATE
  if (jogador === 1 && ataque === 3) {
    criarMiniMeteoroNoBardo();
    flashAnime();
    shakeTela();

    setTimeout(() => {
      criarExplosaoBardo();
    }, 400);
  }

  if (turnoAtual % 2 == 0 && jogador == 1) {
    mago.atacar(bardo, ataque);
    turnoAtual++;
  } else if (turnoAtual % 2 == 1 && jogador == 2) {
    bardo.atacar(mago, ataque);
    turnoAtual++;
  }

  atualizarTela();
  verificarVencedor();
}

// ======================================
// VENCEDOR
// ======================================

function verificarVencedor(): void {
  if (!mago.isvivo()) mago.log("🎸 Bardo venceu!");
  if (!bardo.isvivo()) mago.log("🔥 Mago venceu!");
}

// ======================================
// RESET
// ======================================

function resetarBatalha(): void {
  turnoAtual = 0;

  mago = new Mago("Mago", 46, 85, 20);
  bardo = new Bardo("Bardo", 40, 100, 30);

  imagemMago.src = mago.getimage();
  imagemBardo.src = bardo.getimage();

  consoleBatalha.innerHTML = "<p>⚔️ Nova batalha iniciada!</p>";

  atualizarTela();
}

// ======================================
// EVENTOS
// ======================================

botaoResetar.addEventListener("click", resetarBatalha);

imagemMago.src = mago.getimage();
imagemBardo.src = bardo.getimage();

atualizarTela();

(window as any).ataqueMago = (a: number) => executarTurno(a, 1);
(window as any).ataqueBardo = (a: number) => executarTurno(a, 2);