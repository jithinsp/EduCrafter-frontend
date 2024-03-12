import { Injectable } from '@angular/core';
import { JwtService } from '../auth/jwt.service';
import { HttpClient } from '@angular/common/http';
import { API_FINANCE_SERVICE } from '../../constants/baseurls.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,
    private authService: JwtService) { }

  BASE_URI = API_FINANCE_SERVICE;

    createTransaction(amount: number): Observable<any> {
      return this.http.get(this.BASE_URI + 'finance/payment/pay/'+amount);
    }

    getAll(): Observable<any> {
      return this.http.get(this.BASE_URI + 'finance/payment/getAll');
    }

    getUser(): Observable<any> {
      const username = this.authService.extractUsername();
      return this.http.get(this.BASE_URI + 'finance/payment/get/'+ username);
    }

    pay(username: string, resp: any,data:any): Observable<any> {
      const mergedObject = {
        ...resp,
        ...data,
        username: username
      };
      return this.http.post(this.BASE_URI + 'finance/payment/pay',mergedObject);
    }
}
