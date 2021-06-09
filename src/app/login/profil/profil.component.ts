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
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.sass']
})
export class ProfilComponent implements OnInit {
  client: Client;
  clientModifiee = new Client;
  afficherEditProfil: boolean = false;
  Total: number = 0;
  commande: any = Commande;
  listeLigneCommandeCommandee: any = [];



  selectedImage: any = null;
  formTemplate = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    numTelephone: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),



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
      this.imgSrc = "assets/images/inconnu.JPG";
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
      console.log(this.clientModifiee);
      this.clientModifiee = Object.assign({}, this.formTemplate.value);
      this.clientModifiee.imageUrl = this.downloadableURL;
      this.clientModifiee.id = this.client.id;
      this.clientModifiee.libelle = this.client.libelle;
      this.clientModifiee.motDePasse = this.client.motDePasse;
      console.log(this.clientModifiee);
      this.serv.ajouterClient(this.clientModifiee).subscribe(
        (data) => {
          this.route.navigate(["/login"]);
        }, (err) => { }
      )





    })
  }
  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({

      imageUrl: '',
      nom: '',
      prenom: '',
      adresse: '',
      email: '',
      numTelephone: '',


    });
    this.imgSrc = "assets/images/inconnu.JPG";
    this.selectedImage = null;
    this.isSubmitted = false;
  }



  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,
    private storage: AngularFireStorage,) {
    this.resetForm();
    this.client = this.local.retrieve("client");
    console.log(this.client);
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

  editProfil() {
    this.afficherEditProfil = !this.afficherEditProfil;
  }



}
