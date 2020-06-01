import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Papa} from "ngx-papaparse";
import * as moment from 'moment';
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public csvData: { datetime: moment.Moment, upload: number, download: number, ping: number }[];

  public chartData;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',

        time: {
          stepSize: 100,
          unit: 'day',
          displayFormats: {
            day: 'YYYY/MM/DD HH:mm'
          }

        }
      }]
    }
  };
  public barChartLabels;
  public barChartType = 'line';
  public barChartLegend = true;
  public loaded = false;


  constructor(private http: HttpClient, private papa: Papa, private changeDetection: ChangeDetectorRef) {

    http.get(`${environment.hostOfCsv}${environment.pathOfCsv}`, {responseType: 'text'})
      .subscribe(csvText =>
        papa.parse(csvText, {
          header: true,
          delimiter: ',',
          complete: results => {
            this.csvData = results.data;
            this.csvData = this.csvData
              .filter(line => line.upload != undefined && line.download != undefined)
              .map(line => {
                return {
                  datetime: moment(line.datetime),
                  download: +line.download,
                  upload: +line.upload,
                  ping: +line.ping
                }
              })

            this.chartData = [
              {data: this.csvData.map(value => this.transformToMbit(value.upload)), label: 'upload (in Mbit)'},
              {
                data: this.csvData.map(value => this.transformToMbit(value.download)),
                label: 'download (in Mbit)'
              }
            ];
            this.barChartLabels = this.csvData.map(value => value.datetime);

            this.loaded = true;
            changeDetection.detectChanges();
          }
        }));

  }


  public transformToMbit(number: number): number {
    return Math.round(number / Math.pow(10, 4)) / Math.pow(10, 2);
  }

  public avg(name: string, last24?: boolean): number {

    let dateBefore24h = moment();
    dateBefore24h.subtract(1, 'day');

    const values: number[] = this.csvData
      .filter(line => last24 ? line.datetime >= dateBefore24h : true)
      .map(line => line[name]);

    const sum: number = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
  }

}
