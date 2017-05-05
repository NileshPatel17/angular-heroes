import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingStatusService, UserAuthenticationService } from '../../providers/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router,
    private loadingService:LoadingStatusService
  ) { }

  ngOnInit() {
  }

  login(){
    this.loadingService.startLoading();
    setTimeout(()=>{
      UserAuthenticationService.loggedIn=true;
      this.router.navigate(['dashboard']);
    }, 500);
  }

}
