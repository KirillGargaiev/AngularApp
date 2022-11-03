import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phone: string): string {
    let value = phone.toString().trim().replace(/^\+|-|\(|\)/g, '')
    let result = value.replace(/\s+/g,'')
    return result.slice(result.length-10, result.length).replace(/(\d{1})(\d{2})(\d{3})(\d{2})(\d{2})/, `+38$1 ($2) $3-$4-$5`)
  }
}
