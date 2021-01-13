import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
let isValidated = true;
@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
  output = '';
  user: User = {};
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  createUser() {
    this.user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password
    };
    if (this.userForm.invalid){
      return;
    }else {
      this.userService.registerUser(this.user).subscribe(output=> {this.output = 'Tạo Tài Khoản Thành Công'; });
    }
  }

}
