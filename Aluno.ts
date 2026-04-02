export class Aluno {
  readonly nome: string; // Nome do aluno (não pode ser alterado depois de criado)
  private nota: number;  // Nota do aluno (só pode ser acessada dentro da classe)

  constructor(nome: string, nota: number) {
    this.nome = nome; // Define o nome recebido no construtor
    this.nota = nota; // Define a nota inicial
  }

  mudarNota(nota: number) {
    // Verifica se a nota está fora do intervalo permitido (0 a 10)
    if (nota < 0 || nota > 10) {
      console.log("Erro: nota inválida"); // Mostra erro
      return; // Para a execução e NÃO altera a nota
    }

    // Se a nota for válida, atualiza a nota do aluno
    this.nota = nota;
  }

  falar() {
    // Mostra o nome do aluno
    console.log("meu nome é " + this.nome);

    // Mostra a nota do aluno
    console.log("minha nota é " + this.nota);
  }

  getNota(): number {
    // Retorna a nota do aluno sem permitir acesso direto à variável
    return this.nota;
  }
}
