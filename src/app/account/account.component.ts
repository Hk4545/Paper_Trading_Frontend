import { Component, OnInit } from '@angular/core';
import { TradingServiceService } from '../trading-service.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatTableModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  userData :any = {}
  amount:any = {}
  allStocks:any = {}
  //hello
  displayedColumns: string[] = ['Stock'];
  constructor(private tradingService: TradingServiceService, private router: Router) { }
  async ngOnInit(): Promise<void> {
    let data = await lastValueFrom(this.tradingService.decodeToken(this.tradingService.gettoken()))
    console.log("userdata", data);
    
    this.userData = data
    let res = await lastValueFrom(this.tradingService.getFunds(data?.data?.id))
    console.log("res", res);
    this.amount = res;

    let res1 = await lastValueFrom(this.tradingService.getPastStocks(data?.data?.id))
    console.log("res1", res1);
    this.allStocks = res1

  }
  removeUser() {
    this.tradingService.removeLogin();
    this.router.navigate(['/login']);
  }
}
