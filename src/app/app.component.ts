import { Component } from '@angular/core';
import { AuthService } from './Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private service:AuthService) {}
login() {
  this.service.login({email:'nvandana1@gmail.com',password:'Vandana@094'}).subscribe({next:(res) => {
    console.log(res);
  },error:(err) => {
    console.log(err);
  }});
}
  title = 'learning-angular';
}
