import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Weather } from '../shared/weather.model';
// import tippy from 'tippy.js';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  @Input()
  weather!: Weather;

  @Output() weatherClicked: EventEmitter<void> = new EventEmitter()
  @Output() editClicked: EventEmitter<void> = new EventEmitter()
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter()



  constructor() { }


  ngOnInit(): void {
  }


  onWeatherClicked() {
    this.weatherClicked.emit()
  }

  onEditClicked() {
    this.editClicked.emit()
  }

  onDeleteClicked() {
    this.deleteClicked.emit()
  }

}
