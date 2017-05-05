import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import {Hero} from '../../models/index';
import {HeroService} from '../../providers/index';


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes:Hero[];
  selectedHero:Hero;

  constructor(
    private heroService:HeroService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes():void{
    this.heroService.getHeroes()
      .then(heroes=>this.heroes=heroes);
  }

  add(name:string):void{
    name=name.trim();
    if(!name){return;}
    this.heroService.create(name)
      .then(hero=>{
        this.heroes.push(hero);
        this.selectedHero=null;
      });
  }

  delete(hero:Hero): void{
    this.heroService
      .delete(hero.id)
      .then(()=>{
        this.heroes=this.heroes.filter(h=>h.id!==hero.id);
        if(this.selectedHero===hero){this.selectedHero=null;}
      });
  }

  onSelect(hero:Hero):void{
    this.selectedHero=hero;
    
  }

  gotoDetail():void{
    this.router.navigate(['/details',this.selectedHero.id]);
  }
}
