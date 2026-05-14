import { Bardo } from "./bardo";
import { Mago } from "./mago";
import { personagem } from "./personagem";

enum AtaqueMago {
  BolaDeFogo,
  Macumba,
  Cura,
  Meteoro
}

enum AtaqueBardo {
  GritoRock,
  Cachaca,
 Arrocha,
  Solo
}

function pegarElemento<T extends HTMLElement>(
  id: string
): T {

  return document.getElementById(id) as T;

}

class Game {

  private mago =
  new Mago("Mago", 46, 400, 20);

  private bardo =
  new Bardo("Bardo", 40, 500, 30);

  private turnoAtual = 0;

  private textoVidaMago =
  pegarElemento<HTMLElement>("hp1");

  private barraVidaMago =
  pegarElemento<HTMLElement>("vida1");

  private textoVidaBardo =
  pegarElemento<HTMLElement>("hp2");

  private barraVidaBardo =
  pegarElemento<HTMLElement>("vida2");

  private barraManaMago =
  pegarElemento<HTMLElement>("manaMago");

  private textoManaMago =
  pegarElemento<HTMLElement>("manaTexto");

  private barraAlcoolBardo =
  pegarElemento<HTMLElement>("alcoolBardo");

  private textoAlcoolBardo =
  pegarElemento<HTMLElement>("alcoolTexto");

  private botaoUltimateMago =
  pegarElemento<HTMLButtonElement>("ultiMago");

  private botaoUltimateBardo =
  pegarElemento<HTMLButtonElement>("ultiBardo");

  private areaAcoesMago =
  pegarElemento<HTMLElement>("acoesMago");

  private areaAcoesBardo =
  pegarElemento<HTMLElement>("acoesBardo");

  private imagemMago =
  pegarElemento<HTMLImageElement>("imgjogadorum");

  private imagemBardo =
  pegarElemento<HTMLImageElement>("imgjogadordois");

  private consoleBatalha =
  pegarElemento<HTMLElement>("console");

  constructor() {

    this.iniciar();

  }

  iniciar(): void {

    this.imagemMago.src =
    this.mago.getimage();

    this.imagemBardo.src =
    this.bardo.getimage();

    pegarElemento<HTMLButtonElement>(
      "resetarBatalha"
    ).addEventListener(
      "click",
      () => this.resetarBatalha()
    );

    this.atualizarTela();

  }

  atualizarVida(
    personagem: personagem,
    barra: HTMLElement,
    texto: HTMLElement
  ): void {

    barra.style.width =
    `${personagem.getvidaPercentual()}%`;

    texto.innerHTML =
    `${personagem.getvida().toFixed(0)} / ${personagem.getvidaMax().toFixed(0)}`;

  }

  atualizarTela(): void {

    this.atualizarVida(
      this.mago,
      this.barraVidaMago,
      this.textoVidaMago
    );

    this.atualizarVida(
      this.bardo,
      this.barraVidaBardo,
      this.textoVidaBardo
    );

    this.barraManaMago.style.width =
    `${this.mago.mana}%`;

    this.textoManaMago.innerHTML =
    `${this.mago.mana}/100`;

    this.barraAlcoolBardo.style.width =
    `${this.bardo.alcool}%`;

    this.textoAlcoolBardo.innerHTML =
    `${this.bardo.alcool}/100`;

    this.botaoUltimateMago.disabled =
    this.mago.mana < 100;

    this.botaoUltimateBardo.disabled =
    this.bardo.alcool < 100;

    const turnoDoMago =
    this.turnoAtual % 2 === 0;

    if (turnoDoMago) {

      this.areaAcoesMago.classList.remove(
        "bloqueado"
      );

      this.areaAcoesBardo.classList.add(
        "bloqueado"
      );

    } else {

      this.areaAcoesBardo.classList.remove(
        "bloqueado"
      );

      this.areaAcoesMago.classList.add(
        "bloqueado"
      );

    }

  }

