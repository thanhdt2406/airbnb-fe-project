import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {RentService} from '../../service/rent/rent.service';
import {Rent} from '../../model/rent';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.scss']
})
export class RentListComponent implements OnInit {
  currentUser: User = {};
  listRentBooking: Rent[] = [];
  // @ts-ignore
  userId: number = this.authService.currentUserValue.id;

  constructor(private authService: AuthService,
              private rentService: RentService,
              private userService: UserService,) {
  }

  ngOnInit(): void {
    this.getCurrentUser()
    // @ts-ignore
    this.getAllBookingApartmentByUserId(this.userId);
  }

  getAllBookingApartmentByUserId(id: number) {
    this.rentService.getAllBookingApartmentByUserId(id).subscribe(data => {
      this.listRentBooking = data;
      console.log(data[0].apartment);
    });
  }

  getCurrentUser(){
    this.userService.getUserById(this.userId).subscribe(data=>{
      this.currentUser = data;
    })
  }

}
