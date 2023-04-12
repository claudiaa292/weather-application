import { Component, Input, OnInit } from '@angular/core';
import { ICity } from 'src/app/interfaces/city.interface';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-seven-days-forecast',
  templateUrl: './seven-days-forecast.component.html',
  styleUrls: ['./seven-days-forecast.component.scss'],
})
export class SevenDaysForecastComponent {
  public cities: ICity[] = this.weatherService.getCities();

  public selectedCity!: ICity | undefined;

  constructor(private weatherService: WeatherDataService) {}

  onCityChange(cityValue: any): void {
    this.selectedCity = this.cities.find(
      (city: ICity) => city.value === +cityValue.target.value
    );
  }
}
