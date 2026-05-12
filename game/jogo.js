"use strict";
(() => {
  // src/personagem.ts
  var personagem = class {
    // ======================================
    // CONSTRUTOR
    // ======================================
    constructor(nome, forca, hp, hpMax, defesa, msgCura, imagem) {
      this.nome = nome;
      this.forca = forca;
      this.hp = hp;
      this.hpMax = hpMax;
      this.defesa = Math.min(defesa, 80);
      this.msgCura = msgCura;
      this.imagem = imagem;
    }
    // ======================================
    // GETTERS
    // ======================================
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
    // ======================================
    // SISTEMA DE ATAQUE
    // ======================================
    gerarataque() {
      return Math.floor(
        Math.random() * this.forca
      ) + 1;
    }
    // ======================================
    // STATUS
    // ======================================
    isvivo() {
      return this.hp > 0;
    }
    // ======================================
    // DANO
    // ======================================
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
    // ======================================
    // CURA
    // ======================================
    curar() {
      const valorCura = 30;
      this.hp += valorCura;
      if (this.hp > this.hpMax) {
        this.hp = this.hpMax;
      }
      this.log(
        `${this.nome} ${this.msgCura}`
      );
    }
    // ======================================
    // LOG
    // ======================================
    log(mensagem) {
      const consoleHTML = document.getElementById(
        "console"
      );
      consoleHTML.innerHTML += `<p>${mensagem}</p>`;
    }
  };

  // src/bardo.ts
  var Bardo = class extends personagem {
    constructor(nome, forca, hp, defesa) {
      super(
        nome,
        forca,
        hp,
        100,
        defesa,
        "bebeu cacha\xE7a \u{1F37A}",
        "https://i.pinimg.com/736x/61/21/a3/6121a37eccc3782b993e8c95aea1316c.jpg"
      );
      this.alcool = 0;
    }
    atacar(alvo, ataque) {
      switch (ataque) {
        case 0:
          this.gritoDoRock(alvo);
          break;
        case 1:
          this.curar();
          break;
        case 2:
          this.musicaOfensiva(alvo);
          break;
        case 3:
          this.soloLendario(alvo);
          break;
      }
    }
    // ===============================
    // GRITO DO ROCK
    // ===============================
    gritoDoRock(alvo) {
      const dano = this.gerarataque() + 40;
      this.log(
        `${this.nome} soltou um Grito do Rock \u{1F918}`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadorum"
      );
    }
    // ===============================
    // ARROCHA
    // ===============================
    musicaOfensiva(alvo) {
      const dano = this.gerarataque() + 30;
      this.log(
        `${this.nome} usou Arrocha \u{1F50A}`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadorum"
      );
    }
    // ===============================
    // SOLO LENDÁRIO
    // ===============================
    soloLendario(alvo) {
      if (this.alcool < 100) {
        this.log(
          "\xC1lcool insuficiente \u{1F37A}"
        );
        return;
      }
      this.alcool = 0;
      const dano = this.gerarataque() + 80;
      this.log(
        `\u{1F3B8} SOLO LEND\xC1RIO \u{1F3B8}`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadorum"
      );
    }
    // ===============================
    // CURA
    // ===============================
    curar() {
      const cura = 16;
      this.hp += cura;
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
        `${this.nome} ganhou +25 \xC1lcool \u{1F37B}`
      );
    }
    // ===============================
    // EFEITO VISUAL
    // ===============================
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
    // ======================================
    // CONSTRUTOR
    // ======================================
    constructor(nome, forca, hp, defesa) {
      super(
        nome,
        forca,
        hp,
        85,
        defesa,
        "usou magia de cura \u2728",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6j1gF2M3PjQocC3z5vn6DBRsDXz1BSBlIpg&s"
      );
      // ======================================
      // ATRIBUTO
      // ======================================
      this.mana = 0;
    }
    // ======================================
    // ATAQUES
    // ======================================
    atacar(alvo, ataque) {
      switch (ataque) {
        case 0:
          this.bolaDeFogo(alvo);
          break;
        case 1:
          this.macumba(alvo);
          break;
        case 2:
          this.curar();
          break;
        case 3:
          this.meteoro(alvo);
          break;
      }
    }
    // ======================================
    // BOLA DE FOGO
    // ======================================
    bolaDeFogo(alvo) {
      const dano = this.gerarataque() + 30;
      this.log(
        `${this.nome} lan\xE7ou Bola de Fogo \u{1F525}`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadordois"
      );
    }
    // ======================================
    // MACUMBA
    // ======================================
    macumba(alvo) {
      const dano = this.gerarataque() + 25;
      this.log(
        `${this.nome} lan\xE7ou Macumba \u26A1`
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadordois"
      );
    }
    // ======================================
    // METEORO
    // ======================================
    meteoro(alvo) {
      if (this.mana < 100) {
        this.log(
          "Mana insuficiente \u2604\uFE0F"
        );
        return;
      }
      this.mana = 0;
      const dano = this.gerarataque() + 80;
      this.log(
        "\u2604\uFE0F METEORO \u2604\uFE0F"
      );
      alvo.sofrerDano(dano);
      this.efeitoDano(
        "imgjogadordois"
      );
    }
    // ======================================
    // CURA
    // ======================================
    curar() {
      const valorCura = 24;
      this.hp += valorCura;
      this.mana += 25;
      if (this.mana > 100) {
        this.mana = 100;
      }
      if (this.hp > this.hpMax) {
        this.hp = this.hpMax;
      }
      this.log(
        `${this.nome} bebeu Guaraviton \u{1F9EA}`
      );
    }
    // ======================================
    // EFEITO VISUAL
    // ======================================
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
  var mago = new Mago("Mago", 46, 85, 20);
  var bardo = new Bardo("Bardo", 40, 100, 30);
  var turnoAtual = 0;
  var textoVidaMago = document.getElementById("hp1");
  var barraVidaMago = document.getElementById("vida1");
  var textoVidaBardo = document.getElementById("hp2");
  var barraVidaBardo = document.getElementById("vida2");
  var barraManaMago = document.getElementById("manaMago");
  var textoManaMago = document.getElementById("manaTexto");
  var barraAlcoolBardo = document.getElementById("alcoolBardo");
  var textoAlcoolBardo = document.getElementById("alcoolTexto");
  var botaoUltimateMago = document.getElementById("ultiMago");
  var botaoUltimateBardo = document.getElementById("ultiBardo");
  var botaoResetar = document.getElementById("resetarBatalha");
  var areaAcoesMago = document.getElementById("acoesMago");
  var areaAcoesBardo = document.getElementById("acoesBardo");
  var imagemMago = document.getElementById("imgjogadorum");
  var imagemBardo = document.getElementById("imgjogadordois");
  var consoleBatalha = document.getElementById("console");
  function flashAnime() {
    const flash = document.getElementById("flash");
    flash.style.opacity = "1";
    setTimeout(() => {
      flash.style.opacity = "0";
    }, 120);
  }
  function criarExplosaoBardo() {
    const bardoEl = document.getElementById("cardBardo");
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
  function criarMiniMeteoroNoBardo() {
    const bardoEl = document.getElementById("cardBardo");
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
  function shakeTela() {
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 300);
  }
  function atualizarTela() {
    textoVidaMago.innerHTML = `${mago.getvida().toFixed(2)} / ${mago.getvidaMax().toFixed(2)}`;
    barraVidaMago.style.width = `${mago.getvidaPercentual()}%`;
    textoVidaBardo.innerHTML = `${bardo.getvida().toFixed(2)} / ${bardo.getvidaMax().toFixed(2)}`;
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
  function executarTurno(ataque, jogador) {
    if (!mago.isvivo() || !bardo.isvivo()) return;
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
  function verificarVencedor() {
    if (!mago.isvivo()) mago.log("\u{1F3B8} Bardo venceu!");
    if (!bardo.isvivo()) mago.log("\u{1F525} Mago venceu!");
  }
  function resetarBatalha() {
    turnoAtual = 0;
    mago = new Mago("Mago", 46, 85, 20);
    bardo = new Bardo("Bardo", 40, 100, 30);
    imagemMago.src = mago.getimage();
    imagemBardo.src = bardo.getimage();
    consoleBatalha.innerHTML = "<p>\u2694\uFE0F Nova batalha iniciada!</p>";
    atualizarTela();
  }
  botaoResetar.addEventListener("click", resetarBatalha);
  imagemMago.src = mago.getimage();
  imagemBardo.src = bardo.getimage();
  atualizarTela();
  window.ataqueMago = (a) => executarTurno(a, 1);
  window.ataqueBardo = (a) => executarTurno(a, 2);
})();
