import {Component, input, Input} from '@angular/core';

@Component({
  selector: 'app-image-with-text',
  standalone: true,
  imports: [],
  templateUrl: './image-with-text.component.html',
  styleUrl: './image-with-text.component.css'
})
export class ImageWithTextComponent {
  @Input() image_path!: any;
  @Input() subText: any;
  @Input() mainText: any;
  @Input() extraTitles: any;
}
