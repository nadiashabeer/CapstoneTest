import { Component, OnInit } from '@angular/core';
import{​​​AngularFireDatabase,AngularFireList,AngularFireObject}​​​from'@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


class Account{
  $key: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  accType: string;
}

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
})
export class PatientListPage implements OnInit {
  registrationList: Account[]; 
  patientList: Account[];
  accountListRef: AngularFireList<any>;
  accObjectRef: AngularFireObject<any>;
  drKey: string;

  constructor(private router:Router,private activatedRoute:ActivatedRoute, private db:AngularFireDatabase) {
    this.drKey = activatedRoute.snapshot.paramMap.get('RecordKey');
    this.registrationList = []; 
    this.patientList = []; 
    this.accountListRef = this.db.list("/accounts");
    this.accountListRef.snapshotChanges().subscribe(data => this.handleData(data)); //read list from db
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
      if(item.accType == "Patient"){
        this.patientList.push(item);
      }
  });
  console.table(this.registrationList + " r and p " + this.patientList); 
  }
  
  
  goToDetail(recordKey)
 {
    let keys = [recordKey,this.drKey];
    this.router.navigate(['/patient-details',{Keys:keys}]);
 }

  ngOnInit() {
  }

}
