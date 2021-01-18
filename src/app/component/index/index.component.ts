import {Component, OnInit} from '@angular/core';
import {ApartmentService} from '../../service/apartment/apartment.service';
import {Apartment} from '../../model/apartment';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // @ts-ignore
  date: Date;
  apartments: Apartment[] = [];
  apartments1: Apartment[] = [];
  apartments2: Apartment[] = [];
  newApartments: Apartment[] = [];

  users: User[] = [];

  constructor(private apartmentService: ApartmentService,
              private userService: UserService) {
    this.getAllApartment();
    this.getAllUser();
    this.get7NewApartment();
  }

  ngOnInit(): void {
    $(() => {
      var Page = (() => {
        var $nav = $('#nav-dots > span'),
          slitslider = $('#slider').slitslider({
            onBeforeChange: (slide: any, pos: any) => {
              $nav.removeClass('nav-dot-current');
              $nav.eq(pos).addClass('nav-dot-current');
            }
          }),
          init = () => {
            initEvents();
          },
          initEvents = () => {
            $nav.each(function(i: any) {
              // @ts-ignore
              $(this).on('click', function(event: any) {
                // @ts-ignore
                var $dot = $(this);
                if (!slitslider.isActive()) {
                  $nav.removeClass('nav-dot-current');
                  $dot.addClass('nav-dot-current');
                }
                slitslider.jump(i + 1);
                return false;
              });
            });
          };
        return {init: init};
      })();

      Page.init();

    });

    $('#testimonial-slider').owlCarousel({
      navigation: false, // Show next and prev buttons
      slideSpeed: 100,
      pagination: true,
      paginationSpeed: 100,
      items: 3
    });
  }

  getAllApartment() {
    this.apartmentService.getAllApartment().subscribe(rs => {
      this.apartments = rs;
      this.getAllApartment1();
      this.getAllApartment2();
    });
  }

  getAllApartment1() {
    for (let i = 0; i < this.apartments.length; i++) {
      if (this.apartments[i].status == 0) {
        this.apartments1.push(this.apartments[i]);
      }
    }
  }

  getAllApartment2() {
    for (let i = 0; i < this.apartments.length; i++) {
      if (this.apartments[i].status == 1) {
        this.apartments2.push(this.apartments[i]);
      }
    }
  }

  get7NewApartment() {
    this.apartmentService.getSevenApartment().subscribe(data => (this.newApartments = data));
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      (this.users = data);
    });
  }

}
