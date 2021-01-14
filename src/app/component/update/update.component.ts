import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ImageService} from '../../service/image/image.service';
import {WardService} from '../../service/ward/ward.service';
import {DistrictService} from '../../service/district/district.service';
import {ProvinceService} from '../../service/province/province.service';
import {ApartmentService} from '../../service/apartment/apartment.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuthService} from '../../service/auth/auth.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Province} from '../../model/province';
import {District} from '../../model/district';
import {Ward} from '../../model/ward';
import {Apartment} from '../../model/apartment';
declare var Swal: any;
declare var $: any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
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

  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  id: number = -1;
  apartmentCurrent: Apartment = {};
  wardId: number = -1;

  constructor(private imageService: ImageService,
              private wardService: WardService,
              private districtService: DistrictService,
              private provinceService: ProvinceService,
              private apartmentService: ApartmentService,
              private storage: AngularFireStorage,
              private authService:AuthService,
              private activatedRoute: ActivatedRoute) {
    this.getAllProvince();
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.apartmentCurrent = await this.getApartmentById(this.id);
      // @ts-ignore
      this.wardId = this.apartmentCurrent.ward.id;
    });
  }

  ngOnInit(): void {
    this.getAllDistrictsByProvinceId(1);
    this.getAllWardsByDistrictId(1);
    $(document).ready(function() {
      $('#apartment-update-form').validate({
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
  updateApartmentById(id: number) {
    const apartment = {
      name: this.apartForm.value.name === '' ? this.apartmentCurrent.name: this.apartForm.value.name,
      value: this.apartForm.value.value === '' ? this.apartmentCurrent.value: this.apartForm.value.value,
      description: this.apartForm.value.description === '' ? this.apartmentCurrent.description: this.apartForm.value.description,
      address: this.apartForm.value.address === '' ? this.apartmentCurrent.address: this.apartForm.value.address,
      bathroom: this.apartForm.value.bathroom === '' ? this.apartmentCurrent.bathroom: this.apartForm.value.bathroom,
      bedroom: this.apartForm.value.bedroom === '' ? this.apartmentCurrent.bedroom: this.apartForm.value.bedroom,
      couple_room: this.apartForm.value.couple_room === '' ? this.apartmentCurrent.couple_room: this.apartForm.value.couple_room,
      luxury_room: this.apartForm.value.luxury_room === '' ? this.apartmentCurrent.luxury_room: this.apartForm.value.luxury_room,
      president_room: this.apartForm.value.president_room === '' ? this.apartmentCurrent.president_room: this.apartForm.value.president_room,
      single_room: this.apartForm.value.single_room === '' ? this.apartmentCurrent.single_room: this.apartForm.value.single_room,
      vip_room: this.apartForm.value.vip_room === '' ? this.apartmentCurrent.vip_room: this.apartForm.value.vip_room,
      ward: {
        id: this.apartForm.value.ward
      },
      status: 0,
    };
    this.apartmentService.updateApartment(id, apartment).subscribe(() => {
      $(function () {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Cập nhật thành công'
        });
      });
    }, () => {
      $(function () {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'error',
          title: 'Cập nhật thất bại'
        });
      });
    });
  }

  getAllProvince() {
    this.provinceService.getAllProvince().subscribe(provinceList => {
      this.provinces = provinceList;
    });
  }

  getApartmentById(id: number) {
    return this.apartmentService.getApartmentById(id).toPromise();
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
