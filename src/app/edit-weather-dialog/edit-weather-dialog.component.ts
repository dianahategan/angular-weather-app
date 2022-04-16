import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Weather } from '../shared/weather.model';

@Component({
  selector: 'app-edit-weather-dialog',
  templateUrl: './edit-weather-dialog.component.html',
  styleUrls: ['./edit-weather-dialog.component.scss']
})
export class EditWeatherDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditWeatherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public weather: Weather) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }
  
  onFormSubmit(form: NgForm) {
    if (form.invalid) return
    
    const updatedWeather = {
      ...this.weather,
      ...form.value
    }
    
    this.dialogRef.close(updatedWeather)
  }

}
