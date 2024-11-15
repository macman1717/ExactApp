import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial_components/header/header.component';
import { FooterComponent } from '../../partial_components/footer/footer.component';
import { ContentComponent } from '../../partial_components/content/content.component';
import { HeaderLinkItem } from '../../partial_components/header/header-link-item-interface';
import { environment } from "../../../environment";
import { RecentStory } from './recent-story-interface';
import { ScholarsApplication } from './scholars-application-interface';
import { ApiAdminService } from '../../services/api.admin.service';
import { ScholarsPageComponent } from '../scholars-page/scholars-page.component';
import {app} from "../../../../server";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ContentComponent],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.css'
})
export class AdminDashboardPageComponent {
  environment = environment;
  headerLinks: HeaderLinkItem[] = [
    { title: 'Exact Plan', link: 'exact'},
    { title: 'Admin Dashboard', link: 'exact/admin-dashboard'},
  ];

  onAppReject(application: any) {
    if(confirm("Are you sure you want to reject this application?")) {
      this.apiAdminService.requestPostApplicantToRejected(application).subscribe(() => {
        
        // add to rejected locally
        const rejectedApplication = this.applications.find(app => app._id === application._id);
        if (rejectedApplication) {
          this.rejectedApplications.push(rejectedApplication);
          this.generateRejectedApplications2DArray();
        }

        // delete pending in database
        this.apiAdminService.requestDeleteApplicant(application._id).subscribe(() => {

          // delete pending locally
          this.applications = this.applications.filter(app => app._id !== application._id);
          this.generateApplications2DArray();
        });
        
      })
    }
  }

  onAppApprove(application: any) {
    if(confirm("Are you sure you want to approve this application?")) {
      this.apiAdminService.requestPostApplicantToApproved(application).subscribe(() => {
        
        // add to accepted locally
        const acceptedApplication = this.applications.find(app => app._id === application._id);
        if (acceptedApplication) {
          this.acceptedApplications.push(acceptedApplication);
          this.generateAcceptedApplications2DArray();
        }

        // delete pending in database
        this.apiAdminService.requestDeleteApplicant(application._id).subscribe(() => {

          // delete pending locally
          this.applications = this.applications.filter(app => app._id !== application._id);
          this.generateApplications2DArray();
        });
        
      })
    }
  }

  onAppDelete(applicationToRemove: any) {
    if(confirm("Are you sure you want to remove this application?")) {
      this.apiAdminService.requestDeleteApplicant(applicationToRemove._id).subscribe(() => {
        this.applications = this.applications.filter(app => app._id !== applicationToRemove._id);
        this.generateApplications2DArray();
      });
    }
  };

  onAcceptedAppDelete(applicationToRemove: any) {
    if(confirm("Are you sure you want to remove this current scholar?")) {
      this.apiAdminService.requestDeleteAcceptedApplicant(applicationToRemove._id).subscribe(() => {
        this.acceptedApplications = this.acceptedApplications.filter(app => app._id !== applicationToRemove._id);
        this.generateAcceptedApplications2DArray();
      });
    }
  };

  onRejectedAppDelete(applicationToRemove: any) {
    if(confirm("Are you sure you want to remove this current scholar?")) {
      this.apiAdminService.requestDeleteRejectedApplicant(applicationToRemove._id).subscribe(() => {
        this.rejectedApplications = this.rejectedApplications.filter(app => app._id !== applicationToRemove._id);
        this.generateRejectedApplications2DArray();
      });
    }
  };

  onStoryDelete(storyToRemove: RecentStory) {
    if(confirm("Are you sure you want to delete this story?")) {
      this.apiAdminService.requestDeleteStory(storyToRemove._id).subscribe(() => {
        this.stories = this.stories.filter(story => story._id !== storyToRemove._id);
        this.generateStories2DArray();
      });
    }
  };

  onStoryApprove(storyToApprove: RecentStory) {
    console.log("Approved");
    this.apiAdminService.addAcceptedStory(storyToApprove).subscribe(() => {
      this.stories = this.stories.filter(story => story._id !== storyToApprove._id);
      this.apiAdminService.requestDeleteStory(storyToApprove._id).subscribe();
      this.acceptedStories.push(storyToApprove);
      this.generateStories2DArray();
      this.generateAcceptedStories2DArray();
    })
  };

  onApprovedStoryDelete(storyToRemove: RecentStory) {
    if(confirm("Are you sure you want to delete this story?")) {
      this.acceptedStories = this.acceptedStories.filter(story => story._id !== storyToRemove._id);
      this.apiAdminService.requestDeleteAcceptedStory(storyToRemove._id).subscribe();
      this.generateAcceptedStories2DArray();
    }
  };

