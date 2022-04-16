import { Injectable } from '@angular/core';
import { Weather } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  weather: Weather[] = [
    new Weather('London', false),
    new Weather('Paris', true),
    new Weather('Tokyo', false),
    new Weather('Cape Town', false),
    new Weather('Toronto', false),
    new Weather('Sydney', false),
    new Weather('Anchorage', false),
    new Weather('Mumbai', false),

  ]

  constructor() { }

  getAllWeather() {
    return this.weather
  }

  addWeather(weather: Weather) {
    this.weather.push(weather)
  }

  updateWeather(index: number, updatedWeather: Weather) {
    this.weather[index] = updatedWeather
  }

  deleteWeather(index: number) {
    this.weather.splice(index, 1)
  }
}
