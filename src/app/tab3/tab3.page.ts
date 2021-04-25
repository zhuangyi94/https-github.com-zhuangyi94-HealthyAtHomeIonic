import { Component, ViewChild, OnInit, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ScheduleService } from './../services/scheduleinfo.service';
import { CalendarMode } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {



  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    productName: ''
  };


  eventSource;
  viewTitle;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };

  //@ViewChild(CalendarComponent) myCal: CalendarComponent;



  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private  scheduleService : ScheduleService) { }

  ngOnInit() {
    //Schedule from Schedule Table by calling https://localhost:5001/scheduler/get/all API
    this.eventSource = this.scheduleService.getSchedulesFromScheduleTable().then( x => this.eventSource = x).catch( error => console.log("error binding to event source..", error));

    //If received prodcut Id with Dummy single object
    //pass value
    //let productObj = [{productId: '6b4c8fb8-090c-4482-9d93-568fd4e0b1fa' , productName : "Yoga Course", startDate : new Date(), endDate : new Date()}]
    //this.eventSource = this.scheduleService.getSchedulesFromProductIdObject(productObj).then( x => this.eventSource = x).catch( error => console.log("error binding to event source..", error));


    //If received product Id is in List;
    //this.eventSource = this.scheduleService.getProductList().then( x => this.scheduleService.getSchedulesFromProductIdList(x)).then( y => this.eventSource = y).catch( error => console.log("error binding to event source..", error));
  }


  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;


  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'Product Name: ' + event.productName + '<br><br>From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

}
