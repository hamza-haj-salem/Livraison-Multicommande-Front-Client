import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.sass']
})
export class LoginClientComponent implements OnInit {
  commande = new Commande;

  email: string = "";
  motDePasse: string = "";
  client: any = Client;
  nvClient: Client;
  msgErr = "";

  selectedImage: any = null;
  formTemplate = new FormGroup({
    email: new FormControl('', Validators.required),
    motDePasse: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    numTelephone: new FormControl('', Validators.required),


  })
  imgSrc: string;
  isSubmitted: boolean;
  image: any;

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = 'assets/images/inconnu.jpg';
      this.selectedImage = null;
    }
  }
  task: AngularFireUploadTask;
  progressValue: Observable<number>;
  downloadableURL: '';

  async onSubmit(formValue) {
    this.isSubmitted = true;
    var filePath = `photoProfilClient/${this.selectedImage.name}`;
    console.log(filePath);
    this.task = this.storage.upload(filePath, this.selectedImage);
    this.progressValue = this.task.percentageChanges();
    (await this.task).ref.getDownloadURL().then(url => {
      this.downloadableURL = url;
      console.log(this.downloadableURL);


      // à la place de la fct register()
      console.log(this.nvClient);
      this.nvClient = Object.assign({}, this.formTemplate.value);
      this.nvClient.imageUrl = this.downloadableURL;
      this.serv.findClientByEmail(this.nvClient.email).subscribe(
        (data) => {
          this.client = data;
          if (this.client.id == null) {
            this.nvClient.libelle = "fidéle";
            this.local.store("client", this.nvClient);
            this.commande.client = this.nvClient;
            this.commande.adresseLivraison = this.nvClient.adresse;
            console.log(this.commande);
            //kif nsajel l cmd nsajel m3aha l client nouvellement inscrit
            // ml back
            this.serv.creerCommande(this.commande).subscribe(
              (data) => { }, (err) => { }
            )
           
          this.route.navigate(["confirmerInscription"]);
            /*
            this.serv.ajouterClient(this.nvClient).subscribe(
              (data) => {
                if (this.nvClient.email == "" || this.nvClient.motDePasse == "" || this.nvClient.nom == "" || this.nvClient.prenom == "") {
                  this.msgErr = "Remplir Tous les Champs";
                }
                else {
                  
                }
              }, (err) => { }
            )*/
          } else {
            this.msgErr = "Ce Client Existe"
          }
        }, (err) => { console.log(err); }
      )



    })
  }
  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      email: '',
      motDePasse: '',
      nom: '',
      prenom: '',
      imageUrl: '',


    });
    this.imgSrc = 'assets/images/inconnu.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,
    private storage: AngularFireStorage,) {

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
          this.route.navigate(["listeProduits"]);
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




}


