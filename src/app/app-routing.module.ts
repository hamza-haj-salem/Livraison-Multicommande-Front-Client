import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './carts/cart/cart.component';
import { VerifierCommandeComponent } from './carts/verifier-commande/verifier-commande.component';
import { HomeComponent } from './home/home/home.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ConfirmerInscriptionComponent } from './login/confirmer-inscription/confirmer-inscription.component';
import { LoginClientComponent } from './login/login-client/login-client.component';
import { MessagesComponent } from './login/messages/messages.component';
import { ProfilComponent } from './login/profil/profil.component';
import { AProposComponent } from './pages/a-propos/a-propos.component';
import { AideComponent } from './pages/aide/aide.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CommenterProduitComponent } from './ventes/commenter-produit/commenter-produit.component';
import { ConfirmerCommandeComponent } from './ventes/confirmer-commande/confirmer-commande.component';
import { DetailsProduitsComponent } from './ventes/details-produits/details-produits.component';
import { ListeProduitParSousCatComponent } from './ventes/liste-produit-par-sous-cat/liste-produit-par-sous-cat.component';
import { ListeProduitsBarreLateraleComponent } from './ventes/liste-produits-barre-laterale/liste-produits-barre-laterale.component';
import { ListeProduitsParFiltreComponent } from './ventes/liste-produits-par-filtre/liste-produits-par-filtre.component';
import { ListeProduitsParNatureComponent } from './ventes/liste-produits-par-nature/liste-produits-par-nature.component';
import { ListeProduitsParPrixComponent } from './ventes/liste-produits-par-prix/liste-produits-par-prix.component';
import { ListeProduitsParTitreComponent } from './ventes/liste-produits-par-titre/liste-produits-par-titre.component';
import { ListeProduitsComponent } from './ventes/liste-produits/liste-produits.component';

const routes: Routes = [

  {
    path: "", component: LayoutsComponent,
    children: [

      { path: "home", component: HomeComponent },
      { path: "listeProduits", component: ListeProduitsComponent },
      { path: "cart", component: CartComponent },
      { path: "detailsProduits", component: DetailsProduitsComponent },
      { path: "confirmerCommande", component: ConfirmerCommandeComponent },
      { path: "profil", component: ProfilComponent },
      { path: "listeProduitsParSousCat", component: ListeProduitParSousCatComponent },
      { path: "aide", component: AideComponent },
      { path: "contact", component: ContactComponent },
      { path: "aPropos", component: AProposComponent },
      { path: "listeProduitsBarreLaterale", component: ListeProduitsBarreLateraleComponent },
      { path: "listeProduitsParFiltre", component: ListeProduitsParFiltreComponent },
      { path: "listeProduitsParPrix", component: ListeProduitsParPrixComponent },
      { path: "listeProduitsParTitre", component: ListeProduitsParTitreComponent },
      { path: "listeProduitsParNature", component: ListeProduitsParNatureComponent },
      { path: "commenter", component: CommenterProduitComponent },
      { path: "verifierCommande", component: VerifierCommandeComponent },
      { path: "messages", component: MessagesComponent },
      { path: "confirmerInscription", component: ConfirmerInscriptionComponent },

    ]
  },
  { path: "login", component: LoginClientComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
