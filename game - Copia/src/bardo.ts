 import { personagem } from "./personagem";

export class Bardo extends personagem {

  public alcool: number = 0;

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
      500,
      defesa,
      "bebeu cachaça 🍺",
      "https://endless-coffee-3qom2hwieb.edgeone.app/411e2248-945e-4663-b5e5-15b1d0b4b0e5_rotated-removebg-preview.png"
    );
  }

  atacar(
    alvo: personagem,
    ataque: number
  ): void {

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

  public gritoDoRock(
    alvo: personagem
  ): void {

    const dano =
    this.gerarataque() + 50;

    this.log(
      `${this.nome} soltou um Grito do Rock 🤘`
    );

    alvo.sofrerDano(dano);

    this.efeitoDano(
      "imgjogadorum"
    );

  }

  public musicaOfensiva(
    alvo: personagem
  ): void {

    const dano =
    this.gerarataque() + 40;

    this.log(
      `${this.nome} usou Arrocha 🔊`
    );

    alvo.sofrerDano(dano);

    this.efeitoDano(
      "imgjogadorum"
    );

  }

  public soloLendario(
    alvo: personagem
  ): void {

    if (this.alcool < 100) {

      this.log(
        "Álcool insuficiente 🍺"
      );

      return;

    }

    this.alcool = 0;

    const dano =
    this.gerarataque() + 90;

    this.log(
      `🎸 SOLO LENDÁRIO 🎸`
    );

    alvo.sofrerDano(dano);

    this.efeitoDano(
      "imgjogadorum"
    );

  }

  override curar(): void {

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
      `${this.nome} bebeu cachaça 🍺`
    );

    this.log(
      `${this.nome} ganhou +25 Álcool 🍻`
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

}