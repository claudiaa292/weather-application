import {DayOfWeekEnum, WeatherConditionEnum, WindDirectionEnum} from "../enums/weather.enums";

export interface IWeatherHistory {
  date: string;
  day_of_week: keyof typeof DayOfWeekEnum;
  temperature: number;
  weather: WeatherConditionEnum;
  hour: number;
}

export interface ILocation {
  city: string;
  humidity: number;
  weather: WeatherConditionEnum;
  temperature: number;
  wind_speed: number;
  wind_direction: WindDirectionEnum;
  weather_history: IWeatherHistory[];
}
