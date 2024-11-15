import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.css'
})
export class TeamCardComponent {
  @Input() image_path!: any;
  @Input() memberName: any;
  @Input() memberTitle: any;
  @Input() facultyPage: any;
}
