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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6j1gF2M3PjQocC3z5vn6DBRsDXz1BSBlIpg&s"
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
    this.gerarataque() + 30;

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
    this.gerarataque() + 25;

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
    this.gerarataque() + 80;

    this.log(
      "☄️ METEORO ☄️"
    );

    alvo.sofrerDano(dano);

    this.efeitoDano(
      "imgjogadordois"
    );

  }

  override curar(): void {

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