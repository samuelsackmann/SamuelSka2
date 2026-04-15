class contador {
    static total: number = 0;// atributo de classe - static, compartilhado por todas as instâncias da classe
    public nome: string;// atributo de instância

    constructor(nome: string) {
        this.nome = nome;
        contador.total++; // Incrementa o contador total sempre que um novo objeto é criado 
    }

    static resetar() : void {
        contador.total = 0;
    }   
}
