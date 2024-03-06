import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';
import { Brand } from '../product-data'

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  allBrandsData!: Brand[];

  constructor(private _BrandsService:BrandsService){}
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.allBrandsData = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
