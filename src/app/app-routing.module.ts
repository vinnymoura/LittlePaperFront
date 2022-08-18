import { EntrarComponent } from './pages/Entrar/entrar.component';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './pages/home/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: HomepageComponent }, //Landing Page
  { path: "entrar", component: EntrarComponent } //Tela de login e cadastro
 ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
