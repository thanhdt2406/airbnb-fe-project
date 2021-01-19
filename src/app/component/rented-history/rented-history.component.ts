import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {RentService} from "../../service/rent/rent.service";
import {Apartment} from "../../model/apartment";

@Component({
  selector: 'app-rental-history',
  templateUrl: './rented-history.component.html',
  styleUrls: ['./rented-history.component.scss']
})
export class RentedHistoryComponent implements OnInit {
  currentUser = this.authService.currentUserValue;
  apartments: Apartment[] = [];

  constructor(private authService: AuthService,
              private rentService: RentService) {
    // @ts-ignore
    this.apartments = this.rentService.getAllRented(this.currentUser.id);
  }

  ngOnInit(): void {
  }

}
