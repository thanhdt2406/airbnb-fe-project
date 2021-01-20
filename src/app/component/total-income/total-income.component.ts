import {Component, OnInit} from '@angular/core';
import {RentService} from '../../service/rent/rent.service';
import {AuthService} from '../../service/auth/auth.service';
import {TotalIncome} from '../../model/total-income';


declare var $: any;
declare var jQuery: any;
declare var Chart: any;

@Component({
  selector: 'app-total-income',
  templateUrl: './total-income.component.html',
  styleUrls: ['./total-income.component.scss']
})
export class TotalIncomeComponent implements OnInit {
  currentYear: number = 0;
  currUserId = this.authService.currentUserValue.id;


  constructor(private rentService: RentService,
              private authService: AuthService) {
  }

  async ngOnInit() {
    this.currentYear = new Date().getFullYear();
    let  monthTotalGet = [];
    for (let i = 0; i < 12; i++) {
      // @ts-ignore
      let totalGetByMonth: any = await this.getTotalIncome(this.currUserId, this.currentYear, i + 1);
      if (totalGetByMonth == null) {
        totalGetByMonth = 0;
      }
      monthTotalGet.push(totalGetByMonth);
    }
    console.log(monthTotalGet)

    let areaChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Income',
          backgroundColor: 'rgba(210, 214, 222, 1)',
          borderColor: 'rgba(210, 214, 222, 1)',
          pointRadius: false,
          pointColor: 'rgba(210, 214, 222, 1)',
          pointStrokeColor: '#c1c7d1',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: monthTotalGet
        }
      ]
    };

    let barChartData = jQuery.extend(true, {}, areaChartData);
    let stackedBarChartCanvas = $('#stackedBarChart').get(0).getContext('2d');
    // @ts-ignore
    let stackedBarChartData = jQuery.extend(true, {}, barChartData);

    let stackedBarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };

    let stackedBarChart = new Chart(stackedBarChartCanvas, {
      type: 'bar',
      data: stackedBarChartData,
      options: stackedBarChartOptions
    });
  }

  val: number = 0;

  getTotalIncome(userId: number, year: number, month: number) {
    this.rentService.getTotalIncomeByUserId(userId, year, month).subscribe(value => {
    })
  }
}
