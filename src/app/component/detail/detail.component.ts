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

declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
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
    user: null,
    ward: {
      name: "",
      district: {
        name: "",
        province: {
          name: ""
        }
      }
    }
  };
  // @ts-ignore
  id: number;
  images: Image[] = [];
  user: User = {};

  currentUser: User = this.authService.currentUserValue;
  // @ts-ignore
  comments: Comment[] = [];
  commentContent: string = '';
  constructor(private apartmentService: ApartmentService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              private userService: UserService,
              private authService: AuthService,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      // @ts-ignore
      this.id = +paramMap.get('id');
    })
    // @ts-ignore
    this.getApartment(this.id);
    $(function () {
      'use strict';
      var nowTemp = new Date();
      var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

      var checkin = $('#timeCheckIn').datepicker({
        onRender: function (date: any) {
          return date.valueOf() < now.valueOf() ? 'disabled' : '';
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
      speed: 1200 ,
      auto: true,
      loop: true,
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
    });
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
    this.commentService.createApartment(comment).subscribe(this.getAllCommentByApartment(this.id))
  }

  getAllCommentByApartment(id: number) {
    this.commentService.getComment(this.apartment.id).subscribe(data => {this.comments = data})
  }
}
