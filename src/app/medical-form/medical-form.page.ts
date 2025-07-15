import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

class Symptom {
  name: string;
  isChecked: boolean
 };

class Patient{
  height: number;
  weight: number;
  list: Symptom[];
  temp: number;
  bp: string;
  latitude: number;
  longitude: number;
  meds: string;

  constructor(weight,height,bp,temp,symptoms,lat,long){
    this.weight = weight;
    this.height = height;
    this.bp = bp;
    this.temp = temp;
    this.list = symptoms;
    this.latitude = lat;
    this.longitude = long;
  }
}
 

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.page.html',
  styleUrls: ['./medical-form.page.scss'],
})
export class MedicalFormPage implements OnInit {
  height: number;
  weight: number;
  temp: number;
  bp: string;
  meds: string;
  latitude: number;
  longitude: number
  symptoms: Symptom[];

  accountObjectRef: AngularFireObject<any>;
  key: string;
  
  constructor(private geolocation: Geolocation, private activatedRoute:ActivatedRoute, private db:AngularFireDatabase,  public toastController: ToastController) {
    this.key = activatedRoute.snapshot.paramMap.get('RecordKey');
    this.weight = 0;
    this.height = 0;
    this.bp = "";
    this.temp = 0;
    this.meds = "";
    this.symptoms = [
      { name: "Body pain", isChecked: false },
      { name: "Fever", isChecked: false },
      { name: "Nausia", isChecked: false },
      { name: "Weak", isChecked: false },
      { name: "Sweaty", isChecked: false },
      { name: "Weight Gain", isChecked: false }
      ];
    this.accountObjectRef = this.db.object("/accounts/" + this.key + "/Information/meds");
    this.accountObjectRef.valueChanges().subscribe(data => this.meds = data);
    console.log(this.meds + " val ");
 
}
  AddInfo(){
    console.log(this.key);
    this.accountObjectRef = this.db.object("/accounts/" + this.key + "/Information"); // wrting to the db
    let info: Patient = new Patient(this.weight,this.height,this.bp,this.temp,this.symptoms,this.latitude,this.longitude);
    this.accountObjectRef.update(info);
    this.weight = 0;
    this.height = 0;
    this.bp = "";
    this.temp = 0;
  }
  
  getMyLocation()
      {
        this.geolocation.getCurrentPosition().then( (data) => this.setlocation(data)); 
      }

      setlocation(data: GeolocationPosition){
        this.latitude = data.coords.latitude,
        this.longitude = data.coords.longitude
        console.log(this.latitude + " MY loc " + this.longitude);
      }

  ngOnInit() {
    this.getMyLocation();
  }

}
