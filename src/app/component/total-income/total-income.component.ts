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
      let value = await this.getTotalIncomeByUserId(this.currUserId, this.currentYear -1, i +1);
      if (value == null) {
        this.money = 0;
      } else {
        this.money = value;
      }
      this.monthTotalGet.push(this.money);
    }
    this.chartType = 'line';
    this.chartDatasets = [
      { data: this.monthTotalGet, label: 'Thống kê thu nhập' },
    ];

    this.chartColors = [
      {
        backgroundColor: 'rgba(105, 0, 132, .2)',
        borderColor: 'rgba(200, 99, 132, .7)',
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

  chartLabels: Array<any> = []

  chartOptions =  {
    responsive: true
  };

  chartClicked(e: any): void{}
  chartHovered(e: any): void {}

  getTotalIncomeByUserId(currUserId: any, currentYear: any, month: any) {
    return this.rentService.getTotalIncomeByUserId(currUserId, currentYear, month).toPromise();
  }


}
