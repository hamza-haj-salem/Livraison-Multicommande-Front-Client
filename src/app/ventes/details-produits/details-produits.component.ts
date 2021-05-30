import { Component, OnInit } from '@angular/core';
import { LMClientService } from 'src/app/lmclient.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Produit } from 'src/app/model/produit';
import { Commande } from 'src/app/model/commande';
@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produits.component.html',
  styleUrls: ['./details-produits.component.sass']
})
export class DetailsProduitsComponent implements OnInit {
  produit: any = Produit;
  qte: number = 0;
  

  categorie2: any = { id: null, titre: "" };
  sousCategorie2: any = { id: null, titre: "", categorie: this.categorie2 };
  produit2: any = { idProduit: null, titre: "", description: "", imageUrl: "", nature: "", sousCategorie: this.sousCategorie2, prix: null, stock: null };
  ligneCommande2 = { idLigneCommande: null, produit: this.produit2, commande: null, quantite: 1, prixParQuantite: null }
  listeLigneCommande2: any = [this.ligneCommande2];
  client2: any = { id: null, nom: "", prenom: "", email: "", mot_de_passe: "", libelle: "", adresse: "", image_id: null, };
  commande2: any = { idCommande: null, ligneCommande: this.listeLigneCommande2, client: this.client2, adresseLivraison: "" };
  commande3: any = Commande;

  listeCommentaires: any = [];

  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    this.client2 = this.local.retrieve("client");
    this.produit = this.local.retrieve("produit");
    console.log(this.produit)

    

    
  }

  ngOnInit(): void {
  }
  ajouterAuCommande(produit) {
    
    this.commande2.client = this.client2;
    this.commande2.adresseLivraison = this.client2.adresse;
    this.commande2.dateLivraison = Date.now();
    this.ligneCommande2.produit = produit;
    this.ligneCommande2.quantite = this.qte
    this.ligneCommande2.prixParQuantite = this.qte*produit.prix;
    this.commande2.etat = "en attente";
    this.local.store("ligneCommande2", this.ligneCommande2);
    this.serv.getCommandeByClient(this.client2.id).subscribe(
      (data) => {
        this.commande3 = data;
        this.commande2.idCommande = this.commande3.idCommande;
        this.local.store("idCommande", this.commande2.idCommande);
        console.log(this.commande2);
        this.local.store("commande2", this.commande2);
        this.serv.ajouterCommande(this.commande2).subscribe(
          (data) => {
            //this.route.navigate(["/cart"]);
          }, (err) => { console.log(err) }
        )
      }, (err) => { }
    )

  }

  ajoutQuantite() {
    this.qte = this.qte + 1;
  }
  retireQuantite() {
    
    if (this.qte >= 1) {
      this.qte = this.qte - 1;
      
    } else {
      this.qte = 0;
    }
  }
  listeCommentaireProduit(){
    this.serv.listeCommentaireProduit(this.produit.idProduit).subscribe(
      (data)=>{
        this.listeCommentaires=data;
        console.log(this.listeCommentaires);
      },(err)=>{}
    )
  }
}
