import {Component, OnInit} from '@angular/core';
import {RentService} from '../../service/rent/rent.service';
import {AuthService} from '../../service/auth/auth.service';
import {User} from '../../model/user';

declare var $: any;
declare var jQuery: any;
declare var Chart: any;

@Component({
  selector: 'app-total-income',
  templateUrl: './total-income.component.html',
  styleUrls: ['./total-income.component.scss']
})
export class TotalIncomeComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currUserId = this.authService.currentUserValue.id;
  money: number = 0;
  monthTotalGet: any = [];
  currentUser = this.authService.currentUserValue;
  responsive: boolean = true;
  constructor(private rentService: RentService,
              private authService: AuthService,) {
  }

  async ngOnInit() {
    for (let i = 0; i < 12; i++) {
      let value = await this.getTotalIncomeByUserId(this.currUserId, this.currentYear, i +1);
      if (value == null) {
        this.money = 0;
      } else {
        this.money = value;
      }
      this.monthTotalGet.push(this.money);
    }
    this.chartType = 'line';
    this.chartDatasets = [
      { data: this.monthTotalGet, label: 'Revenue Statistics' },
    ];

    this.chartColors = [
      {
        backgroundColor: 'rgba(253, 198, 60, .2)',
        borderColor: '#FDC600',
        borderWidth: 2,
      }
    ];
    this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    this.chartOptions =  {
      responsive: true
    };
  }

  chartType: string = 'line';
  chartDatasets: Array<any> = []

  chartColors: Array<any> = [];

  chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  chartOptions =  {
    responsive: true
  };

  chartClicked(e: any): void{}
  chartHovered(e: any): void {}

  getTotalIncomeByUserId(currUserId: any, currentYear: any, month: any) {
    return this.rentService.getTotalIncomeByUserId(currUserId, currentYear, month).toPromise();
  }

  monthFormat(i: number) {
    let format = '';
    switch (i) {
      case 0:
        format = 'January'
        break;
      case 1:
        format = 'February'
        break;
      case 2:
        format = 'March'
        break;
      case 3:
        format = 'April'
        break;
      case 4:
        format = 'May'
        break;
      case 5:
        format = 'June'
        break;
      case 6:
        format = 'July'
        break;
      case 7:
        format = 'August'
        break;
      case 8:
        format = 'September'
        break;
      case 9:
        format = 'October'
        break;
      case 10:
        format = 'November'
        break;
      case 11:
        format = 'December'
        break;
    }
    return format;
  }
}
