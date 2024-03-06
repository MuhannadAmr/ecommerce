import { Component, OnInit } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  userData!:any
  userId!:string
  allUserOrders!:any
    constructor(private _OrdersService:OrdersService){}
    ngOnInit(): void {
      this.userData = localStorage.getItem("userToken");
      this.userData = jwtDecode(this.userData);
      this.userId=this.userData.id

      this._OrdersService.getUserOrders(this.userId).subscribe({
        next:(res)=>{
          this.allUserOrders = res
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      
    }
}
