import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../service/image/image.service';
import {WardService} from '../../service/ward/ward.service';
import {DistrictService} from '../../service/district/district.service';
import {ProvinceService} from '../../service/province/province.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ApartmentService} from '../../service/apartment/apartment.service';
import {Province} from '../../model/province';
import {District} from '../../model/district';
import {Ward} from '../../model/ward';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Apartment} from '../../model/apartment';
import {Image} from '../../model/image';
import {finalize} from 'rxjs/operators';


declare var $: any;
declare var Swal: any;

let wardId: number = -1;
let isValidated = true;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  pro_id: number = 1;
  dis_id: number = 5;
  apartForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    bathroom: new FormControl(''),
    bedroom: new FormControl(''),
    description: new FormControl(''),
    ward: new FormControl()
  });  selectedImages: any[] = [];
  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];

  constructor(private imageService: ImageService,
              private wardService: WardService,
              private districtService: DistrictService,
              private provinceService: ProvinceService,
              private apartmentService: ApartmentService,
              private storage: AngularFireStorage) {
  this.getAllProvince();
  }

  ngOnInit(): void {
    this.getAllDistrictsByProvinceId(1);
    this.getAllWardsByDistrictId(1);
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
      $("#bg-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        autoPlay: 5000,
        paginationSpeed: 100,
        singleItem: true,
        mouseDrag: false,
        transitionStyle: "fade"
        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
      });
      $("#prop-smlr-slide_0").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        pagination: true,
        paginationSpeed: 100,
        items: 3

      });
      $("#testimonial-slider").owlCarousel({
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
        $('#RGB').css('background', '#FDC600')
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
        var r = parseFloat(_number)
        var exp10 = Math.pow(10, decimal);
        r = Math.round(r * exp10) / exp10;
        let rr = Number(r).toFixed(decimal).toString().split('.');
        let b = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '\$1' + separator);
        // @ts-ignore
        r = (rr[1] ? b + '.' + rr[1] : b);

        return r;
      }

    })
    //name: new FormControl(''),
    //     address: new FormControl(''),
    //     bathroom: new FormControl(''),
    //     bedroom: new FormControl(''),
    //     description: new FormControl(''),
    //     ward:

    $(document).ready(function() {
      $('#apartment-form').validate({
        rules: {
          name: {
            required: true,
          },
          address: {
            required: true,

          },
          bathroom: {
            required: true,
          },
          bedroom: {
            required: true,
          },
          description: {
            required: true,
          },
          ward: {
            required: true,
          }

        },
        messages: {
          name: {
            required: 'Bạn không được để trống mục này',
          },
          address: {
            required: 'Bạn không được để trống mục này',
          },
          bathroom: {
            required: 'Bạn không được để trống mục này',
          },
          bedroom: {
            required: 'Bạn không được để trống mục này',
          },
          description: {
            required: 'Bạn không được để trống mục này',
          },
          ward: {
            required: 'Bạn phải chọn tỉnh/thành phố, huyện/quận, xã ',
          },

        }
      });

    });

  }

  async createImage() {
    const apartment = await this.createApartment();
    if (apartment != null) {
      if (this.selectedImages.length !== 0) {
        // this.apartForm.reset();
        // $('.textarea').summernote('reset');
        for (let selectedImage of this.selectedImages) {
          const filePath = `${apartment.name}/${selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                const image: Image = {
                  image: url,
                  apartment: {
                    id: apartment.id
                  }
                };
                this.imageService.createImage(image).subscribe(() => {
                }, () => {
                });
              });
            })
          ).subscribe();
        }
        $(function () {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'success',
            title: 'Tạo mới thành công'
          });
        });
      }
    } else {
      $(function () {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'error',
          title: 'Tạo mới thất bại'
        });
      });
    }
  }


  // @ts-ignore
  createApartment() {
    const apartment: Apartment = {
      name: this.apartForm.value.name,
      address: this.apartForm.value.address,
      bathroom: this.apartForm.value.bathroom,
      bedroom: this.apartForm.value.bedroom,
      description: this.apartForm.value.description,
      ward: {
        id: wardId
      }
    };
    if (isValidated) {
      return this.apartmentService.createApartment(apartment).toPromise();
    }
  }

  getAllProvince() {
    this.provinceService.getAllProvince().subscribe(provinceList => {
      this.provinces = provinceList;
    });
  }

  getAllDistrictsByProvinceId(id: number) {
    console.log(id);
    this.districtService.getDistrictByProvinceId(id).subscribe(districtList => {
      // @ts-ignore
      this.districts = districtList;
    });
  }

  getAllWardsByDistrictId(id: number) {
    console.log(id)
    this.wardService.getAllWardByDistricts(id).subscribe(wardList => {
      this.wards = wardList;
    })
  }
}
