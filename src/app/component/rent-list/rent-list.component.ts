import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.scss']
})
export class RentListComponent implements OnInit {
  currentUser = this.authService.currentUserValue;

  constructor(private authService: AuthService ) { }

  ngOnInit(): void {
  }

}
