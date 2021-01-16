import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  imgSrc: string = '';
  id: number = -1;
  selectedImages: any = null;
  userId = this.authService.currentUserValue.id;
  // @ts-ignore
  currentUser: User;
  userProfileForm: FormGroup = new FormGroup({});

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private storage: AngularFireStorage,
              private router: Router) {
    this.getCurrentUser();
  }

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
  }

  getUserById(id: number) {
    return this.userService.getUserById(id).toPromise();
  }

  updateUserProfile(id: number) {
    const userProfile: User = {
      id: this.currentUser.id,
      name: this.userProfileForm.value.name === '' ? this.currentUser.name : this.userProfileForm.value.name,
      email: this.userProfileForm.value.email === '' ? this.currentUser.email : this.userProfileForm.value.email,
      phoneNumber: this.userProfileForm.value.phone_number === '' ? this.currentUser.phoneNumber : this.userProfileForm.value.phone_number,
      address: this.userProfileForm.value.address === '' ? this.currentUser.address : this.userProfileForm.value.address,
    };
    this.userService.updateUserById(id, userProfile).toPromise();
  }

  submit() {
    if (this.selectedImages !== null) {
      const filePath = `${this.currentUser.username}/${this.selectedImages.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImages).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async url => {
            this.currentUser.avatar = url;
            // @ts-ignore
            await this.updateUserProfile(this.currentUser.id);
            alert('Success!');
            this.router.navigate(['/']);
          });
        })
      ).subscribe();
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files[0];
    } else {
      this.selectedImages = null;
    }
  }

  getCurrentUser() {
    // @ts-ignore
    this.userService.getUserById(this.userId).subscribe(data => {
      this.currentUser = data;
      this.userProfileForm = new FormGroup({
        name: new FormControl(this.currentUser.name, Validators.required),
        email: new FormControl(this.currentUser.email, [Validators.required, Validators.email]),
        phone_number: new FormControl(this.currentUser.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
        avatar: new FormControl(this.currentUser.avatar, Validators.required),
        address: new FormControl(this.currentUser.address, Validators.required)
      });
    });
  }


}
