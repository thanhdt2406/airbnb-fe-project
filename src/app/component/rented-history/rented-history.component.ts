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
      this.imageService.getAllByApartment(this.apartments[i].id).subscribe(images => {
        this.apartments[i].avatar = images[0];
      })
    }
  }

  ngOnInit(): void {
  }

}
