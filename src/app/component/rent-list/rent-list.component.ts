import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {RentService} from '../../service/rent/rent.service';
import {Rent} from '../../model/rent';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {Apartment} from '../../model/apartment';
import {ImageService} from '../../service/image/image.service';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.scss']
})
export class RentListComponent implements OnInit {
  isCheck: boolean[] = [];
  currentUser: User = {};
  listRentBooking: Rent[] = [];

  apartments: Apartment[] = [];
  // @ts-ignore
  userId: number = this.authService.currentUserValue.id;

  constructor(private authService: AuthService,
              private rentService: RentService,
              private userService: UserService,
              private imageService: ImageService,) {
    this.getAllBookingApartmentByUserId(this.userId);
  }

  ngOnInit(): void {
    this.getCurrentUser()
    // @ts-ignore
  }

  getAllBookingApartmentByUserId(id: number) {
    // @ts-ignore
    this.rentService.getAllBookingApartmentByUserId(id).subscribe(data => {
      this.listRentBooking = data;
      for(let i=0;i<data.length;i++){
        // @ts-ignore
        let start = new Date(data[i].startDate);
        let today = new Date();
        if (start>today) {
          // @ts-ignore
          this.isCheck[i] = true;
        }else {
          this.isCheck[i] = false;
        }
      }
      this.getApartments();
    });
  }

  cancelBooking(id: number) {
    // @ts-ignore
    this.rentService.cancelBooking(id, this.userId).subscribe(() => {
      this.getAllBookingApartmentByUserId(this.userId)
    })
  }

  getCurrentUser(){
    this.userService.getUserById(this.userId).subscribe(data=>{
      this.currentUser = data;
    })
  }

  getApartments() {
    for (let i = 0; i < this.listRentBooking.length; i++) {
      // @ts-ignore
      this.apartments[i] = this.listRentBooking[i].apartment;
      // @ts-ignore
      this.imageService.getAllByApartment(this.apartments[i].id).subscribe(images => {
        this.apartments[i].avatar = images[0].image;

      })
    }
  }

}
