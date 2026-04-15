// Classe base do jogo (não pode ser instanciada diretamente)
export abstract class personagem {

  // Nome do personagem
  nome: string = "personagem";

  // Força (define o dano)
  protected forca: number = 0;

  // Vida atual
  protected hp: number = 0;

  // Vida máxima
  protected hpMax: number = 0;

  // Defesa em porcentagem (reduz dano)
  protected defesa: number = 0;

  // Mensagem personalizada de cura
  protected msgCura: string = "curou";


  // Construtor (executa ao criar o personagem)
  constructor(nome: string, forca: number, hp: number, hpMax: number, defesa: number, msgCura: string) {
    this.nome = nome;
    this.forca = forca;
    this.hp = hp;
    this.hpMax = hpMax;
    this.msgCura = msgCura;

    // Limita a defesa (máx 80%)
    this.defesa = Math.min(defesa, 80);
  }


  // 🎲 Gera dano baseado na força
  gerarataque(): number {
    return Math.floor(Math.random() * (this.forca / 2)) + 5;
  }


  // 🎲 Escolhe qual habilidade usar (0,1,2)
  rolarAtaque(): number {
    return Math.floor(Math.random() * 3);
  }


  // ❤️ Verifica se está vivo
  isvivo(): boolean {
    return this.hp > 0;
  }


  // 🛡️ Recebe dano (com defesa %)
  sofrerDano(dano: number): void {

    // Calcula redução pela defesa
    const reducao = dano * (this.defesa / 100);

    // Aplica redução
    let danoFinal = dano - reducao;

    // Evita dano negativo
    if (danoFinal < 0) danoFinal = 0;

    // Aplica dano na vida
    this.hp -= danoFinal;

    // Evita HP negativo
    if (this.hp < 0) this.hp = 0;

    console.log(`${this.nome} sofreu ${danoFinal.toFixed(0)} de dano (HP: ${this.hp})`);
  }


  // ❤️ Cura padrão
  curar(): void {
    const cura = 30;

    this.hp += cura;

    // Limita ao máximo
    if (this.hp > this.hpMax) this.hp = this.hpMax;

    console.log(`${this.nome} ${this.msgCura} ${cura} de vida (HP: ${this.hp})`);
  }


  // Método obrigatório (cada classe implementa do seu jeito)
  public abstract atacar(alvo: personagem): void;
}