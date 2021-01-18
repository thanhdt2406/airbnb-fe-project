import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApartmentService} from "../../service/apartment/apartment.service";
import {first} from "rxjs/operators";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnInit {
  code: string = "";
  code1: string = '';
  returnUrl: string = '';
  error = '';
  loading = false;
  loginFail: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.activatedRoute.queryParams.subscribe(params => {
        this.code = 'code=' + params['code'];
      });
    });
    this.logingg();
    // @ts-ignore
    this.code1 = encodeURIComponent(this.code).replace('%2');
    this.code1 = "?code=4%2F0AY0e-g4UcClbPoKYYZrrK4lWN_GFTRf1QRf3-HahrHddQudvdgV6heT8m9r-90LKrE15WQ&scope=email%20https:%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20openid&authuser=0&prompt=consent";
  }

  ngOnInit(): void {
  }

  public logingg() {
    this.authService.login_gg(this.code)
      .pipe(first())
      .subscribe(
        data => {
          alert('Đăng nhập thành công!');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
          alert('xảy ra lỗi! Vui lòng đăng nhập lại...');
          //this.router.navigate(['/login']);
        });
  }
}
