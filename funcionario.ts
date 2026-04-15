export abstract class funcionario {
    public nome: string;
    protected _salario: number;// Atributo protegido, acessível apenas dentro da classe e por classes derivadas
  
    constructor(nome: string, salario: number){// Construtor da classe funcionario
        this.nome = nome;
        this._salario = salario;// Atributo protegido, acessível apenas dentro da classe e por classes derivadas
    }

    getSalario(): number {// Getter para acessar o salário
        return this._salario;
    }

    setSalario(valor: number) {//  Setter para atualizar o salário
        this._salario = valor;
    }

    public atualizarNome(novaDesc: string): void {// Método para atualizar o nome do funcionário
        this.nome = novaDesc;
    }
    abstract ferias(dias:number): number;// Método abstrato para calcular as férias, deve ser implementado pelas classes derivadas
    abstract aumento_monetario(dias:number): number;
}