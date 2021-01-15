import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    avatar: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });

  id: number = -1;
  currentUser = this.authService.currentUserValue;
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('#uerProfile-form').validate({
        rules: {
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          phone_number: {
            required: true,
            minlength: 10,
            maxlength: 11,
          },
          avatar: {
            required: true
          },
          address: {
            required: true
          },

        },
        messages: {
          name: {
            required: 'hãy nhập tên của bạn'
          },
          email: {
            required: 'hãy nhập email của bạn',
            email: 'bạn phải nhập đúng định dạng email'
          },
          phone_number: {
            required: 'hãy nhập số điện thoại của bạn',
            minlength: 'bạn phải nhập tối thiểu 10 số',
            maxlength: 'bạn chỉ được nhập tối đa 11 số',
          },
          avatar: {
            required: 'hãy chọn ảnh đại diện của bạn'
          },
          address: {
            required: 'hãy nhập địa chỉ của bạn'
          },

        }
      });

    });

    this.activatedRoute.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = +paramMap.get('id');
    });
  }

  getUserById(id: number) {
    return this.userService.getUserById(id).toPromise();
  }

}
