import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';

@Component({
  selector: 'app-liste-produits-par-prix',
  templateUrl: './liste-produits-par-prix.component.html',
  styleUrls: ['./liste-produits-par-prix.component.sass']
})
export class ListeProduitsParPrixComponent implements OnInit {
  listeProduitsParPrix: any = [];
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) { 
      setInterval(() => {
        this.listeProduitsParPrix = this.local.retrieve("listeProduitsParPrix");
      }, 2000);
    }

  ngOnInit(): void {
  }

}
