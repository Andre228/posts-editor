import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    if (!array) return null;
    if (!args) return array;

    args = args.toLowerCase();

    return array.filter((item) => {
      return item.author.toLowerCase().includes(args)
          || item.date.toLowerCase().includes(args)
          || item.text.toLowerCase().includes(args)
          || (item.pdf && item.pdf.toLowerCase().includes(args))
          || (item.isEdited === 'true' && 'edited'.toLowerCase().includes(args));
    });
  }

}
