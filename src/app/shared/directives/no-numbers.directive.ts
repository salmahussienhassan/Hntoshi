import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoNumbers]',
  standalone: true
})
export class NoNumbersDirective {

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[0-9]/g, ''); // Remove all numbers
  }

}
