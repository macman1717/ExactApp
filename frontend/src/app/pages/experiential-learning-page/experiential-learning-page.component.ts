import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { environment } from "../../../environment";
import {EditableContentComponent} from "../../partial_components/editable-content/editable-content.component";

@Component({
  selector: 'app-experiential-learning-page',
  standalone: true,
    imports: [HeaderComponent, FooterComponent, ContentComponent, EditableContentComponent],
  templateUrl: './experiential-learning-page.component.html',
  styleUrl: './experiential-learning-page.component.css'
})
export class ExperientialLearningPageComponent {
  environment = environment;
  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'Experiential Learning', link: 'exact/experiential-learning'},
  ];
}
