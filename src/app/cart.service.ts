import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface userToken {
  token: string
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL: string = "https://ecommerce.routemisr.com";
  userHeader: any = { token: localStorage.getItem("userToken") };
  cartNum:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) { }
  addProductToCartAPI(pId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/cart`, { productId: pId })
  }
  updateCartProQuaAPI(pId: string, pCount: string): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${pId}`, { count: pCount })
  }
  getAllProductCartAPI(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/cart`)
  }
  removeSpecItemAPI(pId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${pId}`)
  }
  clearAllCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart`)
  }
}
