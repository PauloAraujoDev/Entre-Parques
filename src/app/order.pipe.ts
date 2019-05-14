import { Pipe, PipeTransform } from '@angular/core';
import sortBy from 'sort-by';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {
  transform(list: any[], params?: any): any {
      return list.sort(sortBy(params));
  }
}
