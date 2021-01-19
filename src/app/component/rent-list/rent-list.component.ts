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
  isCheck: boolean = false;
  currentUser: User = {};
  listRentBooking: Rent[] = [];

  apartments: Apartment[] = [];
  // @ts-ignore
  userId: number = this.authService.currentUserValue.id;

  constructor(private authService: AuthService,
              private rentService: RentService,
              private userService: UserService,
              private imageService: ImageService,) {

  }

  ngOnInit(): void {
    this.getCurrentUser()
    // @ts-ignore
    this.getAllBookingApartmentByUserId(this.userId);
  }

  getAllBookingApartmentByUserId(id: number) {
    this.rentService.getAllBookingApartmentByUserId(id).subscribe(data => {
      this.listRentBooking = data;
      for(let i=0;i<data.length;i++){
        // @ts-ignore
        let start = new Date(data[i].startDate);
        let today = new Date();
        if (start>today) {
          // @ts-ignore
          this.isCheck = true;
        }
        console.log(today<start);
      }
      this.getApartments();
    });
  }

  cancelBooking() {

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
  chekCancelBooking() {

  }

}
