import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToasterService } from 'src/app/services/toaster.service';

@NgModule({
  declarations: [
    // LoginComponent
  ],
  imports: [
    CommonModule,
    // LoginRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ToastModule
  ],
  exports:[
    // LoginComponent
  ],
    providers: [
      MessageService,
      ToasterService
    ]
})
export class LoginModule { }
