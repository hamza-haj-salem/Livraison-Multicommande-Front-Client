import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';
import { LigneCommande } from 'src/app/model/ligne-commande';

@Component({
  selector: 'app-verifier-commande',
  templateUrl: './verifier-commande.component.html',
  styleUrls: ['./verifier-commande.component.sass']
})
export class VerifierCommandeComponent implements OnInit {
  listeLigneCommandeCommandee: any = [];

  client: Client;
  commande: any = Commande;
  commande3: any = Commande;
  prixLivraison: number = 0;
  Total: number = 0;
  
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    this.client = this.local.retrieve("client");
    this.serv.getCommandeByClient(this.client.id).subscribe(
      (data) => {
        this.commande = data;
        console.log(this.commande.prixTotal);
        this.Total = this.commande.prixTotal;
        this.listeLigneCommandeCommandee = this.commande.ligneCommande;

      }, (err) => { }
    )
    console.log(this.prixLivraison);
  }

  ngOnInit(): void {
  }

  livraisonExpresse() {
    this.prixLivraison = 6000;
    this.Total = this.commande.prixTotal + this.prixLivraison;
  }
  livraisonStandard() {
    this.prixLivraison = 0;
    this.Total = this.commande.prixTotal;
  }

}
