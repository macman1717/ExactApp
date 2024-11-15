import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContactComponent } from '../../partial_components/contact/contact.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { AccordionComponent } from '../../partial_components/accordion/accordion.component';
import { RecentStory } from '../admin-dashboard-page/recent-story-interface';
import { ApiStoryService } from '../../services/api.story.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EditableContentComponent} from "../../partial_components/editable-content/editable-content.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-goals-page',
  templateUrl: './recent-stories-page.component.html',
  styleUrls: ['./recent-stories-page.component.css'],
  imports: [
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ContentComponent,
    AccordionComponent,
    FormsModule,
    ReactiveFormsModule,
    EditableContentComponent,
    NgClass
  ],
  standalone: true
})

export class RecentStoriesPageComponent {
  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'Recent Stories', link: 'exact/recent-stories'},
  ];

  constructor(private apiStoryService: ApiStoryService) {};

  stories: RecentStory[] = [];
  placeholderStories: RecentStory[] = [];
  submittedStory = false;
  submitPressed: boolean = false;

  ngOnInit() {
    this.apiStoryService.getStories().subscribe(data => {
      this.stories = data;
      for(var story of this.stories) {
        if(story.visible){
          this.placeholderStories.push(story);
        }
      }
      this.stories = this.placeholderStories;
    });
  }

  storyForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    content: new FormControl('',[Validators.required,Validators.minLength(50)])
  });


  onSubmit() {
    this.submitPressed = true;
    if(this.storyForm.valid) {
      this.submittedStory = true;
      console.log(this.apiStoryService.postStory(this.storyForm));
    }else{
      console.log("Invalid Story")
    }
  }
}
