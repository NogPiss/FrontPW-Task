import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { CompartilhamentoService } from '../compartilhamento.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuarios: Usuario[] = [];

  formularioLogin: FormGroup;

  constructor(private fb: FormBuilder, private compartilhamentoService: CompartilhamentoService, private router: Router){
    this.formularioLogin = this.fb.group({
      campoUsuario: ['', [Validators.required]],
      campoSenha: ['', [Validators.required]]
    });
  }

  ngOnInit(){
    this.usuarios = this.compartilhamentoService.getUsuarios();
  }

  Enviar(){
    this.usuarios = this.compartilhamentoService.getUsuarios();
    let nomeUsuarioEmailHtml = this.formularioLogin.get("campoUsuario")?.value.toLocaleLowerCase().trim();
    let senhaHtml = this.formularioLogin.get("campoSenha")?.value


    const usuarioLogin = new Usuario(nomeUsuarioEmailHtml, senhaHtml, '');


    if(this.usuarios.find(u => (u.nome == usuarioLogin.nome || usuarioLogin.nome == u.email) && u.senha == usuarioLogin.senha)){
      alert("Usuario encontrado!! \nBem-vindo " + usuarioLogin.nome);
      this.router.navigate(["/home"]);
    }
    else{
      alert("Usuario não encontrado  :(");
      this.formularioLogin.get("campoUsuario")?.setValue('')
      this.formularioLogin.get("campoSenha")?.setValue('')
    }
  }
}
