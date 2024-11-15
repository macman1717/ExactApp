import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-button-link',
  standalone: true,
  imports: [],
  templateUrl: './button-link.component.html',
  styleUrl: './button-link.component.css'
})
export class ButtonLinkComponent {
  @Input() text!: any;
  @Input() exactURL!: any;
  @Input() thinButton: boolean = false;
  constructor(private router: Router) {}
  redirectToLink() {
    this.router.navigate(['/' + this.exactURL]);
  }
}


