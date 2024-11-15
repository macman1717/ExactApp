import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContactComponent } from '../../partial_components/contact/contact.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { AccordionComponent } from '../../partial_components/accordion/accordion.component';
import {EditableContentComponent} from "../../partial_components/editable-content/editable-content.component";

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css'],
    imports: [
        HeaderComponent,
        FooterComponent,
        ContactComponent,
        ContentComponent,
        AccordionComponent,
        EditableContentComponent
    ],
  standalone: true
})

export class FaqPageComponent {
  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'FAQ', link: 'exact/faq'},
  ];
}
