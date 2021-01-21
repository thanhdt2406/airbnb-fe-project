import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {ApartmentService} from '../../service/apartment/apartment.service';
import {Apartment} from '../../model/apartment';

@Component({
  selector: 'app-user-house',
  templateUrl: './user-house.component.html',
  styleUrls: ['./user-house.component.scss']
})
export class UserHouseComponent implements OnInit {
  apartments: Apartment[] = [];
  currentUser = this.authService.currentUserValue;
  mess = '';

  constructor(private authService: AuthService,
              private apartmentService: ApartmentService) {
  }

  ngOnInit(): void {
    this.getApartmentByUser()
  }

  getApartmentByUser() {
    let id = this.currentUser.id;
    // @ts-ignore
    this.apartmentService.getApartmentByUser(id).subscribe(rs => {
      // @ts-ignore
      this.apartments = rs;
    });
  }

  stopApartment(id: any) {
    if (confirm("Are you sure")) {
      this.apartmentService.stopRenting(id).subscribe(mess => {this.mess = 'Stop Apartment success'; this.getApartmentByUser()} ,
        mess => {this.mess = 'Stop Apartment fail';

      });
    }else {
      return;
    }
  }

  repairApartment(id: any) {
    if (confirm("Are you sure")) {
      this.apartmentService.repairRenting(id).subscribe(mess => {this.mess = 'Repair Apartment success'; this.getApartmentByUser() } ,
        mess => {this.mess = 'Repair Apartment fail'; });
    }else {
      return;
    }
  }

  rentAgain(id: any) {
    if (confirm("Are you sure")) {
      this.apartmentService.rentAgain(id).subscribe(mess => {this.mess = 'Rent Again Apartment success'; this.getApartmentByUser()} ,
        mess => {this.mess = 'Rent Again Apartment fail'; });
    }else {
      return;
    }
  }
}
