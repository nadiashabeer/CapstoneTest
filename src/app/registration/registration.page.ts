import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';


class Account{
  $key: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  accType: string;
  
  constructor(fname,lname,email,pass,phoneNo){
   this.firstName = fname;
   this.lastName = lname;
   this.email = email;
   this.phoneNumber = phoneNo
   this.password = pass;
   this.accType = "Patient";
  }
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  fname: string;
  lname: string;
  email: string;
  pass: string;
  phoneNo: string;

  registrationList: Account[]; 
  accountListRef: AngularFireList<any>;

  constructor(private db:AngularFireDatabase,  public toastController: ToastController) { 
    this.fname = "";
    this.lname = "";
    this.email = "";
    this.phoneNo = "";
    this.pass = "";
       
    this.accountListRef = this.db.list("/accounts");
  }

  createAccount(){  //writing to database the list
    this.accountListRef = this.db.list("/accounts");
    let newAccount = new Account(this.fname,this.lname,this.email,this.pass,this.phoneNo);
    this.accountListRef.push(newAccount);
    this.fname = "";
    this.lname = "";
    this.email = "";
    this.phoneNo = "";
    this.pass = "";
    
    
    this.alertUser("Account has been created",2000); // toast controller
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
