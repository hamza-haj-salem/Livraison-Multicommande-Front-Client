import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';
import { Produit } from 'src/app/model/produit';
import { CommenterProduit } from 'src/app/model/commenter-produit'


@Component({
  selector: 'app-commenter-produit',
  templateUrl: './commenter-produit.component.html',
  styleUrls: ['./commenter-produit.component.sass']
})
export class CommenterProduitComponent implements OnInit {
  listeLigneCommandeCommandee: any = [];
  client: Client;
  commande: any = Commande;
  toggle: boolean = false;
  produit: Produit;
  avisEtoile: number = 0;

  categorie2: any = { id: null, titre: "" };
  sousCategorie2: any = { id: null, titre: "", categorie: this.categorie2 };
  produit2: any = { idProduit: null, titre: "", description: "", imageUrl: "", nature: "", sousCategorie: this.sousCategorie2, prix: null, stock: null };
  client2: any = { id: null, nom: "", prenom: "", email: "", mot_de_passe: "", libelle: "", adresse: "", image_id: null, };

  ajoutCommenter: any = { id: null, titre: "", client: this.client2, produit: this.produit2, nbrEtoile: null };
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    this.client = this.local.retrieve("client");
    this.client2 = this.local.retrieve("client");
    this.serv.getCommandeByClient(this.client.id).subscribe(
      (data) => {
        this.commande = data;
        console.log(this.commande.prixTotal);
        this.listeLigneCommandeCommandee = this.commande.ligneCommande;
      }, (err) => { }
    )
  }

  ngOnInit(): void {
  }

  afficherFormCommenter(produit) {
    this.produit = produit;
    console.log(this.produit);
    this.toggle = true;
  }
  nbrEtoile5() {
    this.avisEtoile = 5
    console.log(this.avisEtoile);
    this.ajoutCommenter.nbrEtoile = 5;
  }
  nbrEtoile4() {
    this.avisEtoile = 4
    console.log(this.avisEtoile);
    this.ajoutCommenter.nbrEtoile = 4;
  }
  nbrEtoile3() {
    this.avisEtoile = 3
    console.log(this.avisEtoile);
    this.ajoutCommenter.nbrEtoile = 3;
  }
  nbrEtoile2() {
    this.avisEtoile = 2
    console.log(this.avisEtoile);
    this.ajoutCommenter.nbrEtoile = 2;
  }
  nbrEtoile1() {
    this.avisEtoile = 1
    console.log(this.avisEtoile);
    this.ajoutCommenter.nbrEtoile = 1;
  }
  commenter() {
    this.ajoutCommenter.client = this.client;
    this.ajoutCommenter.produit = this.produit;
    console.log(this.ajoutCommenter);
    this.serv.ajouterCommenter(this.ajoutCommenter).subscribe(
      (data) => { }, (err) => { }
    )
    this.route.navigate(["/listeProduits"]);
  }

}
