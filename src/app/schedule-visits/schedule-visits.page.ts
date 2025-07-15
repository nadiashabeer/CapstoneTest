import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AngularFireDatabase,AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

class Account{
  $key: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  accType: string;
}

class Doctor{
  patientId: string ;
  date: string;
  time: string;
  constructor(patientID){
    this.patientId = patientID;
    this.date=new Date().toDateString();
    this.time=new Date().toTimeString();
  }
}

class LocationData {
  name: string;
  phoneNo: string;
  address: string;
  latitude: number;
  longitude: number;
  dateLocationAdded: Date;
  urlString: string;
  safeURLString: SafeUrl;
  administrativeArea: string;
  countryName: string;
  subLocality: string;
  delivered: boolean;
};


@Component({
  selector: 'app-schedule-visits',
  templateUrl: './schedule-visits.page.html',
  styleUrls: ['./schedule-visits.page.scss'],
})
export class ScheduleVisitsPage implements OnInit {

  infoHere: boolean;
  prescriptionButton: boolean;
  accountObjectRef: AngularFireObject<any>;
  key: string;
  keys: any[];
  doctor: Account;
  registrationList: Account[]; 
  accountListRef: AngularFireList<any>;
  accObjectRef: AngularFireObject<any>;

  locationList: LocationData[];
    delivered: boolean;
    myLatitude: number;
    myLongitude: number;

    constructor(private db:AngularFireDatabase, private storage: Storage, public toastController: ToastController, private sanitizer:DomSanitizer, private geolocation: Geolocation) {
      this.locationList = new Array<LocationData>();
      this.delivered = false;
      this.myLatitude = 0 ;
      this.myLongitude = 0;
     
      for (let location of this.locationList){
        location.urlString = "geo:" + location.latitude + "," + location.longitude;
        location.safeURLString = this.sanitizer.bypassSecurityTrustUrl(location.urlString);
      }
      
    } 
  
    Visited(location: LocationData){

      if (this.myLatitude == location.latitude && this.myLongitude == location.longitude)
        location.delivered = true;
      else{
        location.delivered = false;
        this.alertUser("You are not near any of the locaitons", 3000, 'danger')
        this.storage.set('locationList',this.locationList);
      }
    }

    // getMyLocation()
    //   {
    //     this.geolocation.getCurrentPosition().then((data) => this.setlocation(data)); 
    //   }

      setlocation(data: GeolocationPosition){
        this.myLatitude = data.coords.latitude,
        this.myLongitude = data.coords.longitude
        console.log(this.myLatitude + " MY loc " + this.myLongitude);
      }

    buttonState(location: LocationData) {
      if(location.delivered)
      return "true";
      else
      return "false";
    }
    buttonColor(location: LocationData) {
      if (location.delivered)
      return "success";
      else
      return "danger";
    }
    determineClass(location: LocationData) {
      if (location.delivered)
      return "strike";
      else
      return "";
    }


  async ngOnInit() {
    this.accountListRef = this.db.list("/accounts");
    this.accountListRef.snapshotChanges().subscribe(data => this.handleData(data));
  }

  handleData(data){
    console.table(data);
    this.registrationList = []; 
    data.forEach(item => { 
      let pl = item.payload.toJSON();
      pl['$key'] = item.key;
      this.registrationList.push(pl as Account);
    });

    this.registrationList.forEach(item =>{
      if(item.$key == this.keys[0]){
        this.doctor = item;
        console.log(this.doctor);
      }
    });
    this.infoHere = true; 
   // this.getMyLocation();
  }

  async alertUser(msg: string, t: number, c: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: t,
      color: c
    });
    toast.present();
  }


}
