import { personagem } from "./personagem";

export class Mago extends personagem {

  public mana: number = 0;

  constructor(
    nome: string,
    forca: number,
    hp: number,
    defesa: number
  ) {

    super(
      nome,
      forca,
      hp,
      400,
      defesa,
      "usou magia de cura ✨",
      "https://i.pinimg.com/originals/5c/d8/e6/5cd8e6db676d6299731c4477573b676b.gif"
    );

  }

  atacar(
    alvo: personagem,
    ataque: number
  ): void {

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

  public bolaDeFogo(
    alvo: personagem
  ): void {

    const dano =
    this.gerarataque() + 50;

    this.log(
      `${this.nome} lançou Bola de Fogo 🔥`
    );

    alvo.sofrerDano(dano);

    this.efeitoDano(
      "imgjogadordois"
    );

  }

  public macumba(
    alvo: personagem
  ): void {

    const dano =
    this.gerarataque() + 40;

    this.log(
      `${this.nome} lançou Macumba ⚡`
    );

    alvo.sofrerDano(dano);

    this.efeitoDano(
      "imgjogadordois"
    );

  }

  public meteoro(
    alvo: personagem
  ): void {

    if (this.mana < 100) {

      this.log(
        "Mana insuficiente ☄️"
      );

      return;

    }

    this.mana = 0;

    const dano =
    this.gerarataque() + 100;

    this.log(
      "☄️ METEORO ☄️"
    );

    alvo.sofrerDano(dano);

    this.efeitoDano(
      "imgjogadordois"
    );

  }

  override curar(): void {

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
      `${this.nome} bebeu Guaraviton 🧪`
    );

  }

  public efeitoDano(
    idImagem: string
  ): void {

    const imagem =
    document.getElementById(
      idImagem
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

}