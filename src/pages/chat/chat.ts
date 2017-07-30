import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  username: string = '';
  usernameJa: string = '';
  message: string = '';
  s;
  messages: object[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public authProvider: AuthProvider
  ) {
    authProvider.authState.subscribe(user => {
      if (user) {
        console.log('jest user', user);
        this.usernameJa = user.displayName;
        console.log('usernameJa: ' + this.usernameJa);
      } else {
        console.log('nie ma user');
      }
    });
    this.username = this.authProvider.user.displayName;
    // this.username = this.navParams.get('username');
    //                                   const username = this.usernameJa
    this.s = this.db.list('/chat').subscribe(data => {
      // data.map(elem => {
      //   this.messages.push(elem);
      // });

      this.messages = data;
    });
  }

  sendMessage() {
    this.db
      .list('/chat')
      .push({
        username: this.username,
        message: this.message
      })
      .then(() => {
        // wiadomosc wyslana
      })
      .catch(() => {
        // error
      });
    this.message = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
}
