import { personagem } from "./personagem.ts";

export class Mago extends personagem {

    constructor(nome: string, forca: number, hp: number, defesa: number ) {
        super(nome, forca, hp, 85, defesa, "usou uma poção e curou");
    }

    atacar(alvo: personagem): void {
        const escolha = this.rolarAtaque();

        switch (escolha) {
            case 0:
                this.bolaDeFogo(alvo);
                break;
            case 1:
                this.raioMagico(alvo);
                break;
            case 2:
                this.explosaoArcana(alvo);
                break;
        }
    }

    private bolaDeFogo(alvo: personagem): void {
        const dano = this.gerarataque() + 20;
        console.log(`${this.nome} usou macumba 🔥`);
        alvo.sofrerDano(dano);
    }

    private raioMagico(alvo: personagem): void {
        const dano = this.gerarataque() + 25;
        console.log(`${this.nome} usou desativar respiração automática ⚡`);
        alvo.sofrerDano(dano);
    }

    private explosaoArcana(alvo: personagem): void {
        const dano = this.gerarataque() + 35;
        console.log(`${this.nome} usou cachimbo da paz Arcana 💥`);
        alvo.sofrerDano(dano);
    }

    // mago cura mais
    curar(): void {
        const cura = 30;
        this.hp += cura;

        if (this.hp > this.hpMax) this.hp = this.hpMax;

        console.log(`${this.nome} usou uma poção e curou ${cura} de vida 🧪 (HP: ${this.hp})`);
    }
}