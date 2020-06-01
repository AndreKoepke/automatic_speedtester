import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mbit'
})
export class MbitPipe implements PipeTransform {

  transform(value: number): string {
      return MbitPipe.toMbitNumber(value) + ` Mbit`;
  }

  public static toMbitNumber(value: number): number {
    return Math.round(value / Math.pow(10, 4)) / Math.pow(10, 2);
  }
}
