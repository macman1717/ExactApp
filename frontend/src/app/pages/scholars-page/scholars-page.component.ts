import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContactComponent } from '../../partial_components/contact/contact.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { AccordionComponent } from '../../partial_components/accordion/accordion.component';
import { ButtonLinkComponent } from '../../partial_components/button-link/button-link.component';
import {ExactScholar} from "../admin-dashboard-page/exact-scholar-interface";
import {ApiService} from "../../services/api.service";
import {EditableContentComponent} from "../../partial_components/editable-content/editable-content.component";

@Component({
  selector: 'app-scholars-page',
  templateUrl: './scholars-page.component.html',
  styleUrls: ['./scholars-page.component.css'],
    imports: [
        HeaderComponent,
        FooterComponent,
        ContactComponent,
        ContentComponent,
        AccordionComponent,
        ButtonLinkComponent,
        EditableContentComponent
    ],
  standalone: true
})



export class ScholarsPageComponent {
  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'Scholars', link: 'exact/scholars'},
  ];

  constructor(private apiScholarsService: ApiService) {}

  scholars: ExactScholar[] = [];
  participants: ExactScholar[] = [];
  juniors: ExactScholar[] = [];
  seniors: ExactScholar[] = [];

  ngOnInit(){
    this.apiScholarsService.getExactScholars().subscribe(data => {
      this.scholars = data;
      for(let scholar of this.scholars){
        switch(scholar.level){
          case "participant":
            this.participants.push(scholar);break;
          case "junior":
            this.juniors.push(scholar);break;
          case "senior":
            this.seniors.push(scholar);break;
          default:
            console.error("Unknown scholar level: " + scholar);
        }
      }
    })
  }
}
