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


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
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
    path: 'user-frofile',
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
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
