import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import {Data} from '../product-data';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  pId:string="";
  oneProduct!:Data
  constructor(
    private _ActivatedRoute:ActivatedRoute ,
     private _ProductsService:ProductsService ,
     private _CartService:CartService,
     private toastEvokeService: ToastEvokeService 
     ){}
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next:(res)=>{
        this.pId = res["id"];
        this._ProductsService.getSpecProduct(this.pId).subscribe({
      
          next:(res)=>{this.oneProduct = res.data;}
        })
      },
      error:function(err){
        alert("try again")
      }
    })
  }
  addProductBtn(pId:any){
    this._CartService.addProductToCartAPI(pId).subscribe({
      next:(res)=>{
        console.log(res);
        
        // send to service number of cart product
        this._CartService.cartNum.next(res.numOfCartItems);
        // Type SUCCESS
        this.toastEvokeService.success("Success",res.message).subscribe();
      },
      error:(err)=>{console.log(err)}
    })
  } 

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
}
