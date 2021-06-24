import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { Produit } from 'src/app/model/produit';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  ligneCommande3: any = LigneCommande;
  client: Client;

  commande = new Commande();
  listeLigneCommandeCommandee: any = [];


  commande3: any = Commande;
  Total: number = 0;
  verifierCommande: Boolean = true;

  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    this.client = this.local.retrieve("client");
    // if(this.client != null){
    /*
      this.serv.getCommandeByClient(this.client.id).subscribe(
        (data) => {
          this.commande = data;
          console.log(this.commande.prixTotal);
          if (this.commande.etat == "en attente de confirmation") {
          this.listeLigneCommandeCommandee = this.commande.ligneCommande;
          this.Total=this.commande.prixTotal;
          }else{
            this.listeLigneCommandeCommandee =null;
            this.verifierCommande=false;
          }
        }, (err) => { }
      )
      */

    this.commande = this.local.retrieve("commande2Liste1");
    this.local.clear("commande2Liste1");
    console.log(this.commande);
    if (this.commande.etat == "en attente de confirmation") {
      this.listeLigneCommandeCommandee = this.commande.ligneCommande;
      console.log(this.listeLigneCommandeCommandee);
      this.Total = this.commande.prixTotal;
    } else {
      this.listeLigneCommandeCommandee = null;
      this.verifierCommande = false;
    }
    this.local.store("commande2Liste1", this.commande);

    // }
    /*else{
      this.commande = this.local.retrieve("commandeSansClient");
      this.listeLigneCommandeCommandee = this.commande.ligneCommande;
      this.Total=this.commande.prixTotal;
    }*/

  }


  ngOnInit(): void {
  }
  ajoutQuantite(l) {
    this.Total = 0
    l.quantite += 1;
    l.prixParQuantite = l.produit.prix * l.quantite;
    this.listeLigneCommandeCommandee.forEach(ligneCommande => {
      ligneCommande.prixParQuantie = ligneCommande.quantite * ligneCommande.produit.prix;
      this.Total = this.Total + ligneCommande.prixParQuantie;
    });
    this.commande.ligneCommande = this.listeLigneCommandeCommandee;
    this.commande.prixTotal = this.Total;


  }
  retireQuantite(l) {
    if (l.quantite >= 1) {
      l.quantite = l.quantite - 1;
      l.prixParQuantite = l.produit.prix * l.quantite;
    } else {
      l.quantite = 1;
      this.listeLigneCommandeCommandee.pop(l);
    }
    l.prixParQuantie = l.quantite * l.produit.prix;
    this.Total = this.Total - l.produit.prix;
    this.commande.prixTotal = this.Total;
    this.commande.ligneCommande = this.listeLigneCommandeCommandee;



  }
  mettreAJourCommande() {
    /*
    this.commande3 = this.local.retrieve("commande2");
    console.log(this.commande3);
    this.commande3.ligneCommande = this.listeLigneCommandeCommandee;
    console.log(this.commande3);
    this.serv.ajouterQuantiteLigneCommande(this.commande3).subscribe(
      (data) => { }, (err) => { }
    )
   
    this.serv.getCommandeByClient(this.client.id).subscribe(
      (data) => {
        this.commande = data;
        console.log(this.commande.prixTotal);
      }, (err) => { }
    )
    */
    this.local.clear("commande2Liste1");
    this.local.store("commande2Liste1", this.commande);
    this.commande = this.local.retrieve("commande2Liste1");
    alert("Votre Carte à eete mise à jour !!");
   


  }

  supprimerLigneCommande(ligneCommande) {
    this.listeLigneCommandeCommandee.pop(ligneCommande);
    this.commande.ligneCommande = this.listeLigneCommandeCommandee;
    this.Total = this.Total - ligneCommande.produit.prix * ligneCommande.quantite;
    this.commande.prixTotal = this.Total;
    this.local.clear("commande2Liste1");
    this.local.store("commande2Liste1", this.commande);
    this.commande = this.local.retrieve("commande2Liste1");
    alert("Produit Supprimé !!");

  }


}
