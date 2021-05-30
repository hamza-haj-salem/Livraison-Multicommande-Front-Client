import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';

@Component({
  selector: 'app-liste-produits-par-filtre',
  templateUrl: './liste-produits-par-filtre.component.html',
  styleUrls: ['./liste-produits-par-filtre.component.sass']
})
export class ListeProduitsParFiltreComponent implements OnInit {
  listeProduitsParFiltre: any = [];
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
   
    setInterval(() => {
      this.listeProduitsParFiltre = this.local.retrieve("listeProduitsParSousCat"); 
    }, 2000);
    setInterval(() => {
      this.listeProduitsParFiltre = this.local.retrieve("listeProduitsParPrix");
    }, 2000);
    setInterval(() => {
      this.listeProduitsParFiltre = this.local.retrieve("listeProduitsParNature");
      
    }, 2000);
    setInterval(() => {
      this.listeProduitsParFiltre = this.local.retrieve("listeProduitsParTitre");
      
    }, 2000);
    
  }


  ngOnInit(): void {
  }

}
