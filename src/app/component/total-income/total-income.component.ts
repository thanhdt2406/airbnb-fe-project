import {Component, OnInit} from '@angular/core';
import {RentService} from '../../service/rent/rent.service';
import {AuthService} from '../../service/auth/auth.service';

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
  monthTotalGet: number[] = [];
  money: number = 0;


  constructor(private rentService: RentService,
              private authService: AuthService) {
  }

  ngOnInit() {
    for (let i = 0; i< 12; i++) {
      // @ts-ignore
      this.rentService.getTotalIncomeByUserId(this.currUserId,this.currentYear, i + 1 ).subscribe(value => {
        if (value == null) {
          this.money = 0
        }else {
        this.money = value;
        }
        this.monthTotalGet.push(this.money);
      });
    }
    console.log(this.monthTotalGet);

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
          data: this.monthTotalGet,
        }
      ]
    };

    let barChartData = jQuery.extend(true, {}, areaChartData);
    let stackedBarChartCanvas = $('#stackedBarChart').get(0).getContext('2d');
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

}
