import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';

@Component({
  selector: 'app-liste-produits-par-nature',
  templateUrl: './liste-produits-par-nature.component.html',
  styleUrls: ['./liste-produits-par-nature.component.sass']
})
export class ListeProduitsParNatureComponent implements OnInit {
  listeProduitsParNature: any = [];
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
    setInterval(() => {
      this.listeProduitsParNature = this.local.retrieve("listeProduitsParNature");
    }, 2000);
  }

  ngOnInit(): void {
  }

}
