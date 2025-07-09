import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { OrganizerDashboardComponent } from './pages/organizer-dashboard/organizer-dashboard.component';
import { EventStatisticsComponent } from './pages/event-statistics/event-statistics.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EmployeeGuard } from './guards/employee.guard';
import { OrganizerGuard } from './guards/organizer.guard';
import { OrganizerCheckinComponent } from './pages/organizer-checkin/organizer-checkin.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: EmployeeDashboardComponent, canActivate: [EmployeeGuard] },
  { path: 'organizer', component: OrganizerDashboardComponent, canActivate: [OrganizerGuard] },
  { path: 'organizer/statistics', component: EventStatisticsComponent, canActivate: [OrganizerGuard] },
  { path: 'organizer/checkin/:id', component: OrganizerCheckinComponent, canActivate: [OrganizerGuard] },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
