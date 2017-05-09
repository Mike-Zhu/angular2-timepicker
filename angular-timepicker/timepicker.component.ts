import { Component, OnInit, EventEmitter, ElementRef, Output, HostListener, Input,SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as moment_ from 'moment';
import 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent implements OnInit {
  hour: string[] = Array(24).fill('1').map((value, index) =>
    index.toString().length === 1 ? '0' + index.toString() : index.toString()
  );
  time: string[] = Array(60).fill('1').map((value, index) =>
    index.toString().length === 1 ? '0' + index.toString() : index.toString()
  );
  timeModel: string = '';
  hourModel: string = '';
  minuteModel: string = '';
  isOpen: boolean = false;
  timeConfig:object = {
    format:'YYYY-mm-DD'
  };
  @Input() config: Object;
  @Input() appModel: any;
  @Output() modelChanges = new EventEmitter<string>();
  @HostListener('document: click', ['$event.target'])
  onclick(target: HTMLElement) {
    if (!this.isOpen) return;
    let parentFound = false;
    while (target != null && !parentFound) {
      if (target === this.elementRef.nativeElement) {
        parentFound = true;
      }
      target = target.parentElement;
    }
    if (!parentFound) {
      this.isOpen = false;
    }
  }
  constructor(private elementRef: ElementRef) {
  }
  ngOnChanges(changes: SimpleChanges){
    const moment = (<any>moment_)['default'] || moment_;
    if(this.timeModel !== changes.appModel.currentValue){
      this.timeModel = this.checkValue(changes.appModel.currentValue);
    }
  }
  ngOnInit() {
    this.timeConfig = Object.assign(this.timeConfig,this.config);
  }
  checkValue(time:string):string{
    if(!time){
      time = '';
    }
    let timeArray:string[] = time.split(':');
        if(timeArray.length !== 2){
          return '';
        }else{
          if(this.hour.indexOf(timeArray[0]) >= 0 && this.time.indexOf(timeArray[1]) >= 0){
            this.minuteModel = timeArray[1].toString();
            this.hourModel = timeArray[0].toString();
            return time;
          }else{
            return '';
          }
        }
  }
  choiceHour(value) {
    this.hourModel = value;
    if (!this.minuteModel) {
      this.minuteModel = '00';
    };
    this.timeModel = this.hourModel + ':' + this.minuteModel;
    this.modelChanges.emit(this.timeModel);
  }
  choiceMinute(value) {
    this.minuteModel = value;
    if (!this.hourModel) {
      this.hourModel = '00';
    };
    this.timeModel = this.hourModel + ':' + this.minuteModel;
    this.modelChanges.emit(this.timeModel);
  }
  inputBlur() {
    this.timeModel = this.checkValue(this.timeModel);
    this.modelChanges.emit(this.timeModel);
  }
  showClock(booleanClock: boolean) {
    this.isOpen = booleanClock;
  }
}
