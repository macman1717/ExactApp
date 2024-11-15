import { Component, Input } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  @Input({required: true}) text: string = "";
  @Input() last = false;

  toggleAccordion(event: Event) {
    const element = event.target as HTMLElement;
    element.classList.toggle("active")

    const panel = element.nextElementSibling as HTMLElement
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }
}
