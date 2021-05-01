import { Component, ViewChild, OnInit, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ScheduleService } from './../services/scheduleinfo.service';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { Router } from '@angular/router';


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
    endTime: ''
  };


  eventSource;
  viewTitle;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    step: 30 as Step
  };

  //@ViewChild(CalendarComponent) myCal: CalendarComponent;



  constructor(private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private  scheduleService : ScheduleService,
    public navCtrl: NavController,
    private  authenticationService : AuthenticationService,
    private router: Router) {
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  ngOnInit() {
    if(!this.authenticationService.checkIfUserTokenExist()){
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
    let token =  this.authenticationService.token;
    console.log("loginToken...:", token);
    let userData = JSON.parse(JSON.stringify(token));
    console.log("userData....", userData);
    let paramsUserId = userData.id;
    console.log("paramsUserId....", paramsUserId);
    this.eventSource = this.scheduleService.getProductList(paramsUserId).then( x => this.scheduleService.getSchedulesFromProductIdList(x)).then( y => this.eventSource = y).catch( error => console.log("error binding to event source..", error));
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
      message: 'From: ' + start + '<br><br>To: ' + end,
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
