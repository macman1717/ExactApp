import { Component } from '@angular/core';
import { AuthService } from '../../services/api.auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email = '';
  password = '';
  forgotEmail: string = '';
  otp: string = '';
  isForgotPassword: boolean = false;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  newPassword: string = '';
  hasResetPassword: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'Login', link: 'exact/login'},
  ];
  

  onResetPassword() {
      this.authService.resetPassword(this.email, this.newPassword, this.otp).subscribe(
          response => {
            this.hasResetPassword = true;
          },
          error => {
              alert("An error occurred! Check the developer console for more information.");
              console.log("Reset Password Errored");
              console.log(error);
          }
      );

      setTimeout(() => {
        this.router.navigate(['/exact/login']).then(() => {
          window.location.reload();
        });
      }
      , 5000);
  }

  cancelForgotPassword() {
    this.isForgotPassword = false;
    this.otpSent = false;
    this.forgotEmail = '';
    this.otp = '';
  }

  showForgotPasswordForm() {
    this.isForgotPassword = true;
  }

  onForgotPasswordSubmit() {
    if (!this.otpSent) {
      this.authService.requestOtp(this.forgotEmail).subscribe();
      this.otpSent = true;

    } else {
      this.authService.verifyOtp(this.forgotEmail, this.otp).subscribe(
        response => {
            this.otpVerified = true;
        },
        error => {
            alert("Invalid code.");
            console.error(error);
        }
    );
    }
  }

  onSigninSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token); 
        this.router.navigate(['exact/admin-dashboard']);
      },
      (error) => {
        alert('Invalid email or password');
      }
    );
  }
}
