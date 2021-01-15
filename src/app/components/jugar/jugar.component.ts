import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { ChangeDetectorRef } from '@angular/core';
import $ from 'jquery';


@Component({
    selector: 'app-jugar',
    templateUrl: './jugar.component.html',
    styleUrls: ['./jugar.component.less']
})
export class JugarComponent implements OnInit {

  cardSelectNAME;

  cardSelectNUMBER;

  info;

  user;

  playerName;

  playerHP;

  playerShield

  enemyHP;

  enemyShield;

  turns;

  turnsQuedan;

  cardSalud;

  cardAtaque;

  cardShield;


  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) {
  
  
  }




  select(event){

    this.cardSelectNAME = event.target.attributes.id.nodeValue;

    this.cardSelectNUMBER = event.target.attributes.name.nodeValue;

    this.cardStyle();

    $('.' + this.cardSelectNAME).attr('style','color: white; background: black;');


  }


  cardStyle(){

    $('.card').attr('style','background: #959595; color:black;');

  }


  final(){

    if(this.info['game']){


      if(this.info['game']=="GAME OVER: TE HAS QUEDADO SIN TURNOS"){

        this.router.navigate(['../../home', "gameOverTurnos"]);


      }

      if(this.info['game']=="GAME OVER: TU ENEMIGO TE HA ELIMINADO"){

        this.router.navigate(['../../home', "gameOverKill"]);

        
      }

      if(this.info['game']=="FELICITACIONES: HAS GANADO!!!"){

        this.router.navigate(['../../home', "gameOverWin"]);

        
      }


    }

  }


  get(res9){

    if(res9[0])
    {
      this.info = res9[0]
    }else{
      this.info = res9
    }

  }

  finalizarTurno(event){


      const data = { cardSelectNAME: this.cardSelectNAME, cardSelectNUMBER: this.cardSelectNUMBER };

      fetch('https://card-game-back.herokuapp.com/api/cardgames/'+ this.playerName, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response =>
        response.json().then(info => this.get(info) )
      )
      .then(res4 => this.updateVars(this.info))
      .then(res5 => this.cardStyle())
      .then(res6 => console.log(this.info))
      .then(res7 => this.final())


  }

  updateVars(vars){


    this.playerName = vars['playerName'];

    this.playerHP = vars['playerHP'];

    this.playerShield = vars['playerShield'];

    this.enemyHP = vars['enemyHP'];

    this.enemyShield = vars['enemyShield'];

    this.turns = vars['turns'];

    this.cardSalud = vars['cardSalud'];

    this.cardAtaque = vars['cardAtaque'];

    this.cardShield = vars['cardShield'];

    this.turnsQuedan = (20 - this.turns);


  }


  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {

      this.user = params['id'];

      if(this.user==""){
        this.router.navigate(['/home']);
      }

      const data = { user: this.user };

      fetch('https://card-game-back.herokuapp.com/api/cardgames', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response =>
        response.json().then(info => this.get(info) )
      )
      .then(res2 => console.log(this.info))
      .then(res3 => console.log(this.info['cardAtaque']))
      .then(res4 => this.updateVars(this.info))


    });

  }


}