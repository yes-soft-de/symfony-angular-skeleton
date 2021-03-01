import { Component, OnDestroy, OnInit } from '@angular/core';
import {forkJoin, Observable, Subscription} from 'rxjs';
import { FooterComponent } from 'src/app/@theme/components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FooterComponent]
})
export class DashboardComponent implements OnInit {
  allCars: any[];
  allDevices: any[];
  allStatistics: any;

  latestCarsNumber = 5;
  latestDevicesNumber = 5;
  latestRealEstateNumber = 5;

  combinedObservable: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.allStatistics = true;  // delete this line with real example

    /*  Example For Getting Data From API :
    const allCars: Observable<CarsResponse> = this.dashboardService.getAllCars();
    const allDevices: Observable<any> = this.dashboardService.getDevices();
    const allReports: Observable<ReportsResponse> = this.dashboardService.getReports();
    const allStatistics: Observable<any> = this.dashboardService.allStatistics();
    const mergeRequests: Observable<any> = forkJoin([allCars, allDevices, allReports, allStatistics]);

    mergeRequests.subscribe(
      response => {
        if (response) {
          console.log('response : ', response);
          this.allCars = response[0].Data;
          this.allDevices = response[1].Data;
          this.allReports = response[2].Data;
          this.allStatistics = response[3].Data[0];
        }
      }

    );
    */
  }


}
