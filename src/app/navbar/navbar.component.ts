import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { WhishlistService } from '../whishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin!:boolean
  cartItemNumNav!:number
  wishListNumNav!:number
  constructor(private _AuthService:AuthService , private _Router:Router , private _CartService:CartService , private _WhishlistService:WhishlistService){}
  ngOnInit():void{
    this._CartService.cartNum.subscribe(()=>{
      this.cartItemNumNav = this._CartService.cartNum.getValue();
    })
    this._WhishlistService.wishNum.subscribe(()=>{
      this.wishListNumNav = this._WhishlistService.wishNum.getValue();
    })
    this._AuthService.userData.subscribe({
      next:()=>{
        if(this._AuthService.userData.getValue()==null){
          this.isLogin = false;
        }else{
          this.isLogin = true;
        }
      }
    })
  }
  lououtMethod(){
    localStorage.removeItem("userToken");
    this._AuthService.saveDataMethod();
    this._Router.navigate(['/login']);
  }
}
