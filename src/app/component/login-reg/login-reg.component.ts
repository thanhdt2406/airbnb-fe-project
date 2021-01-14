import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {first} from 'rxjs/operators';

declare var $: any;
let isValidated = true;

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
  output = '';
  loginFail: string = '';
  user: User = {
    id: 0
  };
  submitted = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  loginForm: FormGroup = new FormBuilder().group({});
  loading = false;
  returnUrl: string = '';
  error = '';

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    $(document).ready(function() {
      $('#register-form').validate({
        rules: {
          name: {
            required: true,
            minlength: 6,
            maxlength: 20,
          },
          password: {
            required: true,
            minlength: 6,
            maxlength: 20,
          },
          confirmPassword: {
            required: true,
            equalTo: '#password'
          }
        },
        messages: {
          name: {
            required: 'Hãy nhập tên tài khoản',
            minlength: 'Bạn phải nhập tối thiểu 6 ký tự',
            maxlength: 'Bạn chỉ được nhập tối đa 20 ký tự'
          },
          password: {
            required: 'Hãy nhập password',
            minlength: 'Bạn phải nhập tối thiểu 6 ký tự',
            maxlength: 'Bạn chỉ được nhập tối đa 20 ký tự'
          },
          confirmPassword: {
            required: 'Hãy nhập lại mật khẩu',
            equalTo: 'Mật khẩu không khớp'
          }
        }
      });

    });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  createUser() {
    this.user = {
      username: this.registerForm.value.name,
      password: this.registerForm.value.password
    };
    console.log(this.user);
    if (this.registerForm.invalid) {
      return;
    } else {
      this.userService.registerUser(this.user).subscribe(() => {
        this.output = 'Tạo Tài Khoản Thành Công';
      },()=>{
        console.log(1);
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  public login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Đăng nhập thành công!');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
          this.loginFail = 'Sai tên đăng nhập hoặc mật khẩu! Vui lòng đăng nhập lại...';
          this.router.navigate(['/login']);
        });
  }

}
