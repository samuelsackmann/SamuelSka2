export abstract class personagem {

  // ======================================
  // ATRIBUTOS
  // ======================================

  public nome: string;

  protected forca: number;

  protected hp: number;

  protected hpMax: number;

  protected defesa: number;

  protected msgCura: string;

  protected imagem: string;

  // ======================================
  // CONSTRUTOR
  // ======================================

  constructor(
    nome: string,
    forca: number,
    hp: number,
    hpMax: number,
    defesa: number,
    msgCura: string,
    imagem: string
  ) {

    this.nome = nome;

    this.forca = forca;

    this.hp = hp;

    this.hpMax = hpMax;

    this.defesa =
    Math.min(defesa, 80);

    this.msgCura = msgCura;

    this.imagem = imagem;

  }

  // ======================================
  // GETTERS
  // ======================================

  public getvida(): number {

    return this.hp;

  }

  public getvidaMax(): number {

    return this.hpMax;

  }

  public getvidaPercentual(): number {

    return (
      this.hp /
      this.hpMax
    ) * 100;

  }

  public getimage(): string {

    return this.imagem;

  }

  // ======================================
  // SISTEMA DE ATAQUE
  // ======================================

  public gerarataque(): number {

    return Math.floor(
      Math.random() * this.forca
    ) + 1;

  }

  // ======================================
  // STATUS
  // ======================================

  public isvivo(): boolean {

    return this.hp > 0;

  }

  // ======================================
  // DANO
  // ======================================

  public sofrerDano(
    dano: number
  ): void {

    const reducaoDefesa =
    dano * (
      this.defesa / 100
    );

    let danoFinal =
    dano - reducaoDefesa;

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

  public curar(): void {

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

  public log(
    mensagem: string
  ): void {

    const consoleHTML =
    document.getElementById(
      "console"
    ) as HTMLElement;

    consoleHTML.innerHTML +=
    `<p>${mensagem}</p>`;

  }

  // ======================================
  // MÉTODO ABSTRATO
  // ======================================

  abstract atacar(
    alvo: personagem,
    ataque: number
  ): void;

}