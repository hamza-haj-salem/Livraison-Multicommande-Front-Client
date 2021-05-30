import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientModule } from '@angular/common/http';
import { LayoutsComponent } from './layouts/layouts.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ListeProduitsComponent } from './ventes/liste-produits/liste-produits.component';
import { CartComponent } from './carts/cart/cart.component';
import { LoginClientComponent } from './login/login-client/login-client.component';
import { HomeComponent } from './home/home/home.component';
import { DetailsProduitsComponent } from './ventes/details-produits/details-produits.component';
import { CommenterProduitComponent } from './ventes/commenter-produit/commenter-produit.component';
import { ConfirmerCommandeComponent } from './ventes/confirmer-commande/confirmer-commande.component';
import { ProfilComponent } from './login/profil/profil.component';
import { ListeProduitParSousCatComponent } from './ventes/liste-produit-par-sous-cat/liste-produit-par-sous-cat.component';
import { AideComponent } from './pages/aide/aide.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AProposComponent } from './pages/a-propos/a-propos.component';
import { ListeProduitsBarreLateraleComponent } from './ventes/liste-produits-barre-laterale/liste-produits-barre-laterale.component';
import { ListeProduitsParFiltreComponent } from './ventes/liste-produits-par-filtre/liste-produits-par-filtre.component';
import { ListeProduitsParPrixComponent } from './ventes/liste-produits-par-prix/liste-produits-par-prix.component';
import { ListeProduitsParTitreComponent } from './ventes/liste-produits-par-titre/liste-produits-par-titre.component';
import { ListeProduitsParNatureComponent } from './ventes/liste-produits-par-nature/liste-produits-par-nature.component';
import { VerifierCommandeComponent } from './carts/verifier-commande/verifier-commande.component';
import { MessagesComponent } from './login/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    NavbarComponent,
    FooterComponent,
    ListeProduitsComponent,
    CartComponent,
    LoginClientComponent,
    HomeComponent,
    DetailsProduitsComponent,
    CommenterProduitComponent,
    ConfirmerCommandeComponent,
    ProfilComponent,
    ListeProduitParSousCatComponent,
    AideComponent,
    ContactComponent,
    AProposComponent,
    ListeProduitsBarreLateraleComponent,
    ListeProduitsParFiltreComponent,
    ListeProduitsParPrixComponent,
    ListeProduitsParTitreComponent,
    ListeProduitsParNatureComponent,
    VerifierCommandeComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxWebstorageModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
