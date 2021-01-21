import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {first} from 'rxjs/operators';
import {User} from '../../model/user';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  // @ts-ignore
  userId: number = this.authService.currentUserValue.id;
  currentUser: User = {};
  myForm: FormGroup;
  notExist: string = '';
  notMinLength: string = '';
  output: string  = '';

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) {
    this.myForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});
    this.getCurrentUser();
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.newPassword.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  ngOnInit() {
  }

  changePassword() {
    console.log(this.currentUser);
    if (this.myForm.invalid) {
      return;
    }
    if (this.myForm.controls.newPassword.value.length < 6) {
      this.notMinLength = 'Mật khẩu mới phải có tối thiểu 6 ki tự';
      return;
    }
    // if (this.myForm.controls.newPassword.value != this.currentUser.password) {
    //   this.notExist = 'Wrong password!';
    //   return;
    // }
    this.currentUser.password = this.myForm.controls.newPassword.value;
    this.userService.changePassword(this.currentUser).subscribe(data => {
      if(data === "Wrong password"){
        // @ts-ignore
        this.output = data;
      }else{
        alert('Đổi mật khẩu thành công!');
        this.router.navigate(['/']);
      }

    });
  }

  getCurrentUser() {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.currentUser = data;
    });
  }
}
