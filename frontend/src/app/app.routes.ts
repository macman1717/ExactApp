import { Routes } from '@angular/router';
import {HelloWorldComponent} from "./pages/hello-world/hello-world.component";
import {HomeComponent} from "./pages/home/home.component";
import {StudentToolboxPageComponent} from "./pages/student-toolbox-page/student-toolbox-page.component";
import {FacultyToolboxComponent} from "./pages/faculty-toolbox-page/faculty-toolbox-page.component";
import {FaqPageComponent} from "./pages/faq-page/faq-page.component";
import {GoalsPageComponent} from "./pages/goals-page/goals-page.component";
import {LibraryPageComponent} from "./pages/library-page/library-page.component";
import {ScholarsPageComponent} from "./pages/scholars-page/scholars-page.component";
import {TeamPageComponent} from "./pages/team-page/team-page.component";
import { ExperientialLearningPageComponent } from './pages/experiential-learning-page/experiential-learning-page.component';
import {StudentApplicationPageComponent} from "./pages/student-application-page/student-application-page.component";
import { AdminDashboardPageComponent } from './pages/admin-dashboard-page/admin-dashboard-page.component';
import { RecentStoriesPageComponent } from './pages/recent-stories-page/recent-stories-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  //placeholder for when backend is implemented
  { path: 'exact/hello-world', component: HelloWorldComponent },

  { path: 'exact', component: HomeComponent },
  { path: 'exact/faculty-toolbox', component: FacultyToolboxComponent },
  { path: 'exact/faq', component: FaqPageComponent },
  { path: 'exact/goals', component: GoalsPageComponent },
  { path: 'exact/recent-stories', component: RecentStoriesPageComponent },
  { path: 'exact/library', component: LibraryPageComponent },
  { path: 'exact/scholars', component: ScholarsPageComponent },
  { path: 'exact/team', component: TeamPageComponent },
  { path: 'exact/student-toolbox', component: StudentToolboxPageComponent },
  { path: 'exact/student-application', component: StudentApplicationPageComponent },
  { path: 'exact/experiential-learning', component: ExperientialLearningPageComponent },
  { path: 'exact/login', component: LoginPageComponent },

  {
      path: 'exact/admin-dashboard',
      loadComponent: () =>
          import('./pages/admin-dashboard-page/admin-dashboard-page.component').then(
              (m) => m.AdminDashboardPageComponent
          ),
      canActivate: [authGuard],
  },

];
