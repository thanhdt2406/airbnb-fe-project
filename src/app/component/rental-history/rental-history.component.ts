import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.scss']
})
export class RentalHistoryComponent implements OnInit {
  currentUser = this.authService.currentUserValue;

  constructor(private authService: AuthService ) { }

  ngOnInit(): void {
  }

}
