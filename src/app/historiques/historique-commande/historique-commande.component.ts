import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';

@Component({
  selector: 'app-historique-commande',
  templateUrl: './historique-commande.component.html',
  styleUrls: ['./historique-commande.component.sass']
})
export class HistoriqueCommandeComponent implements OnInit {
  client: Client;
  commande: any = Commande;
  listeCommande: any = [];
  listeLigneCommandeCommandee: any = [];
  Total:number=0;
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
      this.client = this.local.retrieve("client");
      this.serv.listeCommandeFiniParClient(this.client.id).subscribe(
        (data) => {
          this.listeCommande = data;
          console.log(this.commande.prixTotal);
        }, (err) => { }
      )
     }

  ngOnInit(): void {
  }
  DetailsCmd(commande){
    this.local.store("cmdDetails",commande);
    this.route.navigate(["/detailsCommande"]);
  }

}
