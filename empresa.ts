
import { funcionario } from "./funcionario.ts";
import { Gerente } from "./gerente.ts";

let func1 =  funcionario("Samuel", 2000);
console.log(func1.nome);

// Criando um Gerente
let gerente1 = new Gerente("João", 5000, "Gerente de TI");
console.log("Gerente:", gerente1.nome);
console.log("Salário:", gerente1.getSalario());
console.log("Cargo:", gerente1.cargo);
gerente1.mandar();