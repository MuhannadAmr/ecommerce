import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Data } from '../product-data';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
// 
import { WhishlistService } from '../whishlist.service';
import { CategoriesService } from '../categories.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allProduct!: Data[];
  userWord: string = "";
  allWishListData: string[] = [];
  allCategoriesData:any[]=[];
  constructor(
    private _WhishlistService: WhishlistService,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private toastEvokeService: ToastEvokeService,
    private _CategoriesService:CategoriesService
  ) { }

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe((res) => {
      this.allProduct = res.data
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
      next:(res)=>{
        this.allCategoriesData = res.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
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
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1040: {
        items: 5
      },
    },
    nav: true,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000
  }

  customOptionsN: OwlOptions = {
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
    nav: true,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 7000
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
