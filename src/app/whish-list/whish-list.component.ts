import { Component, OnInit } from '@angular/core';
import { WhishlistService } from '../whishlist.service';
import { Data } from '../product-data'
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-whish-list',
  templateUrl: './whish-list.component.html',
  styleUrls: ['./whish-list.component.scss']
})
export class WhishListComponent implements OnInit {
  wishLlistProduct!: Data[];
  allWishListData: string[] = [];
  constructor(
    private _WhishlistService: WhishlistService,
    private _CartService:CartService,
    private toastEvokeService: ToastEvokeService 
    ) { }

  ngOnInit(): void {
    this._WhishlistService.getProductsWlAPI().subscribe({
      next: (res) => {
        this._WhishlistService.wishNum.next(res.count);
        this.wishLlistProduct = res.data;
        let newArr = res.data.map((oneId: any) => oneId._id);
        this.allWishListData = newArr;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  addProductBtn(pId:any){
    this._CartService.addProductToCartAPI(pId).subscribe({
      next:(res)=>{
        // send to service number of cart product
        this._CartService.cartNum.next(res.numOfCartItems);
        // Type SUCCESS
        this.toastEvokeService.success("Success",res.message).subscribe();
      },
      error:(err)=>{console.log(err)}
    })
  } 

  removeProductWishList(pId:any){
    
    this._WhishlistService.removeProduvtFromWlAPI(pId).subscribe({
      next:(res)=>{
        this.toastEvokeService.warning(res.status, res.message).subscribe();
        this.allWishListData =res.data; 
        let newProducts = this.wishLlistProduct.filter((oneProd:any)=> this.allWishListData.includes(oneProd._id))
        this.wishLlistProduct = newProducts;
        this._WhishlistService.wishNum.next(res.data.length);
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
