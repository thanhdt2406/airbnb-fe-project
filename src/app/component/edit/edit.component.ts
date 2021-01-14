import { Component, OnInit } from '@angular/core';
import {Apartment} from "../../model/apartment";
import {ApartmentService} from "../../service/apartment/apartment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  apartment: Apartment = {};
  // @ts-ignore
  id: number;


  constructor(private apertmentService: ApartmentService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      // @ts-ignore
      this.getApartment(this.id);
    })
  }

  // @ts-ignore
  getApartment() {
    this.apertmentService.getApartmentById(this.id).subscribe(value => {
      this.apartment = value;
    })
  }

  updateApartment(){
    this.apertmentService.editApartment(this.apartment).subscribe(() =>{
      alert('Thành công');
    },() => {
      alert('Xảy ra lỗi');
    });

  }
}
