import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TradingServiceService } from './trading-service.service';

export const authGuardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const trading_service = inject(TradingServiceService)
  const router = inject(Router);
  if(trading_service.checkIfLoggedIn()){
    return true
  } else{
    router.navigate(['login']); 
    return false
  }
};
