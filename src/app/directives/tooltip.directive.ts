import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {

  @Input('appTooltip') tooltipText!: string;
  tooltipElement!: Element;

  @HostListener('mouseenter') onEnter() {
    this.tooltipElement = document.createElement('p');
    this.tooltipElement.className = 'header__tooltip';
    this.tooltipElement.textContent = this.tooltipText;
    this.element.nativeElement.appendChild(this.tooltipElement);
  }

  @HostListener('mouseleave') onLeave() {
    this.element.nativeElement.removeChild(this.tooltipElement)
  }


  constructor(private element: ElementRef, private render: Renderer2) { }


}
