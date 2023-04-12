import { Component, OnInit } from '@angular/core';
import { ILocation } from 'src/app/interfaces/weather.interfaces';
import { ICity } from "../../interfaces/city.interface";
import { WeatherDataService } from "../../services/weather-data.service";

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss']
})
export class CurrentDayComponent implements OnInit {
  currentWeatherData?: ILocation[];
  currentDate: Date = new Date();
  public cities: ICity[] = this.weatherService.getCities();

  public selectedCity!: ICity | undefined;

  constructor(private weatherService: WeatherDataService) {
  }

  onCityChange(cityValue: any): void {
    this.selectedCity = this.cities.find((city: ICity) => city.value === +cityValue.target.value);
  }

  ngOnInit(): void {
    this.currentWeatherData = this.weatherService.getCurrentWeatherData();
    this.currentDate = new Date();
  }

}
