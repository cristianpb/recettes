import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecettesComponent } from './recettes/recettes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecetteComponent } from './recette/recette.component';

@NgModule({
  declarations: [
    AppComponent,
    RecettesComponent,
    RecetteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
