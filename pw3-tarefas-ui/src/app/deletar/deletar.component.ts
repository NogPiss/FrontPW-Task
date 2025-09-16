import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompartilhamentoService } from '../compartilhamento.service';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-deletar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './deletar.component.html',
  styleUrl: './deletar.component.css'
})
export class DeletarComponent {

  usuarios: Usuario[] = [];

  formDeletar: FormGroup;

  constructor(private fb: FormBuilder, private compartilhamentoService: CompartilhamentoService) {
    this.formDeletar = this.fb.group({
      campoNomeEmail: ['', [Validators.required]],
      campoSenha: ['', [Validators.required]]
    });
  }

  deletar() {
    this.usuarios = this.compartilhamentoService.getUsuarios();

    let nomeEmail = this.formDeletar.get("campoNomeEmail")?.value.toLocaleLowerCase().trim()
    let senha = this.formDeletar.get("campoSenha")?.value

    const usuarioForm = new Usuario(nomeEmail, senha, '');

    if (this.formDeletar.valid) {
      if (this.usuarios.find(u => (u.nome == usuarioForm.nome || usuarioForm.nome == u.email) && usuarioForm.senha == u.senha)) {
        this.compartilhamentoService.deletarUsuario(usuarioForm)
        alert("Usuario deletado com sucesso")
        this.usuarios = this.compartilhamentoService.getUsuarios();
        console.log(this.usuarios)
      }
      else {
        alert("usuario não encontrado")
        this.formDeletar.get("campoNomeEmail")?.setValue('')
        this.formDeletar.get("campoSenha")?.setValue('')
      }
    }
    else {
      alert("Algo no formulario esta errado")
      this.formDeletar.get("campoNomeEmail")?.setValue('')
      this.formDeletar.get("campoSenha")?.setValue('')
    }
  }
}
