import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-print-base-values',
  templateUrl: './print-base-values.component.html',
  styleUrls: ['./print-base-values.component.css']
})
export class PrintBaseValuesComponent implements OnInit {

  public Math: Math;

  @Input()
  public upload: number;

  @Input()
  public download: number;

  @Input()
  public ping: number;

  constructor() { }

  ngOnInit(): void {
  }

}
