import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';

@Component({
  selector: 'app-confirmer-commande',
  templateUrl: './confirmer-commande.component.html',
  styleUrls: ['./confirmer-commande.component.sass']
})
export class ConfirmerCommandeComponent implements OnInit {
  client: Client;
  commande: any = Commande;
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
   
    this.client = this.local.retrieve("client");

    this.serv.getCommandeByClient(this.client.id).subscribe(
      (data) => {
        this.commande = data;
        this.commande.etat="fini";
        this.serv.modifierCommande(this.commande).subscribe(
          (data) => {
            setInterval(() => {
              this.route.navigate(["listeProduits"]);
            }, 2700);
        
          }, (err) => { console.log(err) }
        )
      }, (err) => { }
    )

  }

  ngOnInit(): void {
  }

}
