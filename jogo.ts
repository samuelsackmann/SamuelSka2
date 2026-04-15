// Importa a classe base personagem
// Isso permite usar qualquer personagem (Mago, Bardo, etc)
import { personagem } from "./personagem.ts";


// Classe que controla a batalha
export class Jogo {

    // Método principal que inicia o jogo
    // Recebe dois personagens como parâmetros
    public iniciar(player1: personagem, player2: personagem) {

        // Variável que controla o número do turno
        let turno = 1;

        // Loop principal da luta
        // Continua enquanto os dois estiverem vivos
        while (player1.isvivo() && player2.isvivo()) {

            // Mostra o turno atual no console
            console.log(`\n=========== TURNO ${turno} ===========`);

            // Player 1 faz uma ação (atacar ou curar)
            this.acao(player1, player2);

            // Verifica se o player 2 ainda está vivo antes de agir
            // Isso evita que um personagem morto continue jogando
            if (player2.isvivo()) {

                // Player 2 faz uma ação contra o player 1
                this.acao(player2, player1);
            }

            // Avança para o próximo turno
            turno++;
        }

        // Após o fim do loop (quando alguém morre),
        // verifica quem ainda está vivo

        if (player1.isvivo()) {

            // Se o player1 estiver vivo, ele venceu
            console.log(`${player1.nome} ganhou a luta`);

        } else {

            // Caso contrário, o player2 venceu
            console.log(`${player2.nome} ganhou a luta`);
        }
    }


    // Método que define o que o personagem vai fazer no turno
    private acao(atacante: personagem, alvo: personagem): void {

        // Gera um número aleatório entre 0 e 1
        let escolha = Math.random();

        // Se o número for menor que 0.3 (30% de chance)
        // o personagem vai se curar
        if (escolha < 0.3) {

            atacante.curar();

        } else {

            // Caso contrário (70% de chance),
            // o personagem realiza um ataque
            atacante.atacar(alvo);
        }
    }
}