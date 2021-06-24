import { Component, OnInit } from '@angular/core';
import { LMClientService } from 'src/app/lmclient.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Produit } from 'src/app/model/produit';
import { Commande } from 'src/app/model/commande';
import { LigneCommande } from 'src/app/model/ligne-commande';
@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.sass']
})
export class DetailsProduitsComponent implements OnInit {
  produit: any = Produit;
  qte: number = 0;




  listeCommentaires: any = [];

  commandeSess = new Commande();
  listeLigneCommandeSess: any = [];
  produitExisteCarte: boolean;
  client: any;

  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    this.client = this.local.retrieve("client");
    this.produit = this.local.retrieve("produit");
    console.log(this.produit)




  }

  ngOnInit(): void {
  }

  ajouterAuCommande(produit) {
    this.commandeSess = this.local.retrieve("commande2Liste1");
    console.log(this.commandeSess);
    if (this.commandeSess != null) {
      const ligneCommandeSess2 = new LigneCommande;
      ligneCommandeSess2.produit = produit;

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

        this.listeLigneCommandeSess.push(ligneCommandeSess2);
        this.listeLigneCommandeSess = this.commandeSess.ligneCommande;
        this.commandeSess.ligneCommande = this.listeLigneCommandeSess;

        ligneCommandeSess2.prixParQuantite = produit.prix;
        ligneCommandeSess2.quantite = 1;
        this.commandeSess.dateLivraison = new Date();
        this.commandeSess.etat = "en attente de confirmation";
        if (this.client != null) {
          this.commandeSess.client = this.client;
          this.commandeSess.adresseLivraison = this.client.adresse;
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
        commandeSess2.client = this.client;
        commandeSess2.adresseLivraison = this.client.adresse;
      } else {
        commandeSess2.client = null;
        commandeSess2.adresseLivraison = null;
      }
      commandeSess2.prixTotal = produit.prix;
      this.local.store("commande2Liste1", commandeSess2);




    }



  }

  ajoutQuantite() {
    this.qte = this.qte + 1;
  }
  retireQuantite() {

    if (this.qte >= 1) {
      this.qte = this.qte - 1;

    } else {
      this.qte = 0;
    }
  }
  listeCommentaireProduit() {
    this.serv.listeCommentaireProduit(this.produit.idProduit).subscribe(
      (data) => {
        this.listeCommentaires = data;
        console.log(this.listeCommentaires);
      }, (err) => { }
    )
  }
}
