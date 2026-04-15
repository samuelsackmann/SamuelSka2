
export class Carro extends Veiculo {
  constructor(marca: string) {
    super(marca, 0);  
// OBRIGATÓRIO: chama o construtor do pai
  }
  buzinar() {
    this.velocidade = 20; // Acessa a propriedade protegida da classe pai
  }
}
