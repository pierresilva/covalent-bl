import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeHomeComponent } from './components/home-home/home-home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeHomeComponent,
    data: {
      title: 'app.home',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
