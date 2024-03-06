import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Brand } from '../product-data'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  allCategoriesData!: Brand[];


  constructor(
    private _CategoriesService: CategoriesService,

  ) { }
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategoriesData = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
