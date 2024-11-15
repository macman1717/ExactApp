import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { ButtonLinkComponent } from '../button-link/button-link.component';
import { AuthService } from '../../services/api.auth.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ButtonLinkComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(public authService: AuthService, private router: Router) {
  }
}
