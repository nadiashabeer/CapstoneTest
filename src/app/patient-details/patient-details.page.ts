import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


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

class Account{
  $key: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  accType: string;
  Information: Patient;
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

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {
  infoHere: boolean;
  prescriptionButton: boolean;
  patient: Account;
  accountObjectRef: AngularFireObject<any>;
  key: string;
  prescription: string;
  keys: any[];
  symptomList: Symptom [];
  registrationList: Account[]; 
  patientList: Account[];
  accountListRef: AngularFireList<any>;
  accObjectRef: AngularFireObject<any>;

   constructor(private activatedRoute:ActivatedRoute, private db:AngularFireDatabase,private router:Router) { 
     this.infoHere = false;
     this.prescription = "";
     this.prescriptionButton = false;
    this.key = activatedRoute.snapshot.paramMap.get('Keys'); 
    this.keys = this.key.split(','); 
    console.log("DR " + this.keys);
    this.accountListRef = this.db.list("/accounts");
    this.accountListRef.snapshotChanges().subscribe(data => this.handleData(data));
  }

  handleData(data){
    console.table(data);
    this.registrationList = []; 
    this.symptomList = [];
    data.forEach(item => { 
      let pl = item.payload.toJSON();
      pl['$key'] = item.key;
      this.registrationList.push(pl as Account);
    });

    this.registrationList.forEach(item =>{
      if(item.$key == this.keys[0]){
        this.patient = item;
        console.log(this.patient);
      }
    });
   this.symptomList = this.patient.Information.list ;
    console.log(this.symptomList);
    this.infoHere = true; 
  }

  Prescription(){
    this.prescriptionButton = true;
  }

  AddMedicine(){
    this.accountObjectRef = this.db.object("/accounts/" + this.keys[0] + "/Information/meds");
    this.accountObjectRef.set(this.prescription);
    this.prescription = "";
  }

  ScheduleVisit(){
      this.accountObjectRef = this.db.object("/accounts/" + this.keys[1] + "/Schedule/"+ this.keys[0]);
      let info: Doctor = new Doctor(this.keys[0]);
      this.accountObjectRef.update(info);
  }
  ngOnInit() {
  }

} 
