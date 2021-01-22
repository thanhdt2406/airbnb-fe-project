import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {RentService} from "../../service/rent/rent.service";
import {Apartment} from "../../model/apartment";
import {Rent} from "../../model/rent";
import {ApartmentService} from "../../service/apartment/apartment.service";
import {ImageService} from "../../service/image/image.service";

@Component({
  selector: 'app-rental-history',
  templateUrl: './rented-history.component.html',
  styleUrls: ['./rented-history.component.scss']
})
export class RentedHistoryComponent implements OnInit {
  currentUser = this.authService.currentUserValue;
  rents: Rent[] = [];
  apartments: Apartment[] = [];
  apartment: Apartment = {};
  day: number[] = [];
  p = 1;
  constructor(private authService: AuthService,
              private rentService: RentService,
              private apartmentService: ApartmentService,
              private imageService: ImageService) {
    // @ts-ignore
    this.getAllrented();
  }

  getAllrented() {
    // @ts-ignore
    this.rentService.getAllRented(this.currentUser.id).subscribe(rents => {
      // @ts-ignore
      this.rents = rents;
      this.getApartments();
    });
    // @ts-ignore
  }

  getApartments() {
    for (let i = 0; i < this.rents.length; i++) {
      // @ts-ignore
      this.apartments[i] = this.rents[i].apartment;
      // @ts-ignore
      this.day[i] = (new Date(this.rents[i].endDate) - new Date(this.rents[i].startDate)) / 24 / 60 / 60 / 1000;
      // @ts-ignore
      this.rents[i].startDate = this.rents[i].startDate.substring(0, 10);
      // @ts-ignore
      this.rents[i].endDate = this.rents[i].endDate.substring(0, 10);
    }
  }

  ngOnInit(): void {
  }

}
