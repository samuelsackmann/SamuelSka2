import { Aluno } from "./Aluno.ts";
import { Produto } from "./produto.ts";
import { professor } from "./professor.ts";
import { Carro } from "./carro.ts";
const aluno = new Aluno("João", 2);
//aluno.mudarNota(11);//erro
//aluno.mudarNota(-11);//erro
aluno.mudarNota(10);//certo
aluno.falar();

let produto:Produto = new Produto("Coca-cola", 10, "Refrigerante");
produto.setDescricao("Refrigerante sabor cola");
produto.falar();
console.log("Descrição: " + produto.getDescricao());


let fusca:Carro = new Carro("Volkswagen");
fusca.buzinar();
