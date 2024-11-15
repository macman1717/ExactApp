import { Component } from '@angular/core';
import {ContentComponent} from "../../partial_components/content/content.component";
import {FooterComponent} from "../../partial_components/footer/footer.component";
import {HeaderComponent} from "../../partial_components/header/header.component";
import {ImageWithTextComponent} from "../../partial_components/image-with-text/image-with-text.component";
import {HeaderLinkItem} from "../../partial_components/header/header-link-item-interface";
import {FormControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup} from "@angular/forms";
import {ApiScholarsApplicationService} from "../../services/api.scholarsApplication.service";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-application-page',
  standalone: true,
  imports: [
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    ImageWithTextComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './student-application-page.component.html',
  styleUrl: './student-application-page.component.css'
})
export class StudentApplicationPageComponent {
  constructor(private apiScholarsApplicationService: ApiScholarsApplicationService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.applicationSubmitted = false;
  };

  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact', link: 'exact'},
    { title: 'Scholars', link: 'exact/scholars'},
  ];
  profileForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    phoneNum: new FormControl('',Validators.required),
    stuID: new FormControl('',[Validators.required,Validators.maxLength(9),Validators.minLength(9)]),
    level: new FormControl('',Validators.required),
    earnedCred: new FormControl('',[Validators.required,Validators.min(0),Validators.max(123)]),
    eportLink: new FormControl('',Validators.required),
    public: new FormControl('',Validators.required),
    // permissionNoBox: new FormControl('')
  });
  applicationSubmitted: any;
  submitPressed: boolean = false;
  onSubmit() {
    this.submitPressed = true;
    if (this.profileForm.invalid) {
      for (const field in this.profileForm.controls) { // 'field' is a string

        const control = this.profileForm.get(field);


        // @ts-ignore
        console.log(`${field} Valid: ${control.valid}`);
      } 
    }else{
    this.apiScholarsApplicationService.postApplicant(this.profileForm);
    this.applicationSubmitted = true;
    setTimeout(() => {
        this.router.navigate(['/exact']).then(() => {
          window.location.reload();
        });
      }
      , 5000);
    }
  }
}
