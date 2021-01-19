import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './component/index/index.component';
import {ListComponent} from './component/list/list.component';
import {DetailComponent} from './component/detail/detail.component';
import {LoginRegComponent} from './component/login-reg/login-reg.component';
import {CreateComponent} from './component/create/create.component';
import {ContactComponent} from './component/contact/contact.component';
import {UserProfileComponent} from './component/user-profile/user-profile.component';
import {UserHouseComponent} from './component/user-house/user-house.component';
import {ChangePassComponent} from './component/change-pass/change-pass.component';
import {AuthGuard} from './helper/auth-guard';
import {LoginGoogleComponent} from "./component/login-google/login-google.component";
import {RentListComponent} from './component/rent-list/rent-list.component';
import {RentedHistoryComponent} from './component/rented-history/rented-history.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'login-google',
    component: LoginGoogleComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginRegComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'user-house',
    component: UserHouseComponent,
  },
  {
    path: 'change-pass',
    component: ChangePassComponent,
  },
  {
    path: 'rent-list',
    component: RentListComponent
  },
  {
    path: 'rented-history',
    component: RentedHistoryComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
