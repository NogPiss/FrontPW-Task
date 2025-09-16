import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FuncionalidadeComponent } from './funcionalidade/funcionalidade.component';
import { HomeComponent } from './home/home.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { DeletarComponent } from './deletar/deletar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoginComponent,
    CadastroComponent,
    FuncionalidadeComponent,
    HomeComponent,
    SobreNosComponent,
    AtualizarComponent,
    DeletarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjetoFuncionalidadesUsuario';
}
