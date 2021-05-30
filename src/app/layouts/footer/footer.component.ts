import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LMClientService } from 'src/app/lmclient.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  listeSousCategories: any = [];
  constructor(private serv: LMClientService,
    private local: LocalStorageService,
    private route: Router,) {
      this.serv.getListeSousCategories().subscribe(
        (data) => {
          this.listeSousCategories = data;
        }, (err) => { }
      )
     }

  ngOnInit(): void {
  }

}
