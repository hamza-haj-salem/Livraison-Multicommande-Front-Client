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
  listeLigneCommandeCommandee: any = [];
  ligneCommande3: any = LigneCommande;
  client: Client;
  commande: any = Commande;
  commande3: any = Commande;
  Total:number=0;
  verifierCommande:Boolean=true;
 
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    this.client = this.local.retrieve("client");
  // if(this.client != null){
      this.serv.getCommandeByClient(this.client.id).subscribe(
        (data) => {
          this.commande = data;
          console.log(this.commande.prixTotal);
          if (this.commande.etat != "fini") {
          this.listeLigneCommandeCommandee = this.commande.ligneCommande;
          this.Total=this.commande.prixTotal;
          }else{
            this.listeLigneCommandeCommandee =null;
            this.verifierCommande=false;
          }
        }, (err) => { }
      )
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
    l.quantite += 1;
    
    l.prixParQuantite = l.produit.prix * l.quantite;
  }
  retireQuantite(l) {
    if (l.quantite >= 1) {
      l.quantite = l.quantite - 1;
      l.prixParQuantite = l.produit.prix * l.quantite;
    } else {
      l.quantite = 0;
    }

  }
  mettreAJourCommande() {
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

  }
  supprimerLigneCommande(l) {
    this.serv.supprimerLigneCommande(l).subscribe(
      (data) => { }, (err) => { console.log(err) }
    )
  }


}