  flashAnime(): void {

    const flash =
    pegarElemento<HTMLElement>("flash");

    flash.style.opacity = "1";

    setTimeout(() => {

      flash.style.opacity = "0";

    }, 120);

  }

  shakeTela(): void {

    document.body.classList.add(
      "shake"
    );

    setTimeout(() => {

      document.body.classList.remove(
        "shake"
      );

    }, 300);

  }

  criarMiniMeteoro(): void {

    const alvo =
    pegarElemento<HTMLElement>(
      "cardBardo"
    );

    alvo.style.position =
    "relative";

    const meteoro =
    document.createElement("div");

    meteoro.classList.add(
      "mini-meteoro"
    );

    alvo.appendChild(
      meteoro
    );

    setTimeout(() => {

      meteoro.remove();

    }, 600);

  }

  criarExplosaoBardo(): void {

    const bardoEl =
    pegarElemento<HTMLElement>(
      "cardBardo"
    );

    bardoEl.style.position =
    "relative";

    const explosao =
    document.createElement("div");

    explosao.classList.add(
      "explosao"
    );

    bardoEl.appendChild(
      explosao
    );

    setTimeout(() => {

      explosao.remove();

    }, 600);

  }

  criarOndaSonora(): void {

    const bardoEl =
    pegarElemento<HTMLElement>(
      "cardBardo"
    );

    bardoEl.style.position =
    "relative";

    const onda =
    document.createElement("div");

    onda.classList.add(
      "onda-sonora"
    );

    bardoEl.appendChild(
      onda
    );

    bardoEl.classList.add(
      "neon-bardo"
    );

    setTimeout(() => {

      onda.remove();

      bardoEl.classList.remove(
        "neon-bardo"
      );

    }, 800);

  }

  executarTurno(
    ataque: number,
    jogador: number
  ): void {

    if (
      !this.mago.isvivo() ||
      !this.bardo.isvivo()
    ) return;

    if (
      jogador === 1 &&
      ataque === AtaqueMago.Meteoro
    ) {

      this.flashAnime();

      this.shakeTela();

      this.criarMiniMeteoro();

      setTimeout(() => {

        this.criarExplosaoBardo();

      }, 400);

    }

    if (
    jogador === 2 &&
  ataque === AtaqueBardo.Solo
    ) {

      this.criarOndaSonora();
      this.shakeTela();
    }

    if (
      this.turnoAtual % 2 === 0 &&
      jogador === 1
    ) {

      this.mago.atacar(
        this.bardo,
        ataque
      );

      this.turnoAtual++;

    } else if (
      this.turnoAtual % 2 === 1 &&
      jogador === 2
    ) {

      this.bardo.atacar(
        this.mago,
        ataque
      );

      this.turnoAtual++;

    }

    this.atualizarTela();

    this.verificarVencedor();

  }

  verificarVencedor(): void {

    if (!this.mago.isvivo()) {

      this.mago.log(
        "🎸 Bardo venceu!"
      );

    }

    else {

      this.mago.log(
        "🔥 Mago venceu!"
      );

    }

  }

  resetarBatalha(): void {

    this.turnoAtual = 0;

    this.mago =
    new Mago(
      "Mago",
      46,
      400,
      20
    );

    this.bardo =
    new Bardo(
      "Bardo",
      40,
      500,
      30
    );

    this.imagemMago.src =
    this.mago.getimage();

    this.imagemBardo.src =
    this.bardo.getimage();

    this.consoleBatalha.innerHTML =
    "<p>⚔️ Nova batalha iniciada!</p>";

    this.atualizarTela();

  }

}

const game = new Game();

declare global {

  interface Window {

    ataqueMago: Function;

    ataqueBardo: Function;

  }

}

window.ataqueMago =
(a: number) =>
game.executarTurno(a, 1);

window.ataqueBardo =
(a: number) =>
game.executarTurno(a, 2);