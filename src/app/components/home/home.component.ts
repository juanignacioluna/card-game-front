import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { ChangeDetectorRef } from '@angular/core';
import $ from 'jquery';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {



      if(params['id']=="gameOverTurnos"){
        alert("GAME OVER: TE HAS QUEDADO SIN TURNOS");
      }

      if(params['id']=="gameOverKill"){
        alert("GAME OVER: TU ENEMIGO TE HA ELIMINADO");
      }

      if(params['id']=="gameOverWin"){
        alert("FELICITACIONES: HAS GANADO!!!");
      }






    });

  }

  jugar(event){


    // alert($("input").val());



    let name = document.getElementById("name") as HTMLInputElement ;
    
    
    this.router.navigate(['/jugar', name.value]);



  }


}