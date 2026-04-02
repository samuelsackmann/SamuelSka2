export class Produto {
  private nome: string;
  private desc: string;
  private preco: number;

  constructor(nome: string, preco: number, desc: string) {
    this.nome = nome;
    this.preco = preco;
    this.desc = desc;
  }

  // GETTERS
  public getNome(): string {
    return this.nome;
  }

  public getDescricao(): string {
    return this.desc;
  }

  public getPreco(): number {
    return this.preco;
  }

  // SETTERS
  public setNome(novoNome: string): void {
    this.nome = novoNome;
  }

  public setDescricao(novaDesc: string): void {
    this.desc = novaDesc;
  }

  public setPreco(novoPreco: number): void {
    this.preco = novoPreco;
  }

  // MÉTODO
  public falar() {
    console.log("Nome: " + this.nome);
    console.log("Preço: " + this.preco);
    console.log("Descrição: " + this.desc);
  }
}
