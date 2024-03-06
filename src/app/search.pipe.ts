import { Pipe, PipeTransform } from '@angular/core';
import {Data} from './product-data'
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts:Data[] , userWord:string): Data[] {
    return allProducts.filter((oneProd)=>oneProd?.title?.toLowerCase().includes(userWord.toLowerCase()));
  }

}
