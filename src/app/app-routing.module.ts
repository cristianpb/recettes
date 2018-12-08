import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecettesComponent } from './recettes/recettes.component';
import { RecetteComponent } from './recette/recette.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: RecettesComponent },
  { path: 'recette/:id', component: RecetteComponent },
  { path: '**', component: RecettesComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
