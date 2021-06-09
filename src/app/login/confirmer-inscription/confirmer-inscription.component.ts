import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmer-inscription',
  templateUrl: './confirmer-inscription.component.html',
  styleUrls: ['./confirmer-inscription.component.sass']
})
export class ConfirmerInscriptionComponent implements OnInit {

  constructor(private route: Router,) { 
    setInterval(() => {
      this.route.navigate(["login"]);
    }, 2700);
  }

  ngOnInit(): void {
  }

}
