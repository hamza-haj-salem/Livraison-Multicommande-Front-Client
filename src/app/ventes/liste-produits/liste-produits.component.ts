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


  client2: any = { nom: "", prenom: "", email: "", mot_de_passe: "", libelle: "", adresse: "", image_id: null, };


  commandeSess = new Commande();
  listeLigneCommandeSess: any = [];

  produitNvStock: any = Produit;
  client: any;
  produitExisteCarte: boolean;
  // favoris:any=Favoris;

  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {

    this.client = this.local.retrieve("client");
    console.log(this.client);

    if (this.client != null) {
      this.serv.findClientByEmail(this.client.email).subscribe(
        (data) => { this.client2 = data; }, (err) => { })
      console.log(this.client2);
    }

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
    this.commandeSess = this.local.retrieve("commande2Liste1");
    console.log(this.commandeSess);
    if (this.commandeSess != null) {
      const ligneCommandeSess2 = new LigneCommande;
      ligneCommandeSess2.produit = produit;
      //1
      this.listeLigneCommandeSess.push(ligneCommandeSess2);
      this.listeLigneCommandeSess = this.commandeSess.ligneCommande;
      this.commandeSess.ligneCommande = this.listeLigneCommandeSess;
      for (var i = 0; i < this.commandeSess.ligneCommande.length; i++) {
        if (produit.idProduit === this.commandeSess.ligneCommande[i].produit.idProduit) {
          this.produitExisteCarte = true;
          break;
        } else {
          this.produitExisteCarte = false;
        }
      }
      if (this.produitExisteCarte == false) {
        alert("PRODUIT AJOUTEE DANS VOTRE CARTE AVEC SUCCE PRINCIPAL");

        // 3 ligne hathom lezemhom ykoun m3awdin martin 1 et 2 ( kif n3ml add to carte ml details prod)
        //2
        this.listeLigneCommandeSess.push(ligneCommandeSess2);
        this.listeLigneCommandeSess = this.commandeSess.ligneCommande;
        this.commandeSess.ligneCommande = this.listeLigneCommandeSess;

        ligneCommandeSess2.prixParQuantite = produit.prix;
        ligneCommandeSess2.quantite = 1;
        this.commandeSess.dateLivraison = new Date();
        this.commandeSess.etat = "en attente de confirmation";
        if (this.client != null) {
          this.commandeSess.client = this.client2;
          this.commandeSess.adresseLivraison = this.client2.adresse;
        } else {
          this.commandeSess.client = null;
        }
        this.commandeSess.prixTotal = 0;
        this.commandeSess.ligneCommande.forEach(ligneCommande => {
          this.commandeSess.prixTotal = this.commandeSess.prixTotal + ligneCommande.prixParQuantite;
        });
        console.log(this.commandeSess);
        this.local.store("commande2Liste1", this.commandeSess);

      } else {
        alert("PRODUIT EXISTE DEJA DANS VOTRE CARTE PRINCIPAL");
      }

    } else {
      const commandeSess2 = new Commande;
      const ligneCommandeSess2 = new LigneCommande;
      ligneCommandeSess2.produit = produit;
      alert("PRODUIT AJOUTEE DANS VOTRE CARTE AVEC SUCCE PREM")
      ligneCommandeSess2.prixParQuantite = produit.prix;
      ligneCommandeSess2.quantite = 1;
      this.listeLigneCommandeSess.push(ligneCommandeSess2);
      console.log(this.listeLigneCommandeSess);
      commandeSess2.ligneCommande = this.listeLigneCommandeSess;
      commandeSess2.dateLivraison = new Date();
      commandeSess2.etat = "en attente de confirmation";
      if (this.client != null) {
        commandeSess2.client = this.client2;
        commandeSess2.adresseLivraison = this.client2.adresse;
      } else {
        commandeSess2.client = null;
        commandeSess2.adresseLivraison = null;
      }
      commandeSess2.prixTotal = produit.prix;
      this.local.store("commande2Liste1", commandeSess2);




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
