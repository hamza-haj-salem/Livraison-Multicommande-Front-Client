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
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    setInterval(() => {
      this.listeProduitsParTitre = this.local.retrieve("listeProduitsParTitre");
    }, 2000);
   }

  ngOnInit(): void {
  }

}
