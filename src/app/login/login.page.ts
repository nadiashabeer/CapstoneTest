import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  pass: string;
  page: string;
  
  accountList: Account[]; 
  accountListRef: AngularFireList<any>;
  bookingObjectRef: AngularFireObject<any>;

  constructor(private db:AngularFireDatabase,  public toastController: ToastController, private router:Router) { 
    this.email = "";
    this.pass = "";
    this.page = "";
       
    this.accountListRef = this.db.list("/accounts");  // read the whole list from database
    this.accountListRef.snapshotChanges().subscribe(data => this.handleData(data));
  }
  
  handleData(data){
    console.table(data);
    this.accountList = []; 
    data.forEach(item => { 
      let pl = item.payload.toJSON();
      pl['$key'] = item.key;
      this.accountList.push(pl as Account);
    });
  }
  
  CredentialCheck(){  // add 
      this.accountList.forEach(item =>{
        if(item.email == (this.email) && item.password == (this.pass)){
         if(item.accType == "Patient")
            this.router.navigate(['/user-account',{RecordKey:item.$key}]);
          else
            this.router.navigate(['/patient-list',{RecordKey:item.$key}]);
        }
        if(item.email != (this.email) || item.password != (this.pass)){ 
         this.alertUser("Username or Password Error",500);
        }
      });
  }

  async alertUser(msg:string,t:number){
    const toast = await this.toastController.create({
      message: msg,
      duration: t
    });
    toast.present();
  }

  ngOnInit() {
  }
}
