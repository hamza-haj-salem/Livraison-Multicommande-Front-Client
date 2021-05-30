import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  listeLigneCommandeCommandee: any = [];
  listeProduitsParSousCat: any = [];

  listeSousCategories: any = [];
  commande: any = Commande;
  client: any = Client;

  clientconnecte:Boolean=false;

  Total:number=0;
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    this.client = this.local.retrieve("client");
    if (this.client != null) {
      this.clientconnecte=true;
      this.serv.getCommandeByClient(this.client.id).subscribe(
        (data) => {
          this.commande = data;
          console.log(this.commande.prixTotal);
          if (this.commande.etat != "fini") {
            this.listeLigneCommandeCommandee = this.commande.ligneCommande;
            this.Total=this.commande.prixTotal;
          } else {
            this.listeLigneCommandeCommandee = null;
          }
        }, (err) => { }
      )
    }
    this.serv.getListeSousCategories().subscribe(
      (data) => {
        this.listeSousCategories = data;
      }, (err) => { }
    )

  }

  ngOnInit(): void {
  }


  deconnexion() {
    this.local.clear("client");
    this.route.navigate(["login"]);
    this.client = this.local.retrieve("client");
    console.log(this.client);
  }

  listeProdBySousCat(titreSousCat) {
    this.serv.ListProduitByTitreSousCategorie(titreSousCat).subscribe(
      (data) => {
        this.listeProduitsParSousCat = data;
        console.log(this.listeProduitsParSousCat);
        this.local.store("listeProduitsParSousCat", this.listeProduitsParSousCat);
        this.route.navigate(["listeProduitsParSousCat"]);
      }, (err) => { console.log(err) }
    )


  }


}
