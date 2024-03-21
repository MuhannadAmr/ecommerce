import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseURL:string ="https://ecommerce.routemisr.com";
  constructor(private _HttpClient:HttpClient) { }

  getProducts(pageNum:number = 1):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/products?page=${pageNum}&limit=20`);
  }
  getSpecProduct(id:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/products/${id}`)
  }
}
