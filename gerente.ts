import { funcionario } from "./funcionario.ts";
export class Gerente extends funcionario { 
    public cargo: string;

    constructor(nome: string, salario: number, cargo: string = "gerente") {
        super(nome, salario);
        this.cargo = cargo;
    }
 ferias (dias: number): number {
    if (dias > 30) {
        return 0;
    }
    else{
    return dias;
 }
 }
 
 aumento_monetario(dias:number): number{
    return this.getSalario() + 100;
 }



    mandar() {
        console.log("trabalha vadio");
    }
    override() {
        console.log("eu ganho mais que vc");
    }
}