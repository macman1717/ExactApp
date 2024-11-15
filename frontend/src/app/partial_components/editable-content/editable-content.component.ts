import {Component, ElementRef, Input, numberAttribute} from '@angular/core';
import { AuthService } from '../../services/api.auth.service';
import {EditContentService} from "../../services/api.editContent.service";
import {AppModule} from "../../app.module";

@Component({
  selector: 'app-editable-content',
  standalone: true,
  imports: [
    AppModule
  ],
  templateUrl: './editable-content.component.html',
  styleUrl: './editable-content.component.css',
})
export class EditableContentComponent {
  @Input() webpage!: any;
  @Input() sectionNum!: any;
  htmlOutput: any;
  contentID: any;
  constructor(public authService: AuthService,
              public editContentService: EditContentService) {
  };

  ngOnInit() {
    this.editContentService.getPageContent(this.webpage, parseInt(this.sectionNum)).subscribe(content => {
      this.htmlOutput = content;
    });
    this.contentID = "contentContainer" + this.sectionNum;
  }
  editing: Boolean = false;

  startEditing() {
    this.editing = true;
  }

  stopEditing(webpage: any, sectionNum: number) {
    this.editing = false;
    var divInnerHtml = document.getElementById('contentContainer'+sectionNum);
    this.editContentService.addPageHTML(divInnerHtml,webpage,sectionNum);
  }

  // execCommand is deprecated, but there is no
  // suitable alternative to use for contentEditable
  format(command: string, value?: string) {
    if (command === 'createLink') {
      const url = prompt('Enter the URL');

      if (url !== null && url.trim() !== '') {
        document.execCommand(command, false, url);
      }
    } else {
      document.execCommand(command, false, value || '');
    }
  }

  protected readonly parseInt = parseInt;

}
