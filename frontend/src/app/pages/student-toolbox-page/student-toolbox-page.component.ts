import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContactComponent } from '../../partial_components/contact/contact.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { AccordionComponent } from '../../partial_components/accordion/accordion.component';
import {ImageWithTextComponent} from "../../partial_components/image-with-text/image-with-text.component";
import {Router} from "@angular/router";
import {EditableContentComponent} from "../../partial_components/editable-content/editable-content.component";

@Component({
  selector: 'app-student-toolbox-page',
  templateUrl: './student-toolbox-page.component.html',
  styleUrls: ['./student-toolbox-page.component.css'],
    imports: [
        HeaderComponent,
        FooterComponent,
        ContactComponent,
        ContentComponent,
        AccordionComponent,
        ImageWithTextComponent,
        EditableContentComponent
    ],
  standalone: true
})

export class StudentToolboxPageComponent {
  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'Student Toolbox', link: 'exact/student-toolbox'},
  ];

}
