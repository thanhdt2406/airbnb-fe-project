import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../model/apartment";
import {ApartmentService} from "../../service/apartment/apartment.service";
import {ActivatedRoute, Route} from "@angular/router";
import {ImageService} from '../../service/image/image.service';
import {Image} from '../../model/image';

declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  apartment = {
    name: "",
    description: "",
    bedroom: "",
    bathroom: "",
    value: "",
    address: "",
    vipRoom: 0,
    pr: 0,
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

  constructor(private apartmentService: ApartmentService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      // @ts-ignore
      this.getApartment(this.id);
      // @ts-ignore
    })
    $(document).ready(function () {
      $('#image-gallery').lightSlider({
        gallery: true,
        item: 1,
        thumbItem: 9,
        slideMargin: 0,
        speed: 800,
        auto: true,
        loop: true,
        onSliderLoad: function () {
          $('#image-gallery').removeClass('cS-hidden');
        }
      });
    });

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

// @ts-ignore
  getApartment() {
    this.apartmentService.getApartmentById(this.id).subscribe(value => {
      // @ts-ignore
      this.apartment = value;
      this.getImageByApartment(value);
    });
  }

  getImageByApartment(ap: Apartment) {
    // @ts-ignore
    this.imageService.getAllByApartment(ap.id).subscribe(data => {this.images = data;
    });
  }

  rentApartment(){

  }
}
