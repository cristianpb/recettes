import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecettesComponent } from './recettes/recettes.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: RecettesComponent },
  { path: '**', component: RecettesComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
