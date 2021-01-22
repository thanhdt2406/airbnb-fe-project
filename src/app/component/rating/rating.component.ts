import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Rating} from "../../model/rating";
import {Rent} from "../../model/rent";
import {ActivatedRoute} from "@angular/router";
import {RentService} from "../../service/rent/rent.service";
import {RatingService} from "../../service/rating/rating.service";
import {User} from "../../model/user";
import {Apartment} from "../../model/apartment";

declare var $: any;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  currentUser = this.authService.currentUserValue;
  rentID: number = -1;
  currentRent: Rent = {};
  rent: Rent = {
    id: 0,
    user: this.currentUser,
    apartment: {},
    endDate: '',
    startDate: '',
    createDate: 'string'
  };
  star: number = 3;
  content: string = 'say somthing...';
  rating: Rating = {};

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private rentService: RentService,
              private ratingService: RatingService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.rentID = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.rentService.getRentById(this.rentID).subscribe(rent => {
      this.rating.rent = rent;
    })
  }

  getStar() {
    this.star = $('input[name=star]:checked').val();
    this.rating.star = this.star;
  }

  getContent() {
    this.rating.content = this.content;
  }

  submit() {
    this.getStar();
    this.getContent();
    this.rating.user = this.currentUser;
    this.rating.ratingDate = new Date();
    this.ratingService.addNewRating(this.rating).subscribe(() => {
      alert("success!");
    }, error => {
      alert("fail!");
    });
  }
}
