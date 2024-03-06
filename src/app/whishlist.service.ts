import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  baseURL: string = "https://ecommerce.routemisr.com";
  wishNum:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) { }
  addProductToWlAPI(pId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/wishlist`, { productId: pId })
  }
  removeProduvtFromWlAPI(pId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}/api/v1/wishlist/${pId}`)
  }
  getProductsWlAPI():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/wishlist`)
  }
}
