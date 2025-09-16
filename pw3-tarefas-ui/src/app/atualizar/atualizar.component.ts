import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompartilhamentoService } from '../compartilhamento.service';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-atualizar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './atualizar.component.html',
  styleUrl: './atualizar.component.css'
})
export class AtualizarComponent {

  confirmacao: any;

  usuarios: Usuario[] = [];

  formConfirmar: FormGroup;
  formAtualizar: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private compartilhamentoSevice: CompartilhamentoService) {
    this.formConfirmar = this.fb.group({
      campoNomeEmail: ['', [Validators.required]],
      campoSenha: ['', [Validators.required]]
    });

    this.formAtualizar = this.fb.group({
      campoNome: ['', [Validators.required, Validators.maxLength(10)]],
      camposenha: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      campoEmail: ['', [Validators.required, Validators.email]],
      campoconfirmasenha: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.usuarios = this.compartilhamentoSevice.getUsuarios();
    this.confirmacao = undefined;
  }

  public confirmar(): Usuario | undefined {
    this.usuarios = this.compartilhamentoSevice.getUsuarios();

    let nomeEmailConfirmar = this.formConfirmar.get("campoNomeEmail")?.value.toLocaleLowerCase().trim()
    let senhaConfirmar = this.formConfirmar.get("campoSenha")?.value

    const usuaioConfirmar = new Usuario(nomeEmailConfirmar, senhaConfirmar, '');

    if (this.usuarios.find(u => (u.nome == usuaioConfirmar.nome || usuaioConfirmar.nome == u.email) && u.senha == usuaioConfirmar.senha)) {
      alert("Usuario encontrado!!");
      return this.confirmacao = this.usuarios.find(u => (u.nome == usuaioConfirmar.nome || usuaioConfirmar.nome == u.email) && u.senha == usuaioConfirmar.senha)
    }
    else {
      alert("usuario nao encontrado")
      this.formConfirmar.get("campoNomeEmail")?.setValue('')
      this.formConfirmar.get("campoSenha")?.setValue('')
      return undefined;
    }
  }

  atualizar() {
    this.usuarios = this.compartilhamentoSevice.getUsuarios();

    let nome = this.formAtualizar.get("campoNome")?.value.toLocaleLowerCase().trim()
    let email = this.formAtualizar.get("campoEmail")?.value
    let senha = this.formAtualizar.get("camposenha")?.value
    let confirmaSenha = this.formAtualizar.get("campoconfirmasenha")?.value

    const usuarioNovo: Usuario = new Usuario(nome, senha, email);

    if (this.formAtualizar.valid) {
      if (confirmaSenha != senha) {
        alert("A senha permanece errada")
        this.formAtualizar.get("campoconfirmasenha")?.setValue('')
      }
      else {
        if (this.usuarios.find(u => u.nome == usuarioNovo.nome || u.email == usuarioNovo.email)) {
          alert("Esse usuario já existe")
        }
        else {
          this.compartilhamentoSevice.updateUsuario(usuarioNovo, this.confirmacao)
          alert("Usuario atualizado!!")
          console.log(this.usuarios)
          this.route.navigate(["/funcionalidade"])
        }
      }
    }
    else {
      alert("O formulario está invalido")
    }
  }

}
