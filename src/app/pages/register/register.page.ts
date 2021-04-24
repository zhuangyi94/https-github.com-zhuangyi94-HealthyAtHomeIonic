import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  personalInformation: FormGroup;
  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private authService:AuthenticationService
  ) { }

  ngOnInit() {
    this.personalInformation = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name:['', [Validators.required]],
      age:['', [Validators.required]],
      email:['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      roleid:['4dcaa8c7-a16d-4144-b759-29c1642b2e53']
    });
  }
  async register(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService.register(this.personalInformation.value).subscribe(
      async (res) => {
        await loading.dismiss();
        if(this.authService.error =='')
        {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });

        }
        else{
          const alert = await this.alertController.create({
            header: 'Registration failed',
            message: this.authService.error,
            buttons: ['OK'],
          });
  
          await alert.present();

        } 
        
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Registration failed',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }
    // Easy access for form fields
    get username() {
      return this.personalInformation.get('username');
    }
  
    get password() {
      return this.personalInformation.get('password');
    }
    get name() {
      return this.personalInformation.get('name');
    }
    get age() {
      return this.personalInformation.get('age');
    }
    get email() {
      return this.personalInformation.get('email');
    }
  
}
