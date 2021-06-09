import { Component, OnInit } from '@angular/core';
import { LMClientService } from 'src/app/lmclient.service';
import { provideRoutes, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';
import { Favoris } from 'src/app/model/favoris';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { Produit } from 'src/app/model/produit';
@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.sass']
})
export class ListeProduitsComponent implements OnInit {
  listeProduits: any = [];
  listeSousCategories: any = [];
  /*
   client2:any= Client;
   commande2:any=Commande;
   ligneCommande2:any=LigneCommande;
    */
  categorie2: any = { id: null, titre: "" };
  sousCategorie2: any = { id: null, titre: "", categorie: this.categorie2 };
  produit2: any = { idProduit: null, titre: "", description: "", imageUrl: "", nature: "", sousCategorie: this.sousCategorie2, prix: null, stock: null };
  ligneCommande2 = { idLigneCommande: null, produit: this.produit2, commande: null, quantite: 1, prixParQuantite: null }
  listeLigneCommande2: any = [this.ligneCommande2];
  client2: any = { nom: "", prenom: "", email: "", mot_de_passe: "", libelle: "", adresse: "", image_id: null, };
  commande2: any = { idCommande: null, ligneCommande: this.listeLigneCommande2, client: this.client2, adresseLivraison: "", prixTotal: null };
  commande3: any = Commande;


  produitNvStock: any = Produit;
  client: any;
  // favoris:any=Favoris;

  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {

    this.client = this.local.retrieve("client");
    console.log(this.client);
    this.serv.findClientByEmail(this.client.email).subscribe(
      (data) => {this.client2 = data;},(err)=>{})
    console.log(this.client2);
    this.serv.getListeProduits().subscribe(
      (data) => {
        this.listeProduits = data;
        console.log(this.listeProduits);
      }, (err) => { }
    )
    this.serv.getListeSousCategories().subscribe(
      (data) => {
        this.listeSousCategories = data;
      }, (err) => { }
    )

  }

  ngOnInit(): void {
  }

  ajouterAuCommande(produit) {
    this.commande2.client = this.client2;
    if (this.client2 != null) {
      this.commande2.adresseLivraison = this.client2.adresse;
    } else {
      this.commande2.adresseLivraison = null;
    }
    this.commande2.dateLivraison = Date.now();
    this.ligneCommande2.produit = produit;
    this.ligneCommande2.prixParQuantite = produit.prix;
    this.commande2.etat = "en attente de confirmation";
    this.local.store("ligneCommande2", this.ligneCommande2);
    if (this.client2 != null) { //si le client n'est pas cnte
      this.serv.getCommandeByClient(this.client2.id).subscribe(
        (data) => {
          this.commande3 = data;
          this.commande2.idCommande = this.commande3.idCommande;
          this.commande2.prixTotal = this.commande3.prixTotal + this.ligneCommande2.prixParQuantite
          this.local.store("idCommande", this.commande2.idCommande);
          console.log(this.commande2);
          this.local.store("commande2", this.commande2);
          this.serv.ajouterCommande(this.commande2).subscribe(
            (data) => {
              
              this.route.navigate(["/cart"]);
              this.produitNvStock = produit;
              this.produitNvStock.stock = this.produitNvStock.stock - 1
              console.log(this.produitNvStock);
              this.serv.addProduit(this.produitNvStock).subscribe(
                (data) => { }, (err) => { }
              )
              //this.serv.ajouterCmdFb(this.commande2);
            }, (err) => { console.log(err) }
          )
        }, (err) => { }
      )
    }
    
    else{
       this.route.navigate(["/login"]);
    }

  }

  ajouterAuFavoris(produit) {
    this.serv.ajouterFavoris(this.client2.id, produit).subscribe(
      (data) => { }, (err) => { console.log(err); }
    )
  }
  detailsProduit(p) {
    console.log(p);
    this.local.store("produit", p);
    this.route.navigate(["/detailsProduits"]);
  }

  filtrerParSousCategorie(titreSousCat) {
    this.listeProduits = null;
    this.serv.ListProduitByTitreSousCategorie(titreSousCat).subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParSousCat", this.listeProduits);
        this.route.navigate(["listeProduitsParSousCat"]);
      }, (err) => { console.log(err) }
    )
  }
  filtrerParTitre(titreProd) {
    this.serv.ListProduitByTitre(titreProd).subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParTitre", this.listeProduits);
        this.route.navigate(["listeProduitsParTitre"]);
      }, (err) => { console.log(err) }
    )

  }
  filtrerParPrix(pMin, pMax) {
    this.serv.ListProduitByPrix(pMin, pMax).subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParPrix", this.listeProduits);
        this.route.navigate(["listeProduitsParPrix"]);
      }, (err) => { console.log(err) }
    )
  }
  filtrerParNature() {
    this.serv.ListProduitByNature("cassable").subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParNature", this.listeProduits);
        this.route.navigate(["listeProduitsParNature"]);
      }, (err) => { console.log(err) }
    )
  }
  filtrerParNature2() {
    this.serv.ListProduitByNature("non cassable").subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParNature", this.listeProduits);
        this.route.navigate(["listeProduitsParNature"]);
      }, (err) => { console.log(err) }
    )
  }

}
