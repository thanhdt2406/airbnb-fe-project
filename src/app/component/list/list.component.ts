import {Component, OnInit} from '@angular/core';
import {ApartmentService} from '../../service/apartment/apartment.service';
import {Apartment} from '../../model/apartment';
import {FormControl, FormGroup} from '@angular/forms';
import {Province} from '../../model/province';
import {District} from '../../model/district';
import {Ward} from '../../model/ward';
import {WardService} from '../../service/ward/ward.service';
import {DistrictService} from '../../service/district/district.service';
import {ProvinceService} from '../../service/province/province.service';
import {Image} from "../../model/image";
import {ImageService} from "../../service/image/image.service";

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  p: number = 1;
  apartments: Apartment[] = [];
  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  pro_id: number = 0;
  dis_id: number = 0;
  images: Image[] = [];
  dateCheckIn: string = '';

  constructor(private apartmentService: ApartmentService,
              private wardService: WardService,
              private districtService: DistrictService,
              private provinceService: ProvinceService,
              private imageService: ImageService) {
    this.getAllProvince();
  }

  ngOnInit(): void {
    $('.selectpicker').selectpicker();
    $('#price-range').slider();
    $('#property-geo').slider();
    $('#min-baths').slider();
    $('#min-bed').slider();
    $(document).ready(function() {


      $('input').iCheck({
        checkboxClass: 'icheckbox_square-yellow',
        radioClass: 'iradio_square-yellow',
        increaseArea: '20%' // optional
      });


      $('.layout-grid').on('click', function() {
        $('.layout-grid').addClass('active');
        $('.layout-list').removeClass('active');

        $('#list-type').removeClass('proerty-th-list');
        $('#list-type').addClass('proerty-th');

      });

      $('.layout-list').on('click', function() {
        $('.layout-grid').removeClass('active');
        $('.layout-list').addClass('active');

        $('#list-type').addClass('proerty-th-list');
        $('#list-type').removeClass('proerty-th');

      });

    });
    $(document).ready(function() {
      $('#bg-slider').owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        autoPlay: 5000,
        paginationSpeed: 100,
        singleItem: true,
        mouseDrag: false,
        transitionStyle: 'fade'
        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
      });
      $('#prop-smlr-slide_0').owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        pagination: true,
        paginationSpeed: 100,
        items: 3

      });
      $('#testimonial-slider').owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        pagination: true,
        paginationSpeed: 100,
        items: 3
      });

      $('#price-range').slider();
      $('#property-geo').slider();
      $('#min-baths').slider();
      $('#min-bed').slider();

      var RGBChange = function() {
        $('#RGB').css('background', '#FDC600');
      };

      // Advanced search toggle
      var $SearchToggle = $('.search-form .search-toggle');
      $SearchToggle.hide();

      $('.search-form .toggle-btn').on('click', function(e: any) {
        e.preventDefault();
        $SearchToggle.slideToggle(300);
      });

      setTimeout(function() {
        $('#counter').text('0');
        $('#counter1').text('0');
        $('#counter2').text('0');
        $('#counter3').text('0');
        setInterval(function() {
          var curval = parseInt($('#counter').text());
          var curval1 = parseInt($('#counter1').text().replace(' ', ''));
          var curval2 = parseInt($('#counter2').text());
          var curval3 = parseInt($('#counter3').text());
          if (curval <= 1007) {
            $('#counter').text(curval + 1);
          }
          if (curval1 <= 1280) {
            $('#counter1').text(sdf_FTS((curval1 + 20), 0, ' '));
          }
          if (curval2 <= 145) {
            $('#counter2').text(curval2 + 1);
          }
          if (curval3 <= 1022) {
            $('#counter3').text(curval3 + 1);
          }
        }, 2);
      }, 500);

      function sdf_FTS(_number: any, _decimal: any, _separator: any) {
        var decimal = (typeof (_decimal) != 'undefined') ? _decimal : 2;
        var separator = (typeof (_separator) != 'undefined') ? _separator : '';
        var r = parseFloat(_number);
        var exp10 = Math.pow(10, decimal);
        r = Math.round(r * exp10) / exp10;
        let rr = Number(r).toFixed(decimal).toString().split('.');
        let b = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '\$1' + separator);
        // @ts-ignore
        r = (rr[1] ? b + '.' + rr[1] : b);

        return r;
      }

    });

    $(function() {
      'use strict';
      var nowTemp = new Date();
      var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

      var checkin = $('#timeCheckIn').datepicker({
        onRender: function(date: any) {
          return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
      }).on('changeDate', function(ev: any) {
        if (ev.date.valueOf() > checkout.date.valueOf()) {
          var newDate = new Date(ev.date);
          newDate.setDate(newDate.getDate() + 1);
          checkout.setValue(newDate);
          let value = newDate;
          // @ts-ignore

          console.log(newDate);
        }
        checkin.hide();
        $('#timeCheckOut')[0].focus();
      }).data('datepicker');
      var checkout = $('#timeCheckOut').datepicker({
        onRender: function(date: any) {
          return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
        }
      }).on('changeDate', function (ev: any) {
        checkout.hide();
      }).data('datepicker');
    });

    this.getAllApartment();
  }

  getAllApartment() {
    this.apartmentService.getAllApartment().subscribe(rs => {
      this.apartments = rs;
      for (let i = 0; i < this.apartments.length; i++) {
        // @ts-ignore
        this.imageService.getAllByApartment(this.apartments[i].id).subscribe(images => {
          this.apartments[i].avatar = images[0].image;
        })
      }
    });
  }

  getAllProvince() {
    this.provinceService.getAllProvince().subscribe(provinceList => {
      this.provinces = provinceList;
      // @ts-ignore
    });
  }

  getAllDistrictsByProvinceId(id: number) {
    this.districtService.getDistrictByProvinceId(id).subscribe(districtList => {
      // @ts-ignore
      this.districts = districtList;
      this.wards = [];
    });
  }

  getAllWardsByDistrictId(id: number) {
    this.wardService.getAllWardByDistricts(id).subscribe(wardList => {
      this.wards = wardList;
    });
  }

  submitSearch() {
    let bath = '';
    let bed = '';
    let pro_id = '';
    let dis_id = '';
    let ward_id = '';
    let check_in = '';
    let check_out = '';
    let vipRoom = '';
    let luxuryRoom = '';
    let singleRoom = '';
    let coupleRoom = '';
    let presidentRoom = '';
    let priceArray = $('#price-range').val().split(',');
    let min_price = '';
    let max_price = '';

    bath = $('#min-baths').val();
    bed = $('#min-bed').val();
    pro_id = $('#pro_id').val();
    dis_id = $('#dis_id').val();
    ward_id = $('#ward_id').val();
    check_in = $('#timeCheckIn').val();
    check_out = $('#timeCheckOut').val();
    vipRoom = $('#vipRoom').val();
    luxuryRoom = $('#luxuryRoom').val();
    singleRoom = $('#singleRoom').val();
    coupleRoom = $('#coupleRoom').val();
    presidentRoom = $('#presidentRoom').val();
    min_price = priceArray[0];
    max_price = priceArray[1];

    if (pro_id === null) {
      pro_id = '';
    }
    if (dis_id === null) {
      dis_id = '';
    }

    // @ts-ignore
    this.apartmentService.searchApartmentByCondition(pro_id, dis_id, ward_id, bath, check_in,check_out, vipRoom, luxuryRoom, singleRoom,coupleRoom, presidentRoom, min_price, max_price).subscribe(apartments => { this.apartments = apartments; });
  }

  pageChanged(event: any){
    // @ts-ignore
    this.config.currentPage = event;
  }

}
