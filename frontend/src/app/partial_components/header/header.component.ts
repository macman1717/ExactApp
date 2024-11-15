import { Component, Input } from '@angular/core';
import { HeaderLinkItem } from './header-link-item-interface';
import { AuthService } from '../../services/api.auth.service';
import { Router } from '@angular/router';
import { NavDropdownComponent } from '../nav-dropdown/nav-dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  @Input() headerLinks: HeaderLinkItem[] = [
    { title: 'Temporary', link: '/'}, 
    { title: 'Temporary2', link: '/'}, 
  ];

  constructor(public authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/exact']).then(() => {
      window.location.reload();
    });
  }
}
