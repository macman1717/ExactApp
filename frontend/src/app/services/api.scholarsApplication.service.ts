import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ApiScholarsApplicationService {
  environment = environment;
  constructor(private http: HttpClient) {}

  postApplicant(
    applicantForm: FormGroup<{
      earnedCred: FormControl<string | null>;
      firstName: FormControl<string | null>;
      lastName: FormControl<string | null>;
      stuID: FormControl<string | null>;
      public: FormControl<string | null>;
      level: FormControl<string | null>;
      eportLink: FormControl<string | null>;
      phoneNum: FormControl<string | null>;
      email: FormControl<string | null>;
    }>
  ) {
    console.log(
      `${environment.apiURL}/api/scholars/${applicantForm.value.stuID}`
    );
    this.http
      .post(
        `${environment.apiURL}/api/scholars/${applicantForm.value.stuID}`,
        applicantForm.value
      )
      .subscribe();
    return 'Application submitted';
  }
}
