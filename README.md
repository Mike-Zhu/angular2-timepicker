# angular2-timepicker
timepicker
v 0.0.1

//how to inject


import { TimepickerComponent } from './timepicker/timepicker.component';

@NgModule({
  declarations: [
    TimepickerComponent
  ],
  ...
})

//how to use 


<app-timepicker (modelChanges)="timeModel = $event" [appModel] = "timeModel" [(config)] = "timeConfig"></app-timepicker>
