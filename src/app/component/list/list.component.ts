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
import {Image} from '../../model/image';
import {ImageService} from '../../service/image/image.service';
import {SearchCondition} from '../../model/search-condition';

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
  searchCondition: SearchCondition = {};

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
      }).on('changeDate', function(ev: any) {
        checkout.hide();
      }).data('datepicker');
    });

    this.getAllApartment();
  }

  getAllApartment() {
    this.apartmentService.getAllApartment().subscribe(rs => {
      this.apartments = rs;
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
    let bath;
    let bed;
    let pro_id;
    let dis_id;
    let ward_id;
    let check_in;
    let check_out;
    let vipRoom;
    let luxuryRoom;
    let singleRoom;
    let coupleRoom;
    let presidentRoom;
    let priceArray = $('#price-range').val().split(',');
    let min_price;
    let max_price;

    if ($('#input-bathroom').val() === '') {
      bath = null;
    } else {
      bath = $('#input-bathroom').val();
    }
    if ($('#input-bedroom').val() === '') {
      bed = null;
    } else {
      bed = $('#input-bedroom').val();
    }
    if ($('#ward_id').val() === '') {
      ward_id = null;
    } else {
      ward_id = $('#ward_id').val();
    }

    if ($('#timeCheckIn').val() === '') {
      let checkInArray = new Date().toDateString().split(' ');
      check_in = checkInArray[3].concat("-",this.convertMonthToNumber(checkInArray[1]),"-",checkInArray[2]);
    } else {
      let checkInArray = new Date($('#timeCheckIn').val()).toDateString().split(' ');
      check_in = checkInArray[3].concat("-",this.convertMonthToNumber(checkInArray[1]),"-",checkInArray[2]);
    }
    if ($('#timeCheckOut').val() === '') {
      let checkOutArray = new Date('2099-12-31').toDateString().split(' ');
      check_out = checkOutArray[3].concat("-",this.convertMonthToNumber(checkOutArray[1]),"-",checkOutArray[2]);
    } else {
      let checkOutArray = new Date($('#timeCheckOut').val()).toDateString().split(' ');
      check_out = checkOutArray[3].concat("-",this.convertMonthToNumber(checkOutArray[1]),"-",checkOutArray[2]);
    }

    if ($('#vipRoom').val() === '') {
      vipRoom = null;
    } else {
      vipRoom = $('#vipRoom').val();
    }
    if ($('#luxuryRoom').val() === '') {
      luxuryRoom = null;
    } else {
      luxuryRoom = $('#luxuryRoom').val();
    }
    if ($('#singleRoom').val() === '') {
      singleRoom = null;
    } else {
      singleRoom = $('#singleRoom').val();
    }
    if ($('#coupleRoom').val() === '') {
      coupleRoom = null;
    } else {
      coupleRoom = $('#coupleRoom').val();
    }
    if ($('#presidentRoom').val() === '') {
      presidentRoom = null;
    } else {
      presidentRoom = $('#presidentRoom').val();
    }

    pro_id = $('#pro_id').val();
    dis_id = $('#dis_id').val();
    min_price = priceArray[0];
    max_price = priceArray[1];

    this.searchCondition = {
      province: pro_id,
      district: dis_id,
      ward: ward_id,
      bathroom: bath,
      bedroom: bed,
      vipRoom: vipRoom,
      luxuryRoom: luxuryRoom,
      singleRoom: singleRoom,
      coupleRoom: coupleRoom,
      presidentRoom: presidentRoom,
      minPrice: min_price,
      maxPrice: max_price,
      checkIn: check_in,
      checkOut: check_out
    };

    // this.searchCondition = {
    //   province: ,
    //   district: 1,
    //   ward: 1,
    //   // @ts-ignore
    //   bathroom: null,
    //   // @ts-ignore
    //   bedroom: null,
    //   minPrice: 0,
    //   maxPrice: 5000,
    //   vipRoom: 0,
    //   // @ts-ignore
    //   luxuryRoom: null,
    //   // @ts-ignore
    //   singleRoom: null,
    //   // @ts-ignore
    //   coupleRoom: null,
    //   // @ts-ignore
    //   presidentRoom: null,
    //   // @ts-ignore
    //   checkIn: null,
    //   // @ts-ignore
    //   checkOut: null
    // };

    this.apartmentService.searchApartmentByCondition(this.searchCondition).subscribe(data => {
      this.apartments = data;
      console.log(1);
    });
  }

  pageChanged(event: any) {
    // @ts-ignore
    this.config.currentPage = event;
  }

  convertMonthToNumber(month: string){
    let number = "01";
    switch (month){
      case 'Jan': {
        number = "01";
        break;
      }
      case 'Feb': {
        number = "02";
        break;
      }
      case 'Mar': {
        number = "03";
        break;
      }
      case 'Apr': {
        number = "04";
        break;
      }
      case 'May': {
        number = "05";
        break;
      }
      case 'Jun': {
        number = "06";
        break;
      }
      case 'Jul': {
        number = "07";
        break;
      }
      case 'Aug': {
        number = "08";
        break;
      }
      case 'Sep': {
        number = "09";
        break;
      }
      case 'Oct': {
        number = "10";
        break;
      }
      case 'Nov': {
        number = "11";
        break;
      }
      case 'Dec': {
        number = "12";
        break;
      }
    }
    return number;
  }

}
