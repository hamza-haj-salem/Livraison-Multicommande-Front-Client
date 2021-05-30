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
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) { 
      
      setInterval(() => {
        this.listeProduits = this.local.retrieve("listeProduitsParSousCat");
      }, 2000); 
     
    }

  ngOnInit(): void {
  }

}
