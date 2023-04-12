import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyWeatherForecastComponent } from './hourly-weather-forecast/hourly-weather-forecast.component';
import { SevenDaysForecastComponent } from './seven-days-forecast.component/seven-days-forecast.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { CurrentDayComponent } from './current-day/current-day.component';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HourlyWeatherForecastComponent,
    SevenDaysForecastComponent,
    WeatherCardComponent,
    CurrentDayComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, FormsModule],
  exports: [
    HourlyWeatherForecastComponent,
    SevenDaysForecastComponent,
    WeatherCardComponent,
    CurrentDayComponent,
  ],
})
export class SharedModule {}
