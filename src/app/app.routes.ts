import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { TradingServiceService } from './trading-service.service';
import { RegisterComponent } from './register/register.component';
import { authGuardGuard } from './auth-guard.guard';

export const routes: Routes = [
            {
                path : '',
                redirectTo:'dashboard',
                pathMatch:'full'
            },
            {
                path:'login',
                component:LoginComponent

            },
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate:[authGuardGuard]
            },
            {
                path:'register',
                component:RegisterComponent
            },
            {
                path:'holdings',
                component:HoldingsComponent,
                canActivate:[authGuardGuard]
            }, 
            {
                path:'watchlist',
                component:WatchlistComponent,
                canActivate:[authGuardGuard]
            },
            {
                path:'account',
                component:AccountComponent,
                canActivate:[authGuardGuard]
            }

];
