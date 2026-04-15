export class Usuario {
  private static usuarios: Map<string, string> = new Map(); // Armazena conta -> senha

  constructor(private conta: string, private senha: string) {}

  static registrarUsuario(conta: string, senha: string): string {
    if (Usuario.usuarios.has(conta)) {
      return `O usuário ${conta} já possui uma senha registrada.`;
    }

    Usuario.usuarios.set(conta, senha);
    return `Usuário ${conta} registrado com sucesso!`;
  }

  static verificarUsuario(conta: string, senha: string): string {
    const senhaRegistrada = Usuario.usuarios.get(conta);

    if (!senhaRegistrada) {
      return `Usuário ${conta} não encontrado.`;
    }

    if (senhaRegistrada === senha) {
      return `Login bem-sucedido para ${conta}!`;
    } else {
      return `Senha incorreta para ${conta}.`;
    }
  }

  static usuarioJaPossuiSenha(conta: string): boolean {
    return Usuario.usuarios.has(conta);
  }
}