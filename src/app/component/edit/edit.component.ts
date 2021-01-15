import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../model/apartment";
import {ApartmentService} from "../../service/apartment/apartment.service";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../service/image/image.service";
import {WardService} from "../../service/ward/ward.service";
import {DistrictService} from "../../service/district/district.service";
import {ProvinceService} from "../../service/province/province.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {AuthService} from "../../service/auth/auth.service";
import {Province} from "../../model/province";
import {District} from "../../model/district";
import {Ward} from "../../model/ward";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  apartment: Apartment = {};
  // @ts-ignore
  id: number;

  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  private isAvailable: boolean = true;

  constructor(private apertmentService: ApartmentService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              private wardService: WardService,
              private districtService: DistrictService,
              private provinceService: ProvinceService,
              private apartmentService: ApartmentService,
              private storage: AngularFireStorage,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      // @ts-ignore
      this.getApartment(this.id);
    });
    if (this.apartment.luxury_room == false) {
      this.isAvailable = false;
      console.log(this.apartment.luxury_room);
    }
  }

  // @ts-ignore
  getApartment() {
    this.apertmentService.getApartmentById(this.id).subscribe(value => {
      this.apartment = value;
    })
  }

  updateApartment() {
    this.apertmentService.editApartment(this.apartment).subscribe(() => {
      alert('Thành công');
    }, () => {
      alert('Xảy ra lỗi');
    });
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
