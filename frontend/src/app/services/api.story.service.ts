import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { RecentStory } from '../pages/admin-dashboard-page/recent-story-interface';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ApiStoryService {
  environment = environment;
  constructor(private http: HttpClient) {}

  getStories() {
    console.log(`Doing GET request ${environment.apiURL}/api/accepted-stories`);
    return this.http.get<RecentStory[]>(`${environment.apiURL}/api/accepted-stories`);
  }

  postStory(
    applicantForm: FormGroup<{
      firstName: FormControl<string | null>;
      lastName: FormControl<string | null>;
      email: FormControl<string | null>;
      content: FormControl<string | null>;
    }>
  ) {
    const formData = {
      ...applicantForm.value,
      dateInMillis: Date.now(),  // Add timestamp here
      visible: false,
    };

    console.log(
      `${environment.apiURL}/api/stories/${applicantForm.value.email}`
    );
    this.http
      .post(
        `${environment.apiURL}/api/stories/${applicantForm.value.email}`,
        formData
      )
      .subscribe();
    return 'Application submitted';
  }
}
