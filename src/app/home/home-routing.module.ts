import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then( m => m.OverviewPageModule)
      },
      {
        path: 'upcoming',
        loadChildren: () => import('./upcoming/upcoming.module').then( m => m.UpcomingPageModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
      },
      {
        path: 'learn',
        loadChildren: () => import('./learn/learn.module').then( m => m.LearnPageModule)
      },
      {
        path: '**',
        redirectTo: '/home/overview',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
