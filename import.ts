import { Aluno } from "./Aluno.ts";
import { professor } from "./professor.ts";

const aluno = new Aluno("João", 2);
//aluno.mudarNota(11);//erro
//aluno.mudarNota(-11);//erro
aluno.mudarNota(10);//certo

const prof = new professor("Carlos", 0 );

aluno.falar();