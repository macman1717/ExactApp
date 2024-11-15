import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContactComponent } from '../../partial_components/contact/contact.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { AccordionComponent } from '../../partial_components/accordion/accordion.component';
import {ImageWithTextComponent} from "../../partial_components/image-with-text/image-with-text.component";
import {TeamCardComponent} from "../../partial_components/team-card/team-card.component";
import {environment} from "../../../environment";

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css'],
  imports: [
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ContentComponent,
    AccordionComponent,
    ImageWithTextComponent,
    TeamCardComponent
  ],
  standalone: true
})

export class TeamPageComponent {
  enviorment = environment;
  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'Team', link: 'exact/team'},
  ];
  image_path = "RebeccaCooper.png";
  //text = "";
}
