import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.sass']
})
export class LoginClientComponent implements OnInit {
  email: string = "";
  motDePasse: string = "";
  client: any = Client;
  nvClient = new Client;
  msgErr = "";
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {

  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.email + "&&" + this.motDePasse);
    this.serv.findClientByEmail(this.email).subscribe(
      (data) => {
        this.client = data;
        console.log(this.client);
        if (this.client.id != null) {
          this.local.store("client", this.client);
          this.route.navigate(["/listeProduits"]);
        } else {
          this.route.navigate(["/login"]);
        }
      }, (err) => { console.log(err); }
    )/*
    this.serv.verifierCordonneesClient(this.client).subscribe(
      (data) => {
        this.client2 = data;
        if (this.client2.id != null) {
          this.local.store("client", this.client2);
          this.route.navigate(["/"]);
        } else {
          this.route.navigate(["/login"]);
        }
      }, (err) => {console.log(err);  }
    )*/

  }
  
  register() {
    this.serv.findClientByEmail(this.nvClient.email).subscribe(
      (data) => {
        this.client = data;
        if (this.client.id == null) {
          this.nvClient.libelle = "fidéle";
          this.serv.ajouterClient(this.nvClient).subscribe(
            (data) => {
              if (this.nvClient.email == "" || this.nvClient.motDePasse == "" || this.nvClient.nom == "" || this.nvClient.prenom == "") {
                this.msgErr="Remplir Tous les Champs";}
                else  {
                this.local.store("client", this.nvClient);
                this.route.navigate(["listeProduits"]);
              }
            }, (err) => { }
          )
        } else {
          this.msgErr = "Ce Client Existe"
        }
      }, (err) => { console.log(err); }
    )


  }


}
