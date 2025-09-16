import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { FuncionalidadeComponent } from './funcionalidade/funcionalidade.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { DeletarComponent } from './deletar/deletar.component';


export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'home', component: HomeComponent},
    {path: 'sobrenos', component: SobreNosComponent},
    {path: 'funcionalidade', component: FuncionalidadeComponent},
    {path: 'atualizar', component: AtualizarComponent},
    {path: 'deletar', component: DeletarComponent},
];  
