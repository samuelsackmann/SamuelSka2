"use strict";
(() => {
  // src/personagem.ts
  var personagem = class {
    constructor(nome, forca, hp, hpMax, defesa, msgCura, imagem) {
      this.nome = nome;
      this.forca = forca;
      this.hp = hp;
      this.hpMax = hpMax;
      this.defesa = Math.min(defesa, 80);
      this.msgCura = msgCura;
      this.imagem = imagem;
    }
    getvida() {
      return this.hp;
    }
    getvidaMax() {
      return this.hpMax;
    }
    getvidaPercentual() {
      return this.hp / this.hpMax * 100;
    }
    getimage() {
      return this.imagem;
    }
    gerarataque() {
      return Math.floor(
        Math.random() * this.forca
      ) + 1;
    }
    isvivo() {
      return this.hp > 0;
    }
    sofrerDano(dano) {
      const reducaoDefesa = dano * (this.defesa / 100);
      let danoFinal = dano - reducaoDefesa;
      if (danoFinal < 0) {
        danoFinal = 0;
      }
      this.hp -= danoFinal;
      if (this.hp < 0) {
        this.hp = 0;
      }
      this.log(
        `${this.nome} sofreu ${danoFinal.toFixed(0)} de dano`
      );
    }
    recuperarVida(valor) {
      this.hp += valor;
      if (this.hp > this.hpMax) {
        this.hp = this.hpMax;
      }
    }
    efeitoDano(id) {
      const imagem = document.getElementById(
        id
      );
      imagem.classList.add(
        "hit"
      );
      setTimeout(() => {
        imagem.classList.remove(
          "hit"
        );
      }, 300);
    }
    log(mensagem) {
      const consoleHTML = document.getElementById(
        "console"
      );
      consoleHTML.innerHTML += `<p>${mensagem}</p>`;
      consoleHTML.scrollTop = consoleHTML.scrollHeight;
    }
  };

  // src/bardo.ts
  var Bardo = class extends personagem {
    constructor(nome, forca, hp, defesa) {
      super(
        nome,
        forca,
        hp,
        500,
        defesa,
        "bebeu cacha\xE7a \u{1F37A}",
        "https://endless-coffee-3qom2hwieb.edgeone.app/411e2248-945e-4663-b5e5-15b1d0b4b0e5_rotated-removebg-preview.png"
      );
      this.alcool = 0;
    }
    atacar(alvo, ataque) {
      switch (ataque) {
        case 0:
          this.gritoDoRock(alvo);
          break;
        case 1:
          this.recuperarVida();
          break;
        case 2:
          this.musicaOfensiva(alvo);
          break;
        case 3:
          this.seduzir(alvo);
          break;
      }
    }
    gritoDoRock(alvo) {
      const dano = this.gerarataque() + 50;
      this.log(
        `${this.nome} soltou um Grito do Rock \u{1F918}`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadorum"
      );
    }
    musicaOfensiva(alvo) {
      const dano = this.gerarataque() + 40;
      this.log(
        `${this.nome} usou Arrocha \u{1F50A}`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadorum"
      );
    }
    seduzir(alvo) {
      if (this.alcool < 100) {
        this.log(
          "\xC1lcool insuficiente \u{1F37A}"
        );
        return;
      }
      this.alcool = 0;
      const dano = this.gerarataque() + 90;
      this.log(
        `\u2764\uFE0FSerenata\u2764\uFE0F`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadorum"
      );
    }
    recuperarVida() {
      const valorCura = 16;
      this.hp += valorCura;
      this.alcool += 25;
      if (this.alcool > 100) {
        this.alcool = 100;
      }
      if (this.hp > this.hpMax) {
        this.hp = this.hpMax;
      }
      this.log(
        `${this.nome} bebeu cacha\xE7a \u{1F37A}`
      );
      this.log(
        `\u{1F49A} Recuperou ${valorCura} HP`
      );
      this.log(
        `${this.nome} ganhou +25 \xC1lcool \u{1F37B}`
      );
    }
    efeitoDano(id) {
      const imagem = document.getElementById(
        id
      );
      imagem.classList.add(
        "hit"
      );
      setTimeout(() => {
        imagem.classList.remove(
          "hit"
        );
      }, 300);
    }
  };

  // src/mago.ts
  var Mago = class extends personagem {
    constructor(nome, forca, hp, defesa) {
      super(
        nome,
        forca,
        hp,
        400,
        defesa,
        "usou magia de cura \u2728",
        "https://i.pinimg.com/originals/5c/d8/e6/5cd8e6db676d6299731c4477573b676b.gif"
      );
      this.mana = 0;
    }
    atacar(alvo, ataque) {
      switch (ataque) {
        case 0:
          this.bolaDeFogo(alvo);
          break;
        case 1:
          this.macumba(alvo);
          break;
        case 2:
          this.recuperarVida();
          break;
        case 3:
          this.meteoro(alvo);
          break;
      }
    }
    bolaDeFogo(alvo) {
      const dano = this.gerarataque() + 50;
      this.log(
        `${this.nome} lan\xE7ou Bola de Fogo \u{1F525}`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadordois"
      );
    }
    macumba(alvo) {
      const dano = this.gerarataque() + 40;
      this.log(
        `${this.nome} lan\xE7ou Macumba \u26A1`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadordois"
      );
    }
    meteoro(alvo) {
      if (this.mana < 100) {
        this.log(
          "Mana insuficiente \u2604\uFE0F"
        );
        return;
      }
      this.mana = 0;
      const dano = this.gerarataque() + 150;
      this.log(
        "\u2604\uFE0F METEORO \u2604\uFE0F"
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadordois"
      );
    }
    recuperarVida() {
      const valorCura = 25;
      this.hp += valorCura;
      this.mana += 25;
      if (this.mana > 100) {
        this.mana = 100;
      }
      if (this.hp > this.hpMax) {
        this.hp = this.hpMax;
      }
      this.log(
        `\u{1F49A} Recuperou ${valorCura} HP`
      );
      this.log(
        `${this.nome} bebeu Guaraviton \u{1F9EA}`
      );
    }
    efeitoDano(idImagem) {
      const imagem = document.getElementById(
        idImagem
      );
      imagem.classList.add(
        "hit"
      );
      setTimeout(() => {
        imagem.classList.remove(
          "hit"
        );
      }, 300);
    }
  };

  // src/jogo.ts
  function pegarElemento(id) {
    return document.getElementById(id);
  }
  var Game = class {
    constructor() {
      this.mago = new Mago("Mago", 50, 400, 20);
      this.bardo = new Bardo("Bardo", 40, 500, 30);
      this.turnoAtual = 0;
      this.jogoFinalizado = false;
      this.textoVidaMago = pegarElemento("hp1");
      this.barraVidaMago = pegarElemento("vida1");
      this.textoVidaBardo = pegarElemento("hp2");
      this.barraVidaBardo = pegarElemento("vida2");
      this.barraManaMago = pegarElemento("manaMago");
      this.textoManaMago = pegarElemento("manaTexto");
      this.barraAlcoolBardo = pegarElemento("alcoolBardo");
      this.textoAlcoolBardo = pegarElemento("alcoolTexto");
      this.botaoUltimateMago = pegarElemento("ultiMago");
      this.botaoUltimateBardo = pegarElemento("ultiBardo");
      this.areaAcoesMago = pegarElemento("acoesMago");
      this.areaAcoesBardo = pegarElemento("acoesBardo");
      this.imagemMago = pegarElemento("imgjogadorum");
      this.imagemBardo = pegarElemento("imgjogadordois");
      this.consoleBatalha = pegarElemento("console");
      this.iniciar();
    }
    iniciar() {
      this.imagemMago.src = this.mago.getimage();
      this.imagemBardo.src = this.bardo.getimage();
      pegarElemento("resetarBatalha").addEventListener("click", () => this.resetarBatalha());
      this.atualizarTela();
    }
    atualizarVida(personagem2, barra, texto) {
      barra.style.width = `${personagem2.getvidaPercentual()}%`;
      texto.innerHTML = `${personagem2.getvida().toFixed(0)} / ${personagem2.getvidaMax().toFixed(0)}`;
    }
    atualizarTela() {
      this.atualizarVida(this.mago, this.barraVidaMago, this.textoVidaMago);
      this.atualizarVida(this.bardo, this.barraVidaBardo, this.textoVidaBardo);
      this.barraManaMago.style.width = `${this.mago.mana}%`;
      this.textoManaMago.innerHTML = `${this.mago.mana}/100`;
      this.barraAlcoolBardo.style.width = `${this.bardo.alcool}%`;
      this.textoAlcoolBardo.innerHTML = `${this.bardo.alcool}/100`;
      this.botaoUltimateMago.disabled = this.mago.mana < 100;
      this.botaoUltimateBardo.disabled = this.bardo.alcool < 100;
      const turnoDoMago = this.turnoAtual % 2 === 0;
      if (turnoDoMago) {
        this.areaAcoesMago.classList.remove("bloqueado");
        this.areaAcoesBardo.classList.add("bloqueado");
      } else {
        this.areaAcoesBardo.classList.remove("bloqueado");
        this.areaAcoesMago.classList.add("bloqueado");
      }
    }
    flashAnime() {
      const flash = pegarElemento("flash");
      flash.style.opacity = "1";
      setTimeout(() => {
        flash.style.opacity = "0";
      }, 120);
    }
    shakeTela() {
      document.body.classList.add("shake");
      setTimeout(() => {
        document.body.classList.remove("shake");
      }, 300);
    }
    criarMiniMeteoro() {
      const alvo = pegarElemento("cardBardo");
      alvo.style.position = "relative";
      const meteoro = document.createElement("div");
      meteoro.classList.add("mini-meteoro");
      alvo.appendChild(meteoro);
      setTimeout(() => meteoro.remove(), 600);
    }
    criarExplosaoBardo() {
      const bardoEl = pegarElemento("cardBardo");
      bardoEl.style.position = "relative";
      const explosao = document.createElement("div");
      explosao.classList.add("explosao");
      bardoEl.appendChild(explosao);
      setTimeout(() => explosao.remove(), 600);
    }
    criarOndaSonora() {
      const bardoEl = pegarElemento("cardBardo");
      bardoEl.style.position = "relative";
      const onda = document.createElement("div");
      onda.classList.add("onda-sonora");
      bardoEl.appendChild(onda);
      bardoEl.classList.add("neon-bardo");
      setTimeout(() => {
        onda.remove();
        bardoEl.classList.remove("neon-bardo");
      }, 800);
    }
    executarTurno(ataque, jogador) {
      if (this.jogoFinalizado) return;
      if (!this.mago.isvivo() || !this.bardo.isvivo()) return;
      if (jogador === 1 && ataque === 3 /* Meteoro */) {
        this.flashAnime();
        this.shakeTela();
        this.criarMiniMeteoro();
        setTimeout(() => {
          this.criarExplosaoBardo();
        }, 400);
      }
      if (jogador === 2 && ataque === 3 /* seduzir */) {
        this.criarOndaSonora();
        this.shakeTela();
      }
      if (this.turnoAtual % 2 === 0 && jogador === 1) {
        this.mago.atacar(this.bardo, ataque);
        this.turnoAtual++;
      } else if (this.turnoAtual % 2 === 1 && jogador === 2) {
        this.bardo.atacar(this.mago, ataque);
        this.turnoAtual++;
      }
      this.atualizarTela();
      this.verificarVencedor();
    }
    verificarVencedor() {
      if (this.jogoFinalizado) return;
      if (this.mago.isvivo() && this.bardo.isvivo()) return;
      this.jogoFinalizado = true;
      const vencedor = this.mago.isvivo() ? "Mago" : "Bardo";
      this.mostrarVencedor(vencedor);
    }
    mostrarVencedor(nome) {
      this.consoleBatalha.innerHTML = "";
      const msg = document.createElement("p");
      msg.textContent = `${nome} VENCEU!`;
      msg.style.color = "yellow";
      msg.style.fontSize = "28px";
      msg.style.fontWeight = "bold";
      msg.style.textAlign = "center";
      this.consoleBatalha.appendChild(msg);
    }
    resetarBatalha() {
      this.turnoAtual = 0;
      this.jogoFinalizado = false;
      this.mago = new Mago("Mago", 46, 400, 20);
      this.bardo = new Bardo("Bardo", 40, 500, 30);
      this.imagemMago.src = this.mago.getimage();
      this.imagemBardo.src = this.bardo.getimage();
      this.consoleBatalha.innerHTML = "<p>\u2694\uFE0F Nova batalha iniciada!</p>";
      this.atualizarTela();
    }
  };
  var game = new Game();
  window.ataqueMago = (a) => game.executarTurno(a, 1);
  window.ataqueBardo = (a) => game.executarTurno(a, 2);
})();
