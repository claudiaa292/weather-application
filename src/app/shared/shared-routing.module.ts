import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentDayComponent } from './current-day/current-day.component';
import { HourlyWeatherForecastComponent } from './hourly-weather-forecast/hourly-weather-forecast.component';
import { SevenDaysForecastComponent } from './seven-days-forecast.component/seven-days-forecast.component';

const routes: Routes = [
  {
    path: 'currentDay',
    component: CurrentDayComponent,
  },
  {
    path: 'hourlyWeatherForecast',
    component: HourlyWeatherForecastComponent,
  },
  {
    path: 'sevenDaysForecast',
    component: SevenDaysForecastComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
