import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.sass']
})
export class ProfilComponent implements OnInit {
  client: Client;
  clientModifiee=new Client;
  afficherEditProfil:boolean=false;
  Total: number = 0;
  commande: any = Commande;
  listeLigneCommandeCommandee: any = [];

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
    }

  ngOnInit(): void {
  }

  editProfil(){
    this.afficherEditProfil=!this.afficherEditProfil;
  }

  modifierClient(clientModifiee){
    this.clientModifiee.id=this.client.id;
    this.clientModifiee.libelle=this.client.libelle;  
    this.clientModifiee.motDePasse=this.client.motDePasse;
    console.log(this.clientModifiee);
    this.serv.ajouterClient(this.clientModifiee).subscribe(
      (data)=>{
        this.route.navigate(["/login"]);
      },(err)=>{}
    )
  }

}
