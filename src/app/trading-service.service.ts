import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { JwtService } from '@nestjs/jwt';


@Injectable({
  providedIn: 'root'
})
export class TradingServiceService{
  API_key = "UGBXPHIPL52V9IMM";

  constructor(private http:HttpClient) {
    
  }
  createUser(alertData: any) {
    return this.http.post<any>(`https://paper-trade-backend-1.onrender.com/signup`, alertData)
        .pipe(map((res) => {
            return res;
        }));
  }

  decodeToken(token:any): Observable<any | null>{
    let data = {token : token}
    return this.http.post<any>("https://paper-trade-backend-1.onrender.com/login/data", data)
  }

  loginCheck(loginData: any): Observable<string | null>{
    return this.http.post<string>('https://paper-trade-backend-1.onrender.com/login', loginData);
  }

  checkIfLoggedIn(){
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  setlogin(token: any){
    localStorage.setItem('token', token);
  }

  removeLogin(){
    localStorage.setItem('token', '');
  }

  gettoken(){
    return localStorage.getItem('token');
  }

  getWatchlist(): Observable<any>{
    return this.http.get('https://paper-trade-backend-1.onrender.com/stockinfo/symbols')
  }

  getStockDetails(symbol: string): Observable<any>{
    return this.http.get(`https://paper-trade-backend-1.onrender.com/stockinfo/details/:${symbol}`);
  }

  buyStock(stockData: any): Observable<any>{
    return this.http.post('https://paper-trade-backend-1.onrender.com/order', stockData);
  }

  getHoldingStocks(user_id: any): Observable<any>{
    return this.http.get(`https://paper-trade-backend-1.onrender.com/order/:${user_id}`);
  }

  getPastStocks(user_id: any): Observable<any>{
    return this.http.get(`https://paper-trade-backend-1.onrender.com/order/all/:${user_id}`);
  }

  getFunds(userId:any): Observable<any>{
    return this.http.get(`https://paper-trade-backend-1.onrender.com/login/amount/:${userId}`);
  }

  updateFunds(userId:any, amount:any): Observable<any>{
    console.log("updated service", userId, amount);
    let transformedamount = {
      amount: amount
    }
    
    return this.http.put(`https://paper-trade-backend-1.onrender.com/login/amount/:${userId}`, transformedamount);
  }

  sellOrder(stockId:any, ltp:any) : Observable<any> {
    let data = {
      soldPrice: ltp
    }
    return this.http.put(`https://paper-trade-backend-1.onrender.com/order/:${stockId}`, data);
  }
}