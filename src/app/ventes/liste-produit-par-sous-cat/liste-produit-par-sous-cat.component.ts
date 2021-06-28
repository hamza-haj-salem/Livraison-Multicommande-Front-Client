import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';

@Component({
  selector: 'app-liste-produit-par-sous-cat',
  templateUrl: './liste-produit-par-sous-cat.component.html',
  styleUrls: ['./liste-produit-par-sous-cat.component.sass']
})
export class ListeProduitParSousCatComponent implements OnInit {
  listeProduits: any = [];
  listeSousCategories: any = [];
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) { 
      
      setInterval(() => {
        this.listeProduits = this.local.retrieve("listeProduitsParSousCat");
      }, 2000); 

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
