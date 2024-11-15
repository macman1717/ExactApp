import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContactComponent } from '../../partial_components/contact/contact.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { AccordionComponent } from '../../partial_components/accordion/accordion.component';
import { ButtonLinkComponent } from '../../partial_components/button-link/button-link.component';
import { ImageWithTextComponent } from '../../partial_components/image-with-text/image-with-text.component';
import {environment} from '../../../environment';
import {EditableContentComponent} from "../../partial_components/editable-content/editable-content.component";

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.css'],
    imports: [
        HeaderComponent,
        FooterComponent,
        ContactComponent,
        ContentComponent,
        AccordionComponent,
        ButtonLinkComponent,
        ImageWithTextComponent,
        EditableContentComponent
    ],
  standalone: true
})

export class LibraryPageComponent {
  environment = environment;
  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'Library', link: 'exact/library'},
  ];
  protected readonly enviorment = environment;
}
