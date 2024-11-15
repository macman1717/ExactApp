import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { FormControl, FormGroup } from '@angular/forms';
import { ScholarsApplication } from '../pages/admin-dashboard-page/scholars-application-interface';
import { RecentStory } from '../pages/admin-dashboard-page/recent-story-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiAdminService {
  environment = environment;
  constructor(private http: HttpClient) {}

  getScholars() {
    console.log(`Doing GET request ${environment.apiURL}/api/scholars`);
    return this.http.get<ScholarsApplication[]>(
      `${environment.apiURL}/api/scholars`
    );
  }

  getAcceptedScholars() {
    console.log(`Doing GET request ${environment.apiURL}/api/accepted-scholars`);
    return this.http.get<ScholarsApplication[]>(
      `${environment.apiURL}/api/accepted-scholars`
    );
  }

  getRejectedScholars() {
    console.log(`Doing GET request ${environment.apiURL}/api/rejected-scholars`);
    return this.http.get<ScholarsApplication[]>(
      `${environment.apiURL}/api/rejected-scholars`
    );
  }

  requestDeleteApplicant(_id: any) {
    console.log(
      `Doing DELETE request ${environment.apiURL}/api/scholars/${_id}`
    );
    return this.http.delete(`${environment.apiURL}/api/scholars/${_id}`);
  }

  requestDeleteAcceptedApplicant(_id: any) {
    console.log(
      `Doing DELETE request ${environment.apiURL}/api/accepted-scholars/${_id}`
    );
    return this.http.delete(`${environment.apiURL}/api/accepted-scholars/${_id}`);
  }

  requestDeleteRejectedApplicant(_id: any) {
    console.log(
      `Doing DELETE request ${environment.apiURL}/api/rejected-scholars/${_id}`
    );
    return this.http.delete(`${environment.apiURL}/api/rejected-scholars/${_id}`);
  }

  getStories() {
    console.log(`Doing GET request ${environment.apiURL}/api/stories`);
    return this.http.get<RecentStory[]>(`${environment.apiURL}/api/stories`);
  }

  getAcceptedStories() {
    console.log(`Doing GET request ${environment.apiURL}/api/accepted-stories`);
    return this.http.get<RecentStory[]>(
      `${environment.apiURL}/api/accepted-stories`
    );
  }

  requestDeleteStory(_id: any) {
    console.log(
      `Doing DELETE request ${environment.apiURL}/api/stories/${_id}`
    );
    return this.http.delete(`${environment.apiURL}/api/stories/${_id}`);
  }

  requestDeleteAcceptedStory(_id: any) {
    console.log(
      `Doing DELETE request ${environment.apiURL}/api/accepted-stories/${_id}`
    );
    return this.http.delete(
      `${environment.apiURL}/api/accepted-stories/${_id}`
    );
  }

  addAcceptedStory(story: RecentStory) {
    const { _id, ...storyWithoutId } = story;
    console.log(
      `Doing POST request ${environment.apiURL}/api/accepted-stories`
    );
    return this.http.post(
      `${environment.apiURL}/api/accepted-stories`,
      storyWithoutId
    );
  }

  updateAcceptedStoryVisibility(_id: any, visible: boolean) {
    console.log(
      `Doing PUT request ${environment.apiURL}/api/accepted-stories/${_id}`
    );
    return this.http
      .put(`${environment.apiURL}/api/accepted-stories/${_id}`, { visible }).subscribe();
  }

  requestPostApplicantToApproved(application: any) {
    console.log(
      `Doing POST request ${environment.apiURL}/api/scholars/accepted-applicant/${application._id}`,
    );
    return this.http.post(`${environment.apiURL}/api/scholars/accepted-applicant/${application._id}`, application);
  }

  requestPostApplicantToRejected(application: any) {
    console.log(
      `Doing POST request ${environment.apiURL}/api/scholars/rejected-applicant/${application._id}`,
    );
    return this.http.post(`${environment.apiURL}/api/scholars/rejected-applicant/${application._id}`, application);
  }
}
