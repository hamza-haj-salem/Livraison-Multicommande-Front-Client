import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';

@Component({
  selector: 'app-liste-produits-par-titre',
  templateUrl: './liste-produits-par-titre.component.html',
  styleUrls: ['./liste-produits-par-titre.component.sass']
})
export class ListeProduitsParTitreComponent implements OnInit {
  listeProduitsParTitre: any = [];
  listeProduits: any = [];
  listeSousCategories: any = [];
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    setInterval(() => {
      this.listeProduitsParTitre = this.local.retrieve("listeProduitsParTitre");
    }, 2000);

    this.serv.getListeProduits().subscribe(
      (data) => {
        this.listeProduits = data;
        console.log(this.listeProduits);
      }, (err) => { }
    )
    this.serv.getListeSousCategories().subscribe(
      (data) => {
        this.listeSousCategories = data;
      }, (err) => { }
    )
   }

  ngOnInit(): void {
  }
  filtrerParSousCategorie(titreSousCat) {
    this.listeProduits = null;
    this.serv.ListProduitByTitreSousCategorie(titreSousCat).subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParSousCat", this.listeProduits);
        this.route.navigate(["listeProduitsParSousCat"]);
      }, (err) => { console.log(err) }
    )
  }
  filtrerParTitre(titreProd) {
    this.serv.ListProduitByTitre(titreProd).subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParTitre", this.listeProduits);
        this.route.navigate(["listeProduitsParTitre"]);
      }, (err) => { console.log(err) }
    )

  }
  filtrerParPrix(pMin, pMax) {
    this.serv.ListProduitByPrix(pMin, pMax).subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParPrix", this.listeProduits);
        this.route.navigate(["listeProduitsParPrix"]);
      }, (err) => { console.log(err) }
    )
  }
  filtrerParNature() {
    this.serv.ListProduitByNature("cassable").subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParNature", this.listeProduits);
        this.route.navigate(["listeProduitsParNature"]);
      }, (err) => { console.log(err) }
    )
  }
  filtrerParNature2() {
    this.serv.ListProduitByNature("non cassable").subscribe(
      (data) => {
        this.listeProduits = data;
        this.local.store("listeProduitsParNature", this.listeProduits);
        this.route.navigate(["listeProduitsParNature"]);
      }, (err) => { console.log(err) }
    )
  }

}
