import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from './order-details'
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseURL: string = "https://ecommerce.routemisr.com";

  constructor(private _HttpClient: HttpClient) { }

  cashOrder(cartId: string, orderForm: OrderDetails): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/${cartId}`, { shippingAddress: orderForm })
  }
  checkoutOrder(cartId: string, orderForm: OrderDetails): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, { shippingAddress: orderForm })
  }
  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/orders/user/${userId}`)
  }
}
