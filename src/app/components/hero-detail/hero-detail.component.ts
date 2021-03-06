import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {Hero} from '../../models/index';
import {HeroService} from '../../providers/index';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {
  hero:Hero;

  constructor(
    private heroService:HeroService,
    private route:ActivatedRoute,
    private location:Location
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params:Params)=>this.heroService.getHero(+params['id']))
      .subscribe(hero=>this.hero=hero);
  }

  save():void{
    this.heroService.update(this.hero)
      .then(()=>this.goBack());
  }

  goBack():void{
    this.location.back();
  }

}