  onApprovedStoryHide(story: RecentStory) {
    story.visible = false;
    this.apiAdminService.updateAcceptedStoryVisibility(story._id, false);
  };

  onApprovedStoryShow(story: RecentStory) {
    story.visible = true;
    this.apiAdminService.updateAcceptedStoryVisibility(story._id, true);
  };

  getFormattedDate(postDate: any) {
    const timestamp = Number(postDate);
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  constructor(private apiAdminService: ApiAdminService) {};

  acceptedStories: RecentStory[] = [];
  acceptedStories2DArray: RecentStory[][] = [];
  currentAcceptedStoryPage: number = 0;

  stories: RecentStory[] = [];
  stories2DArray: RecentStory[][] = [];
  currentStoryPage: number = 0;

  applications: ScholarsApplication[] = [];
  applications2DArray: ScholarsApplication[][] = [];
  currentApplicationPage: number = 0;

  acceptedApplications: ScholarsApplication[] = [];
  acceptedApplications2DArray: ScholarsApplication[][] = [];
  currentAcceptedApplicationPage: number = 0;

  rejectedApplications: ScholarsApplication[] = [];
  rejectedApplications2DArray: ScholarsApplication[][] = [];
  currentRejectedApplicationPage: number = 0;

  changeRejectedApplicationPage(page: number) {
    if (page >= 0 && page < this.rejectedApplications2DArray.length) {
      this.currentRejectedApplicationPage = page;
    }
  }

  changeAcceptedApplicationPage(page: number) {
    if (page >= 0 && page < this.acceptedApplications2DArray.length) {
      this.currentAcceptedApplicationPage = page;
    }
  }

  changeApplicationPage(page: number) {
    if (page >= 0 && page < this.applications2DArray.length) {
      this.currentApplicationPage = page;
    }
  }

  changeStoryPage(page: number) {
    if (page >= 0 && page < this.stories2DArray.length) {
      this.currentStoryPage = page;
    }
  }

  changeAcceptedStoryPage(page: number) {
    if (page >= 0 && page < this.acceptedStories2DArray.length) {
      this.currentAcceptedStoryPage = page;
    }
  }

  generateApplications2DArray() {
    this.applications2DArray = [];

    for (let i = 0; i < this.applications.length; i += 10) {
      this.applications2DArray.push(this.applications.slice(i, i + 10));
    }
  }

  generateRejectedApplications2DArray() {
    this.rejectedApplications2DArray = [];

    for (let i = 0; i < this.rejectedApplications.length; i += 10) {
      this.rejectedApplications2DArray.push(this.rejectedApplications.slice(i, i + 10));
    }
  }

  generateAcceptedApplications2DArray() {
    this.acceptedApplications2DArray = [];

    for (let i = 0; i < this.acceptedApplications.length; i += 10) {
      this.acceptedApplications2DArray.push(this.acceptedApplications.slice(i, i + 10));
    }
  }

  generateStories2DArray() {
    this.stories2DArray = [];

    for (let i = 0; i < this.stories.length; i += 10) {
      this.stories2DArray.push(this.stories.slice(i, i + 10));
    }
  }

  generateAcceptedStories2DArray() {
    this.acceptedStories2DArray = [];

    for (let i = 0; i < this.acceptedStories.length; i += 10) {
      this.acceptedStories2DArray.push(this.acceptedStories.slice(i, i + 10));
    }
  }


  
  ngOnInit() {
    forkJoin({
      scholars: this.apiAdminService.getScholars(),
      stories: this.apiAdminService.getStories(),
      acceptedScholars: this.apiAdminService.getAcceptedScholars(),
      acceptedStories: this.apiAdminService.getAcceptedStories(),
      rejectedScholars: this.apiAdminService.getRejectedScholars()
    }).subscribe(
      ({ scholars, stories, acceptedScholars, acceptedStories, rejectedScholars }) => {
        this.applications = scholars;
        this.generateApplications2DArray();

        this.acceptedApplications = acceptedScholars;
        this.generateAcceptedApplications2DArray();

        this.rejectedApplications = rejectedScholars;
        this.generateRejectedApplications2DArray();


        this.stories = stories.map(story => {
          story.postDate = this.getFormattedDate(story.dateInMillis);
          return { ...story };
        });
        this.generateStories2DArray();


        this.acceptedApplications = acceptedScholars;
        this.generateAcceptedApplications2DArray();

        this.acceptedStories = acceptedStories.map(story => {
          story.postDate = this.getFormattedDate(story.dateInMillis);
          return { ...story };
        });
        this.generateAcceptedStories2DArray();
      },
      (error) => {
        console.error('Error loading admin dashboard data:', error);
      }
    );
  }
}
