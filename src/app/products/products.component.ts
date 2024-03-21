import { Component } from '@angular/core';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
// 
import { WhishlistService } from '../whishlist.service';
import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { Data } from '../product-data';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  allProduct!: Data[];
  userWord: string = "";
  allWishListData: string[] = [];
  allCategoriesData: any[] = [];
// for pagenate
  pageSize: number = 0;
  p: number = 1;
  total: number = 0;

  constructor(
    private _WhishlistService: WhishlistService,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private toastEvokeService: ToastEvokeService,
    private _CategoriesService: CategoriesService
  ) { }

  ngOnInit(): void {

    this._ProductsService.getProducts().subscribe((res) => {
      this.allProduct = res.data;
      this.pageSize = res.metadata.limit;
      this.p = res.metadata.currentPage;
      this.total = res.results;
    });

    this._CartService.getAllProductCartAPI().subscribe((res) => {
      this._CartService.cartNum.next(res.numOfCartItems)
    })
    this._WhishlistService.getProductsWlAPI().subscribe({
      next: (res) => {
        this._WhishlistService.wishNum.next(res.count)

        let newArr = res.data.map((oneId: any) => oneId._id);
        this.allWishListData = newArr;
      },
      error: (err) => {
        console.log(err);
      }
    })
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategoriesData = res.data;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  pageChanged(event:any):void{
    this._ProductsService.getProducts(event).subscribe((res)=>{
      this.allProduct = res.data;
      this.pageSize = res.metadata.limit;
      this.p = res.metadata.currentPage;
      this.total = res.results;
    })
  }

  addProductBtn(pId: any) {
    this._CartService.addProductToCartAPI(pId).subscribe({
      next: (res) => {
        // send to service number of cart product
        this._CartService.cartNum.next(res.numOfCartItems);
        // Type SUCCESS
        this.toastEvokeService.success("Success", res.message).subscribe();
      },
      error: (err) => { console.log(err) }
    })
  }
  addProductWishList(pId: any) {
    this._WhishlistService.addProductToWlAPI(pId).subscribe({
      next: (res) => {
        this._WhishlistService.wishNum.next(res.data.length);

        this.allWishListData = res.data;
        this.toastEvokeService.success(res.status, res.message).subscribe();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  removeProductWishList(pId: any) {

    this._WhishlistService.removeProduvtFromWlAPI(pId).subscribe({
      next: (res) => {
        this.toastEvokeService.warning(res.status, res.message).subscribe();
        this.allWishListData = res.data;
        this._WhishlistService.wishNum.next(res.data.length);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
