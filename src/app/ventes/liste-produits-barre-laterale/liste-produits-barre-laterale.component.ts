import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';

@Component({
  selector: 'app-liste-produits-barre-laterale',
  templateUrl: './liste-produits-barre-laterale.component.html',
  styleUrls: ['./liste-produits-barre-laterale.component.sass']
})
export class ListeProduitsBarreLateraleComponent implements OnInit {
  listeProduits: any = [];
  categorie2: any = { id: null, titre: "" };
  sousCategorie2: any = { id: null, titre: "", categorie: this.categorie2 };
  produit2: any = { idProduit: null, titre: "", description: "", imageUrl: "", nature: "", sousCategorie: this.sousCategorie2, prix: null, stock: null };
  ligneCommande2 = { idLigneCommande: null, produit: this.produit2, commande: null, quantite: 1, prixParQuantite: null }
  listeLigneCommande2: any = [this.ligneCommande2];
  client2: any = { id: null, nom: "", prenom: "", email: "", mot_de_passe: "", libelle: "", adresse: "", image_id: null, };
  commande2: any = { idCommande: null, ligneCommande: this.listeLigneCommande2, client: this.client2, adresseLivraison: "" };
  commande3: any = Commande;

  listeSousCategories: any = [];
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    this.client2 = this.local.retrieve("client");
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

  filtrerParPrix(pMin, pMax) {
    this.serv.ListProduitByPrix(pMin, pMax).subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParPrix", this.listeProduits);
        this.route.navigate(["listeProduitsParPrix"]);
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

  ajouterAuCommande(produit) {
    this.commande2.client = this.client2;
    this.commande2.adresseLivraison = this.client2.adresse;
    this.commande2.dateLivraison = Date.now();
    this.ligneCommande2.produit = produit;
    this.ligneCommande2.prixParQuantite = produit.prix;
    this.commande2.etat = "en attente";
    this.local.store("ligneCommande2", this.ligneCommande2);
    this.serv.getCommandeByClient(this.client2.id).subscribe(
      (data) => {
        this.commande3 = data;
        this.commande2.idCommande = this.commande3.idCommande;
        this.local.store("idCommande", this.commande2.idCommande);
        console.log(this.commande2);
        this.local.store("commande2", this.commande2);
        this.serv.ajouterCommande(this.commande2).subscribe(
          (data) => {
            this.route.navigate(["/cart"]);
          }, (err) => { console.log(err) }
        )
      }, (err) => { }
    )

  }
  detailsProduit(p) {
    console.log(p);
    this.local.store("produit", p);
    this.route.navigate(["/detailsProduits"]);
  }

}
