export abstract class personagem {

  public nome: string;

  protected forca: number;

  protected hp: number;

  protected readonly hpMax: number;

  protected defesa: number;

  protected msgCura: string;

  protected imagem: string;

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

  public gerarataque(): number {

    return Math.floor(
      Math.random() * this.forca
    ) + 1;

  }

  public isvivo(): boolean {

    return this.hp > 0;

  }

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

  public efeitoDano(
    id: string
  ): void {

    const imagem =
    document.getElementById(
      id
    ) as HTMLElement;

    imagem.classList.add(
      "hit"
    );

    setTimeout(() => {

      imagem.classList.remove(
        "hit"
      );

    }, 300);

  }

  public log(
    mensagem: string
  ): void {

    const consoleHTML =
    document.getElementById(
      "console"
    ) as HTMLElement;

    consoleHTML.innerHTML +=
    `<p>${mensagem}</p>`;

    consoleHTML.scrollTop =
    consoleHTML.scrollHeight;

  }

  abstract atacar(
    alvo: personagem,
    ataque: number
  ): void;

}