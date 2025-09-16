import { Injectable } from '@angular/core';
import { Usuario } from './model/Usuario';


@Injectable({
  providedIn: 'root'
})
export class CompartilhamentoService {

  private usuarios: Usuario[] = [
    {
      nome: 'tadeu',
      senha: '123',
      email: 'Tadeu@gmail.com'
    },
    {
      nome: 'hermelinalinda',
      senha: '1234',
      email: 'hermebonita@gmail.com'
    }
  ];

  constructor() { }

  setUsuarios(novausuario: Usuario) {
    this.usuarios.push(novausuario)
  }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  updateUsuario(usuarioNovo: Usuario, usuarioAlvo: Usuario) {
    const usuario = this.usuarios.find(u => u.nome === usuarioAlvo.nome);

    if (usuario) {
      usuario.nome = usuarioNovo.nome;
      usuario.email = usuarioNovo.email;
      usuario.senha = usuarioNovo.senha;
    }
  }

  deletarUsuario(usuarioAlvo: Usuario){
    const indexDoUsuario = this.usuarios.findIndex(u => u.nome == usuarioAlvo.nome)
    this.usuarios.splice(indexDoUsuario, 1)
  }
}
