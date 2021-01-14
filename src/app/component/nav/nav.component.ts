import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // @ts-ignore
  currentUser = this.authService.currentUserValue;
  returnUrl: string = '';

  constructor(private authService:AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.currentUser);
  }

  public login(){
    // this.currentUser = this.authService.currentUserValue;
    // this.isLogined = false;
  }

  public logout(){
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || "/";
    this.authService.logout();
    this.currentUser = {};
    this.router.navigate([this.returnUrl]);
  }

}
