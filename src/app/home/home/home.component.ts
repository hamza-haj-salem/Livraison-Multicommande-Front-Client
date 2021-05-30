import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  listeProduits: any = [];
  client: any=Client;
  
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) { 
      for (let i = 0; i < 9; i++) {
        
      }
      this.client = this.local.retrieve("client");
      this.serv.getListeProduits().subscribe(
        (data) => {
          this.listeProduits = data;
          console.log(this.listeProduits);
        }, (err) => { }
      )
    }

  ngOnInit(): void {
  }

}
