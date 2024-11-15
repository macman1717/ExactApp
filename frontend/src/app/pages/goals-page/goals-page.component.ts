import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContactComponent } from '../../partial_components/contact/contact.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { AccordionComponent } from '../../partial_components/accordion/accordion.component';
import { AuthService } from '../../services/api.auth.service';
import {EditableContentComponent} from "../../partial_components/editable-content/editable-content.component";
import {EditContentService} from "../../services/api.editContent.service";
import {AppModule} from "../../app.module";

@Component({
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrls: ['./goals-page.component.css'],
  imports: [
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ContentComponent,
    AccordionComponent,
    EditableContentComponent,
    AppModule,
  ],
  standalone: true
})

export class GoalsPageComponent {
  constructor(){};

  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'Goals', link: 'exact/goals'},
  ];
}
