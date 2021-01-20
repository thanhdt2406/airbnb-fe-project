import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../model/apartment";
import {ApartmentService} from "../../service/apartment/apartment.service";
import {ActivatedRoute, Route} from "@angular/router";
import {ImageService} from '../../service/image/image.service';
import {Image} from '../../model/image';
import {UserService} from '../../service/user/user.service';
import {User} from '../../model/user';
import {AuthService} from '../../service/auth/auth.service';
import {Comment} from '../../model/comment';
import {CommentService} from '../../service/comment/comment.service';
import {RentService} from '../../service/rent/rent.service';
import {Rent} from '../../model/rent';

declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  checkinCheck = true;
  checkoutCheck = true;
  p: number = 1;
  apartment = {
    id: -1,
    name: "",
    description: "",
    bedroom: "",
    bathroom: "",
    value: "",
    address: "",
    vipRoom: 0,
    luxuryRoom: 0,
    singleRoom: 0,
    presidentRoom: 0,
    coupleRoom: 0,
    status: -1,
    ward: {
      name: "",
      district: {
        name: "",
        province: {
          name: ""
        }
      }
    },
    user: {
      id: -1
    }
  };
  // @ts-ignore
  id: number;
  images: Image[] = [];
  user: User = {};
  // @ts-ignore
  userId: number = this.authService.currentUserValue.id;
  currentUser: User = {};
  // @ts-ignore
  comments: Comment[] = [];
  commentContent: string = '';
  message: string = '';
  isShow: boolean = false;
  rents: Rent[] = [];

  constructor(private apartmentService: ApartmentService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              private userService: UserService,
              private authService: AuthService,
              private commentService: CommentService,
              private rentService: RentService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      // @ts-ignore
      this.id = +paramMap.get('id');
    })
    // @ts-ignore
    this.getApartment(this.id);
    this.getCurrentUser();
    // @ts-ignore
    $(function () {
      'use strict';
      var nowTemp = new Date();
      var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
      var checkin = $('#timeCheckIn').datepicker({
        onRender: function (date: any) {
          return date.valueOf() <= now.valueOf() ? 'disabled' : '';
        }
      }).on('changeDate', function (ev: any) {
        if (ev.date.valueOf() > checkout.date.valueOf()) {
          var newDate = new Date(ev.date)
          newDate.setDate(newDate.getDate() + 1);
          checkout.setValue(newDate);
        }
        checkin.hide();
        $('#timeCheckOut')[0].focus();
      }).data('datepicker');
      var checkout = $('#timeCheckOut').datepicker({
        onRender: function (date: any) {
          return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
        }
      }).on('changeDate', function (ev: any) {
        checkout.hide();
      }).data('datepicker');
    });
  }

  slickImage() {
    $('#image-gallery').lightSlider({
      gallery: true,
      item: 1,
      thumbItem: 9,
      slideMargin: 0,
      speed: 1200,
      auto: true,
      loop: true,
      pause: 5000,
      onSliderLoad: function () {
        $('#image-gallery').removeClass('cS-hidden');
      }
    });
  }

  // @ts-ignore
  getApartment() {
    this.apartmentService.getApartmentById(this.id).subscribe(value => {
      // @ts-ignore
      this.apartment = value;
      this.getImageByApartment(value);
      // @ts-ignore
      this.getUserByApartment(value);
      this.getAllCommentByApartmentId(value);
      this.getAllRentedByApartment(value);
    });
  }

  getCurrentUser(){
    this.userService.getUserById(this.userId).subscribe(data=>{
      this.currentUser = data;
    })
  }

  getImageByApartment(ap: Apartment) {
    // @ts-ignore
    this.imageService.getAllByApartment(ap.id).subscribe(data => {this.images = data;
      this.slickImage();
    });
  }

  getUserByApartment(ap: Apartment) {
    // @ts-ignore
    this.userService.getUserById(ap.user.id).subscribe(user => {this.user = user});
  }

  submitComment(){
    const comment = {
      content: this.commentContent,
      apartment: {
        id: this.apartment.id,
      },
      user: {
        id: this.currentUser.id,
      }
    }
    // @ts-ignore
    this.commentService.createApartment(comment).subscribe(()=>{
      // @ts-ignore
      this.getAllCommentByApartmentId(this.apartment);
    });
    // @ts-ignore

  }

  getAllCommentByApartmentId(apartment:Apartment) {
    // @ts-ignore
    this.commentService.getCommentByApartmentId(apartment.id).subscribe(data => { this.comments = data})
  }

  rentApartment() {
    let checkin = $('#timeCheckIn').val().split("/");
    let checkout = $('#timeCheckOut').val().split("/");
    let date1 = checkin[2] + '-' + checkin[0] + '-' + checkin[1];
    let date2 = checkout[2] + '-' + checkout[0] + '-' + checkout[1];
    let mouthCheckin = parseInt(checkin[0][1]) - 1
    let mouthCheckout = parseInt(checkout[0][1]) - 1
    let checkDate1  = new Date(checkin[2], mouthCheckin, checkin[1], 7, 0, 0, 0);
    console.log(checkDate1)
    let checkDate2  = new Date(checkout[2], mouthCheckout, checkout[1], 7, 0, 0, 0);
    console.log(checkDate2)
    for (let i = 0; i < this.rents.length ; i ++){
      // @ts-ignore
      if (!this.checkDate(checkDate1, this.rents[i])){
        // @ts-ignore
        this.checkinCheck = false;
        break
      }else {
        this.checkoutCheck = true;
      }
    }
    console.log(this.rents);
    for (let i = 0; i < this.rents.length ; i ++){
      // @ts-ignore
      if (!this.checkDate(checkDate2, this.rents[i])){
        // @ts-ignore
        this.checkoutCheck = false;
        break
      }else {
        this.checkoutCheck = true;
      }
    }

    const rent = {
      startDate: date1,
      endDate: date2,
      user: this.currentUser,
      apartment: this.apartment,
    }

    if (this.checkinCheck && this.checkoutCheck) {
      // @ts-ignore
      this.rentService.saveRent(rent).subscribe(() => {
        // @ts-ignore
        this.message = 'Đặt nhà thành công';
        this.rentingApartment();
        this.activatedRoute.paramMap.subscribe( paramMap => {
          // @ts-ignore
          this.id = +paramMap.get('id');
        })
        // @ts-ignore
        this.getApartment(this.id);
      });
    }else {
      this.message = 'Chọn lại, ngu';
    }
  }

  checkDate(value: Date, rent: Rent): boolean {

    // @ts-ignore
    if (value >= new Date(rent.startDate) && value <= new Date(rent.endDate)){
      return false;
    }
    return true;
  }

  rentingApartment() {
    this.apartmentService.renting(this.apartment.id).subscribe(() => {
      console.log("dê")
    });
  }

  showHide() {
    this.isShow = !this.isShow;
  }

  getAllRentedByApartment(ap: Apartment) {
    // @ts-ignore
    this.rentService.getAllRentedByApartment(ap.id).subscribe(data => {
      this.rents = data;
    })
  }
}
