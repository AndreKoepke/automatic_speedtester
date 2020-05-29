import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Papa} from "ngx-papaparse";
import * as moment from 'moment';
import {MbitPipe} from "./pipes/mbit-pipe.pipe";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public data: { datetime: moment.Moment, upload: number, download: number, ping: number }[];

  public chartData;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      point: {
        radius: 3
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

    http.get("http://192.168.22.45:8080/measurements/recorded.txt", {responseType: 'text'})
      .subscribe(csvText =>
        papa.parse(csvText, {
          header: true,
          delimiter: ',',
          complete: results => {
            this.data = results.data;
            this.data = this.data
              .filter(line => line.upload != undefined && line.download != undefined)
              .map(line => {
                return {
                  datetime: moment(line.datetime),
                  download: +line.download,
                  upload: +line.upload,
                  ping: +line.ping
                }
              })


            let dateBefore24h = moment();
            dateBefore24h.subtract(1, 'day');
            let filtered = this.data.filter(line => line.datetime >= dateBefore24h);

            this.chartData = [
              {
                data: filtered.map(value => MbitPipe.toMbitNumber(value.upload)),
                label: 'upload (in Mbit)'
              },
              {
                data: filtered.map(value => MbitPipe.toMbitNumber(value.download)),
                label: 'download (in Mbit)'
              }
            ];
            this.barChartLabels = filtered.map(value => value.datetime);

            this.loaded = true;
            changeDetection.detectChanges();
          }
        }));

  }


  public avg(name: string, last24?: boolean): number {

    let dateBefore24h = moment();
    dateBefore24h.subtract(1, 'day');

    const values: number[] = this.data
      .filter(line => last24 ? line.datetime >= dateBefore24h : true)
      .map(line => line[name]);

    const sum: number = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
  }

}
