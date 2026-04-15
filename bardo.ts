import { personagem } from "./personagem.ts";

export class Bardo extends personagem {

    constructor(nome: string, forca: number, hp: number, defesa: number) {
        super(nome, forca, hp, 100, defesa, "bebeu cachaça e se curou");
    }

    atacar(alvo: personagem): void {
        const escolha = this.rolarAtaque();

        switch (escolha) {
            case 0:
                this.ataqueBasico(alvo);
                break;
            case 1:
                this.cantoDeCura();
                break;
            case 2:
                this.musicaOfensiva(alvo);
                break;
        }
    }

    private ataqueBasico(alvo: personagem): void {
        const dano = this.gerarataque() +20;
        console.log(`${this.nome} fez um solo de guitarra 🎸`);
        alvo.sofrerDano(dano);
    }

    private cantoDeCura(): void {
        console.log(`${this.nome} usou metalica 🎶`);
        this.curar();
    }

    private musicaOfensiva(alvo: personagem): void {
        const dano = this.gerarataque() + 25;
        console.log(`${this.nome} usou arrocha 🔊`);
        alvo.sofrerDano(dano);
    }

    // bardo cura normal
    curar(): void {
        const cura = 21.22;
        this.hp += cura;

        if (this.hp > this.hpMax) this.hp = this.hpMax;

        console.log(`${this.nome} bebeu cachaça e curou ${cura} de vida 🍺 (HP: ${this.hp})`);
    }
}