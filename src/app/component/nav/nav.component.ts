import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  returnUrl: string = '';

  constructor(private authService:AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public logout(){
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || "/";
    this.authService.logout();
    this.router.navigate([this.returnUrl]);
  }
}
