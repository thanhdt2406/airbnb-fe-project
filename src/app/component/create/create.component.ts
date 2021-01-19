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
import {User} from '../../model/user';
import {AuthService} from '../../service/auth/auth.service';


declare var $: any;
declare var Swal: any;

let isValidated = true;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  currentUser: User = this.authService.currentUserValue;
  pro_id: number = 0;
  dis_id: number = 0;
  apartForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    value: new FormControl(''),
    description: new FormControl(''),
    address: new FormControl(''),
    bathroom: new FormControl(''),
    bedroom: new FormControl(''),
    couple_room: new FormControl(''),
    luxury_room: new FormControl(''),
    president_room: new FormControl(''),
    single_room: new FormControl(''),
    vip_room: new FormControl(''),
    ward: new FormControl(),
    district: new FormControl(),
    province: new FormControl(),
  });
  selectedImages: any[] = [];
  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];

  constructor(private imageService: ImageService,
              private wardService: WardService,
              private districtService: DistrictService,
              private provinceService: ProvinceService,
              private apartmentService: ApartmentService,
              private storage: AngularFireStorage,
              private authService:AuthService) {
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

    $(document).ready(function() {
      $('#apartment-form').validate({
        rules: {
          name: {
            required: true,
          },
          value: {
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
          },
          image: {
            required: true,
          }

        },
        messages: {
          name: {
            required: 'Hãy nhập tên căn họ của bạn',
          },
          value: {
            required: 'Hãy nhập giá tiền để cho thuê căn hộ',
          },
          address: {
            required: 'Hãy nhập địa chỉ của căn hộ',
          },
          bathroom: {
            required: 'Hãy nhập số lượng phòng tắm',
          },
          bedroom: {
            required: 'Hãy nhập số lượng phòng ngủ',
          },
          description: {
            required: 'Hãy nhập mô tả căn nhà của bạn',
          },
          ward: {
            required: 'Bạn phải chọn tỉnh/thành phố, huyện/quận, xã ',
          },
          image: {
            required: 'Bạn phải chọn ảnh của căn hộ'
          }

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
                this.imageService.createImage(image);
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
    let bed = $('#min-bed').val();
    let bath = $('#min-baths').val();
    let vipRoom = parseInt($('#vipRoom').val());
    let luxuryRoom = parseInt($('#luxuryRoom').val());
    let singleRoom = parseInt($('#singleRoom').val());
    let coupleRoom = parseInt($('#coupleRoom').val());
    let presidentRoom = parseInt($('#presidentRoom').val());
    if(bed == 0) {
      bed = 1;
    }
    if (bath == 0) {
      bath = 1;
    }
    const apartment = {
      name: this.apartForm.value.name,
      value: this.apartForm.value.value,
      description: this.apartForm.value.description,
      address: this.apartForm.value.address,
      bathroom: bath,
      bedroom: bed,
      coupleRoom: coupleRoom,
      luxuryRoom: luxuryRoom,
      presidentRoom: presidentRoom,
      singleRoom: singleRoom,
      vipRoom: vipRoom,
      ward: {
        id: this.apartForm.value.ward
      },
      user: {
        id: this.currentUser.id
      },
      status: 0,
    };
    if (isValidated) {
      // @ts-ignore
      return this.apartmentService.createApartment(apartment).toPromise();
    }

  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
    } else {
      this.selectedImages = [];
    }
  }

  getAllProvince() {
    this.provinceService.getAllProvince().subscribe(provinceList => {
      this.provinces = provinceList;
    });
  }

  getAllDistrictsByProvinceId(id: number) {
    this.districtService.getDistrictByProvinceId(id).subscribe(districtList => {
      // @ts-ignore
      this.districts = districtList;
    });
  }

  getAllWardsByDistrictId(id: number) {
    this.wardService.getAllWardByDistricts(id).subscribe(wardList => {
      this.wards = wardList;
    })
  }
  toggleEditable(event: any) {
    if ( event.target.checked ) {
      this.apartForm.value.couple_room = true;
    }
  }
}
