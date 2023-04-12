import { Component } from '@angular/core';
import { ICity } from 'src/app/interfaces/city.interface';
import { IWeatherHistory } from 'src/app/interfaces/weather.interfaces';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-hourly-weather-forecast',
  templateUrl: './hourly-weather-forecast.component.html',
  styleUrls: ['./hourly-weather-forecast.component.scss'],
})
export class HourlyWeatherForecastComponent {
  public cities: ICity[] = this.weatherService.getCities();
  public selectedCity!: ICity | undefined;
  public hourlyWeather: IWeatherHistory[] = [];
  currentDate: Date = new Date();

  constructor(private weatherService: WeatherDataService) {}

  onCityChange(event: any): void {
    this.selectedCity = this.cities.find(
      (city: ICity) => city.value === +event.target.value
    );
    if (this.selectedCity) {
      this.hourlyWeather = this.weatherService.getWeatherForNext24Hours(
        this.selectedCity.label
      );
    } else {
      this.hourlyWeather = [];
    }
  }
}