import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Data, ProductElement } from '../cart-data'
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  allCartProducts!: ProductElement[];
  totalPrice!: number;
  cartId!:string
  cartItemFlag: boolean = false;
  constructor(private _CartService: CartService, private toastEvokeService: ToastEvokeService) { }
  ngOnInit(): void {
    this._CartService.getAllProductCartAPI().subscribe({
      next: (res) => {
        this.cartId = res.data._id;
        this.allCartProducts = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this._CartService.cartNum.next(res.numOfCartItems);

        if (res.numOfCartItems == 0) {
          this.cartItemFlag = false;
        } else {
          this.cartItemFlag = true;
        }

      },
      error: (err) => { console.log(err) }
    })
  }
  deleteItem(pId: any) {
    this._CartService.removeSpecItemAPI(pId).subscribe({
      next: (res) => {
        this.allCartProducts = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this._CartService.cartNum.next(res.numOfCartItems);
        this.toastEvokeService.warning('Delete', res.status).subscribe();
        if (res.numOfCartItems == 0) {
          this.cartItemFlag = false;
        } else {
          this.cartItemFlag = true;
        }
      },
      error: (err) => { console.log(err) }
    })
  }
  changeItemQuBTN(whichBtn: string, pCount: any | number, pId: any | string) {
    if (whichBtn == "plus") {
      pCount = (Number(pCount) + 1).toString()
    } else {
      pCount = (Number(pCount) - 1).toString()
    }

    this._CartService.updateCartProQuaAPI(pId, pCount).subscribe({
      next: (res) => {
        if(pCount=="0"){
          this.deleteItem(pId);
        }
        this.allCartProducts = res.data.products
        this.totalPrice = res.data.totalCartPrice
      },
      error: (err) => { console.log(err) }
    })
  }
  deleteAllOreders(){
    this._CartService.clearAllCart().subscribe({
      next:(res)=>{
        this.allCartProducts=[];
        this._CartService.cartNum.next(res.numOfCartItems);
        this.totalPrice = 0;
        this.toastEvokeService.warning(res.message, 'Your cart now is empty').subscribe();
        this.cartItemFlag = false;
        // this._CartService.getAllProductCartAPI().subscribe({
        //   next:(res)=>{
        //     this.allCartProducts = res.data.products;
        //     this.toastEvokeService.warning(res.message, 'Your cart now is empty').subscribe();
        //   },
        //   error:(err)=>{console.log(err);}
        // })
        
      },
      error:(err)=>{console.log(err)}
    })
  }
}
