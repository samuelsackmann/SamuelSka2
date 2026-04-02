export class professor {
  nome: string;
  nota: number;

  constructor(nome: string, nota: number) {
    this.nome = nome;
    this.nota = nota;
  }

  falar() {
    console.log("meu nome é " + this.nome);
    console.log("minha nota é " + this.nota);
  }
}