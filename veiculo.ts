class Veiculo {
  public marca: string;
  protected velocidade: number = 0;

  constructor(marca: string, velocidade: number) {
    this.marca = marca;
    this.velocidade = velocidade;
  }

  acelerar(v: number): void {
    this.velocidade += v;
  }

  descrever(): string {
    return `${this.marca} a ${this.velocidade} km/h`;
  }
}
