import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';
import { LigneCommande } from 'src/app/model/ligne-commande';
import { Produit } from 'src/app/model/produit';

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
  chargeTotal: number = 0;

  nvClient: Client;
  msgErr = "";


  produitNvStock: any = Produit;


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
  clientInscrit: any = Client;

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
          this.clientInscrit = data;
          if (this.clientInscrit.id == null) {
            this.nvClient.libelle = "fidéle";
            this.local.store("client", this.nvClient);
            this.commande.client = this.nvClient;
            this.commande.adresseLivraison = this.nvClient.adresse;
            console.log(this.commande);
            this.serv.ajouterClient(this.nvClient).subscribe(
              (data) => { }, (err) => { } )
           alert("INSCRIPTION REUSSITE !! CONFIRMER VOTRE COMMANDE");
        
          } else {
            this.msgErr = "Ce Client Existe";
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
    this.client = this.local.retrieve("client");
    this.commande = this.local.retrieve("commande2Liste1");
    this.Total = this.commande.prixTotal;
    this.listeLigneCommandeCommandee = this.commande.ligneCommande;
    /*
    this.serv.getCommandeByClient(this.client.id).subscribe(
      (data) => {
        this.commande = data;
        console.log(this.commande.prixTotal);
        this.Total = this.commande.prixTotal;
        this.listeLigneCommandeCommandee = this.commande.ligneCommande;

      }, (err) => { }
    )*/

  }

  ngOnInit(): void {
  }

  livraisonExpresse() {
    this.prixLivraison = 6;
    this.commande.methodeLivraison = "livraison expresse";
    this.chargeTotal = this.Total + this.prixLivraison;
    this.commande.chargeLivraison = 6;
    console.log(this.commande);

  }
  livraisonStandard() {
    this.prixLivraison = 0;
    this.chargeTotal = this.commande.prixTotal;
    this.commande.methodeLivraison = "livraison standard";
    this.commande.chargeLivraison = 0;
    console.log(this.commande);


  }
  confirmerCommande() {
    this.commande.prixTotal = this.chargeTotal;
    console.log(this.commande);
    console.log(this.client);
    if (this.client != null) { //si le client n'est pas cnte
      this.commande.etat = "en attente d'affectation";
      console.log(this.commande);
      this.serv.ajouterCommande(this.commande).subscribe(
        (data) => { }, (err) => { console.log(err) }
      )
      this.route.navigate(["confirmerCommande"]);
      this.local.clear("commande2Liste1");
    }

    else {
      alert("VOUS DEVEZ S'INSCRIRE");

    }






  }

}
