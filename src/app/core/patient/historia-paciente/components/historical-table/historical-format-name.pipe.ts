import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historicalFormatName'
})
export class HistoricalFormatNamePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    let result = value.charAt(0).toUpperCase();;
    for (let i = 1; i < value.length; i++) {
      const char = value[i];
      if (char === char.toUpperCase()) {
        result += ' ' + char;
      } else {
        result += char;
      }
    }
    return result;
  }
}
