import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { EditWeatherDialogComponent } from '../edit-weather-dialog/edit-weather-dialog.component';
import { DataService } from '../shared/data.service';
import { Weather } from '../shared/weather.model';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  @Output()input_city: EventEmitter<string> = new EventEmitter()

  weather: Weather[] = [];
  showValidationErrors: boolean = false;
  WeatherData: any
  
  constructor(private dataService: DataService, private dialog: MatDialog ) { }

  ngOnInit(): void {

    this.weather = this.dataService.getAllWeather()
    this.getWeatherData("Paris")

  }

  onFormSubmit(form: NgForm) {

    if (form.invalid) return this.showValidationErrors = true

    this.dataService.addWeather(new Weather(form.value.text))

    this.showValidationErrors = false
    form.reset()
    return
  }

  toggleCompleted(weather: Weather) {
    weather.completed = !weather.completed;

  }

  makeIncomplete(filteredWeather: string){
    this.weather.forEach(weather => {
      if(weather.text != filteredWeather){
        weather.completed = false
      }
    })
  }


  editWeather(weather: Weather) {

    const index = this.weather.indexOf(weather)

    let dialogRef = this.dialog.open(EditWeatherDialogComponent, {
      width: '700px',
      data: weather
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateWeather(index, result)
      }
    })
  }

  deleteWeather(weather: Weather) {
    const index = this.weather.indexOf(weather)
    this.dataService.deleteWeather(index)
  }


  checkClickedCity() :string {
    var city = '';
    this.dataService.getAllWeather().forEach(weather => {
      if(weather.completed == true){
        city = weather.text
      }
    }) 
    // console.log(city)
    return city;     
  }

  setWeatherData(data?: any) {
    
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() <= sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    let sunriseTime = new Date(this.WeatherData.sys.sunrise * 1000);
    this.WeatherData.sunrise_time = sunriseTime.toDateString();
    this.WeatherData.main = this.WeatherData.weather[0].main;
    let main = this.WeatherData.weather[0].main

    this.WeatherData.isRain = (main === "Rain");
    this.WeatherData.isClear = (main === "Clear");
    this.WeatherData.isCloud = (this.WeatherData.weather[0].main == "Clouds");
    this.WeatherData.isSnow = (this.WeatherData.weather[0].main == "Snow");
    this.WeatherData.humidity = this.WeatherData.main.humidity;
    this.WeatherData.description = this.WeatherData.weather[0].description;

  }

  buildApi() {
    // var city = "London"
    var city = this.checkClickedCity();
    var apiKey = "0b54717a94ceefaeacbe2f2ed5395869"
    // console.log("helloapi")
    var api = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.checkClickedCity() + '&appid=' + apiKey
    // console.log(api)
    return api
    
  }


  getWeatherData(city:string) {
    var apiKey = "0b54717a94ceefaeacbe2f2ed5395869"
    // // var apiKey = "abe1eb51289c21c167c66ce790c2fac3"
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)  
    .then(response => response.json())
    .then(data => {this.setWeatherData(data)})

    // console.log("getweatherdata works")
  }

}