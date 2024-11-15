import {Component, OnInit, untracked} from '@angular/core';
import {NgIf} from "@angular/common";
import { ApiService } from '../../services/api.service';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContactComponent } from '../../partial_components/contact/contact.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { AccordionComponent } from '../../partial_components/accordion/accordion.component';
import {ButtonLinkComponent} from "../../partial_components/button-link/button-link.component";
import { environment } from "../../../environment";
import {AppModule} from "../../app.module";
import { AuthService } from '../../services/api.auth.service';
import { EditableContentComponent } from '../../partial_components/editable-content/editable-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    NgIf,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ContentComponent,
    AccordionComponent,
    ButtonLinkComponent,
    AppModule,
    EditableContentComponent
  ],
  standalone: true
})

export class HomeComponent implements OnInit {
  environment = environment;
  title = 'frontEnd';
  message: any;
  content: any;

  constructor(
    private apiService: ApiService, public authService: AuthService) {
    this.apiService.getHomePageContent().subscribe(data => {
      this.content = data;
    })
  };


  ngOnInit() {
    this.apiService.getMessage().subscribe(data => {
      this.message = data;
    });
  }

  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: '/exact'},
  ];
  protected readonly untracked = untracked;
}
