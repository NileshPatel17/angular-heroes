import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoadingStatusService } from './loading-status.service';
 
@Injectable()
export class UserAuthenticationService implements CanActivate {

  static loggedIn=false;

  constructor(private router:Router, private loadingStatusService:LoadingStatusService) { }

  canActivate(): boolean{
    if(UserAuthenticationService.loggedIn){
      this.loadingStatusService.stopLoading();
      return true;
    } else{
      this.router.navigate(['login']);
      return false;
    }
  }
}
