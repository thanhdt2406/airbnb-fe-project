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
  price: number[] = [];
  day: number[] = [];
  start: string[] = [];
  end: string[] = [];

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
    this.getCurrentUser();
  }

  getAllBookingApartmentByUserId(id: number) {
    this.rentService.getAllBookingApartmentByUserId(id).subscribe(data => {
      this.listRentBooking = data;
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        let start = new Date(data[i].startDate);
        let today = new Date();
        if (start > today) {
          // @ts-ignore
          this.isCheck[i] = true;
        } else {
          this.isCheck[i] = false;
        }
      }
      this.getApartments();
    });
  }

  cancelBooking(id: any) {
    this.rentService.cancelBooking(id).subscribe(() => {
      while(this.apartments.length > 0) {
        this.apartments.pop();
      }
      this.getAllBookingApartmentByUserId(this.userId);
    });
  }

  checkIn(rent: Rent) {
    if(confirm("You are going to check-in! Are you sure to continue?")){
      this.rentService.checkIn(rent).subscribe(() => {
        alert("Done!");
        this.getAllBookingApartmentByUserId(this.userId);
      });
    }
  }

  getCurrentUser() {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.currentUser = data;
    });
  }

  getApartments() {
    for (let i = 0; i < this.listRentBooking.length; i++) {
      // @ts-ignore
      this.apartments[i] = this.listRentBooking[i].apartment;
      // @ts-ignore
      this.day[i] = (new Date(this.listRentBooking[i].endDate) - new Date(this.listRentBooking[i].startDate)) / 24 / 60 / 60 / 1000;
      // @ts-ignore
      this.price[i] = this.day[i] * this.listRentBooking[i].apartment.value;

      // @ts-ignore
      this.start[i] = this.listRentBooking[i].startDate.substring(0, 10);

      // @ts-ignore
      this.end[i] = this.listRentBooking[i].endDate.substring(0, 10);

      // @ts-ignore
      this.imageService.getAllByApartment(this.apartments[i].id).subscribe(images => {
        this.apartments[i].avatar = images[0].image;
      });
    }
  }

}
