// Importa a classe Bardo (personagem tipo suporte/dano)
import { Bardo } from "./bardo.ts";

// Importa a classe que controla o combate (turnos, ações, etc)
import { Jogo } from "./jogo.ts";

// Importa a classe Mago (personagem com ataques mais fortes)
import { Mago } from "./mago.ts";


// Cria um personagem do tipo Mago
// Parâmetros:
// "Mago" → nome
// 46 → força (define o dano)
// 170 → vida (HP)
// 20 → defesa (% de redução de dano)
let mago = new Mago("Mago", 46, 170, 20);


// Cria um personagem do tipo Bardo
// "Bardo" → nome
// 40 → força
// 200 → vida
// 30 → defesa
let bardo = new Bardo("Bardo", 40, 200, 30);


// Cria o sistema de jogo (controle da batalha)
let jogo = new Jogo();


// Inicia a luta entre os dois personagens
// O jogo vai:
// 1. Rodar turnos
// 2. Alternar ações (curar ou atacar)
// 3. Parar quando alguém morrer
jogo.iniciar(mago, bardo);