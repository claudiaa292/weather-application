import { Injectable } from '@angular/core';
import {
  DayOfWeekEnum,
  WeatherConditionEnum,
  WindDirectionEnum,
} from '../enums/weather.enums';
import { ILocation, IWeatherHistory } from '../interfaces/weather.interfaces';
import { ICity } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private cities: ICity[] = [
    {
      value: 1,
      label: 'Bucuresti',
    },
    {
      value: 2,
      label: 'Brasov',
    },
    {
      value: 3,
      label: 'Constanța',
    },
    {
      value: 4,
      label: 'Iasi',
    },
    {
      value: 5,
      label: 'Miercurea Ciuc',
    },
    {
      value: 6,
      label: 'Suceava',
    },
    {
      value: 7,
      label: 'Timișoara',
    },
  ];

  constructor() {}

  public getCities(): ICity[] {
    return this.cities;
  }

  public getCurrentWeatherData(): ILocation[] {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const data: ILocation[] = [];
    for (let city of this.cities) {
      const locationData = this.generateLocationData(city.label, false);
      const currentWeather = locationData.weather_history.find((weather) => {
        const [year, month, day] = weather.date.split('-').map(Number);
        return (
          day === currentDay && month === currentMonth && year === currentYear
        );
      });
      if (currentWeather) {
        locationData.temperature = currentWeather.temperature;
        locationData.weather = currentWeather.weather;
        locationData.weather_history = [currentWeather];
        data.push(locationData);
      }
    }
    return data;
  }

  public getWeatherForNext24Hours(cityName: string): IWeatherHistory[] {
    const locationData = this.generateLocationData(cityName, false);
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    const currentHour = today.getHours();
    const currentDateTime = new Date(
      currentYear,
      currentMonth - 1,
      currentDay,
      currentHour
    );
    const next24HoursDateTime = new Date(
      currentDateTime.getTime() + 24 * 60 * 60 * 1000
    );
    const weatherHistoryForNext24Hours = locationData.weather_history.filter(
      (weather) => {
        const [year, month, day] = weather.date.split('-').map(Number);
        const weatherDate = new Date(year, month - 1, day, weather.hour);
        return (
          weatherDate >= currentDateTime && weatherDate < next24HoursDateTime
        );
      }
    );
    return weatherHistoryForNext24Hours;
  }

  public generateWeatherData(random: boolean = false): ILocation[] {
    const data: ILocation[] = [];
    for (let city of this.cities) {
      data.push(this.generateLocationData(city.label, random));
    }
    return data;
  }

  private generateLocationData(city: string, random: boolean): ILocation {
    return {
      city,
      temperature: random ? this.randomInt(10, 39) : 12,
      humidity: random ? this.randomInt(30, 100) : 60,
      weather: random
        ? this.randomEnumValue(WeatherConditionEnum)
        : WeatherConditionEnum.Clear,
      wind_speed: random ? this.randomInt(0, 20) : 10,
      wind_direction: random
        ? this.randomEnumValue(WindDirectionEnum)
        : WindDirectionEnum.N,
      weather_history: this.generateWeatherHistory(random),
    };
  }

  private generateWeatherHistory(random: boolean): IWeatherHistory[] {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const daysOfWeekArray = Object.keys(DayOfWeekEnum).filter((key) =>
      isNaN(Number(DayOfWeekEnum[key as keyof typeof DayOfWeekEnum]))
    ) as Array<keyof typeof DayOfWeekEnum>;

    const weatherHistory = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = daysOfWeekArray[date.getDay()];
      const hourlyWeather = Array.from({ length: 24 }, (_, i) => {
        return {
          hour: i,
          date: new Date(date.setHours(i)).toISOString().split('T')[0],
          day_of_week: dayOfWeek,
          temperature: random ? this.randomInt(-10, 35) : 20,
          weather: random
            ? this.randomEnumValue(WeatherConditionEnum)
            : WeatherConditionEnum.Clear,
        };
      });
      return hourlyWeather;
    }).flat();

    weatherHistory.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return weatherHistory;
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomEnumValue<T>(enumeration: T): T[keyof T] {
    const values = Object.keys(enumeration) as (keyof T)[];
    const randomIndex = Math.floor(Math.random() * values.length);
    return enumeration[values[randomIndex]];
  }
}
