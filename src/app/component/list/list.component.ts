import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../model/apartment";
import {ApartmentService} from "../../service/apartment/apartment.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  apartments: Apartment[] = [];

  constructor(private apartmentService: ApartmentService) {
  }

  ngOnInit(): void {
    this.getAllApartment();
  }

  getAllApartment(){
    this.apartmentService.getAllApartment().subscribe(rs=>{
      this.apartments = rs;
    })
  }
}
