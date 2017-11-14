import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from "@angular/core";


@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    

    constructor(private elementRef: ElementRef, private renderer: Renderer2){}
    
    @HostBinding('class.open') onClicked = false;

    @HostListener('click') toggleDropdown(eventData: Event){
        this.onClicked = !this.onClicked;
    }
}