import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-pay-order',
  templateUrl: './pay-order.component.html',
  styleUrls: ['./pay-order.component.scss']
})
export class PayOrderComponent implements OnInit {
  cartID!: string;
  constructor(private location: Location, private locationStrategy: LocationStrategy, private _ActivatedRoute: ActivatedRoute, private _OrdersService: OrdersService, private toastEvokeService: ToastEvokeService, private _Router: Router) { }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((p) => { this.cartID = p['id'] })
    
  }
  detailsForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}/)]),
    city: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })
  paySubmit() {
    console.log(this.detailsForm.value);
  }
  payCash() {
    this._OrdersService.cashOrder(this.cartID, this.detailsForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastEvokeService.success(`${res.status} !`, `Your total price : ${res.data.totalOrderPrice}`).subscribe();
         window.location.href = `${location.origin}/home`
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  payVisa() {
    this._OrdersService.checkoutOrder(this.cartID, this.detailsForm.value).subscribe({
      next: (res) => {
        window.location.href = res.session.url;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
