import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Commande } from 'src/app/model/commande';

@Component({
  selector: 'app-details-commande-fini',
  templateUrl: './details-commande-fini.component.html',
  styleUrls: ['./details-commande-fini.component.sass']
})
export class DetailsCommandeFiniComponent implements OnInit {
  commande: any = Commande;
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) { 
      this.commande = this.local.retrieve("cmdDetails")
      console.log(this.commande)
    }

  ngOnInit(): void {
  }

}
