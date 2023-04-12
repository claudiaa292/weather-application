import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {WeatherDataService} from "../../services/weather-data.service";
import {ILocation, IWeatherHistory} from "../../interfaces/weather.interfaces";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit, OnChanges {
  @Input() city!: string;
  @Input() currentDate!: Date;
  @Input() locationData!: ILocation | undefined;
  @Input() weatherHistory!: IWeatherHistory[] | undefined;
  @Input() showHistory: boolean = true;

  constructor(private weatherService: WeatherDataService) {}

  ngOnInit(): void {

  }

  private populateWithData(): void {
    this.locationData = this.weatherService
      .generateWeatherData(true) 
      .find((location: ILocation) => location.city === this.city);
    this.weatherHistory = this.locationData?.weather_history;
  }

  ngOnChanges() {
    this.populateWithData();
  }
}
