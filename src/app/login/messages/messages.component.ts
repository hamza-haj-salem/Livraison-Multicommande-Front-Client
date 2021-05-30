import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {
  listeAdmin: any = [];
  listeMessageByUtilisateur: any = []; //selon admin selectionné je veux 
  // récupérer la liste des msg
  client: Client;


  uEnv: any = { id: null, nom: "", prenom: "", image_id: null };
  uRec: any = { id: null, nom: "", prenom: "", image_id: null };
  message: any = { id: null, contenu: "", dateEnvoi: null, uEnv: this.uEnv, uRec: this.uRec };

  idAdminRecMsg: number // cette vbl contien l id de user qui va former 
  //la partie receptrice de msg
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    this.client = this.local.retrieve("client");
    this.serv.listeAdminstrateur().subscribe(
      (data) => {
        this.listeAdmin = data;
        console.log(this.listeAdmin);
      }, (err) => { }
    )
  }

  ngOnInit(): void {
  }               //nest7a9ha k bch nb3athlou msg
  afficherlisteMessage(idAdmin) {

    console.log(this.client.id);
    setInterval(() => {
      //if (this.client != null) {
        this.serv.getListMessageEnvByUtilisateur(idAdmin,this.client.id).subscribe(
          (data) => {
            this.listeMessageByUtilisateur = data;
            this.idAdminRecMsg = idAdmin;
          }, (err) => {

          }
        )
      //}
    }, 500);

  }
  envoyerMessage() {
    this.serv.getUtilisateurById(this.idAdminRecMsg).subscribe(
      (data) => {
        this.uRec = data;
        this.message.uRec = this.uRec;
      }, (err) => { }
    )
    //if (this.client != null) {
      this.serv.getUtilisateurById(this.client.id).subscribe(
        (data) => {
          this.uEnv = data;
          this.message.uEnv = this.uEnv;
        }, (err) => { }
      )
   //}
    this.message.dateEnvoi = Date.now();
    console.log(this.message);
    if (this.message.contenu != "") {
      this.message.sujet = this.message.contenu;
      this.serv.ajouterMessage(this.message).subscribe(
        (data) => { }, (err) => { console.log(err); }
      )
    }

    this.message.contenu = "";
    this.afficherlisteMessage(this.idAdminRecMsg);

  }

}
