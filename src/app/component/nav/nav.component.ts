import {Component, OnInit} from '@angular/core';
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
  isUserLoggedIn = false;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if (this.currentUser) {
        this.isUserLoggedIn = true;
      }
    });

  }

  ngOnInit(): void {
  }

  public logout() {
    if (confirm('Bạn có chắc rằng muốn đăng xuất không?')) {
      alert("Đăng xuất thành công!");
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
      this.authService.logout();
      this.isUserLoggedIn = false;
      this.router.navigate([this.returnUrl]);
    }
  }

}
