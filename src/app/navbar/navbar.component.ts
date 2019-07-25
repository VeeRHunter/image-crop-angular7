import { StorageService } from './../app-services/storage.service';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';
import { AuthService } from './../app-services/auth.service';
import { ApiService } from './../app-services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPipe } from 'ngx-filter-pipe';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('imganimate', [
      transition('* => *', [
        query('img', style({ opacity: 0 })),

        query('img', stagger('30ms', [
          animate('200ms 1.3s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),

    trigger('live', [
      transition('* => *', [
        query('.search', style({ opacity: 0 })),

        query('.search', stagger('30ms', [
          animate('600ms 1.7s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),


  ]
})
export class NavbarComponent implements OnInit {

  private isLoggedIn$: Observable<boolean>;
  private disabled = false;
  private greating;
  private loginForm: FormGroup;

  private isLoginFormSubmitted: Boolean = false;
  private loginErrors;

  private deviceInfo;

  users: any[];
  userFilter: any = { firstname: '', lastname: '' };

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private apiService: ApiService,
    private router: Router,
    private filterPipe: FilterPipe,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private deviceService: DeviceDetectorService
  ) {
    this.loginForm = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      rememberme: [null]
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.storageService.clear();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    // this.users = []
  }

  private login(data) {

    this.isLoginFormSubmitted = true;
    this.storageService.store('password', data.password);
    data['user_agent'] = this.deviceInfo['userAgent'];
    data['login_time'] = new Date().toUTCString();
    this.apiService.login(data).subscribe(
      (response) => {
        this.loginErrors = '';
        console.log(response.value.length);
        console.log(response);
        if (response.value.length >= 1) {
          response = response.value[0];
          this.storageService.store('firstname', response.firstname);
          this.storageService.store('lastname', response.lastname);
          this.storageService.store('email', response.email);
          this.storageService.store('memberID', response.memberID);
          this.authService.login();
          this.router.navigateByUrl('buzz');
        } else {
          this.loginErrors = 'Email or password is invalid';
          this.isLoginFormSubmitted = false;
        }
      },
      (error) => {
        if (error.status === 200) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.loginErrors = 'Error occured during login';
          this.isLoginFormSubmitted = false;
        } else {
          // console.log(error);
          this.loginErrors = 'Error occurred while login';
          this.isLoginFormSubmitted = false;
        }
      }
    );

  }

  onSearch() {


    this.users = [{ firstname: 'Jonathan', lastname: 'Ebere', avar: 'assets/images/6.jpg', title: 'Software Developer' },
    { firstname: 'Jone', lastname: 'Ebere', avar: 'assets/images/6.jpg', title: 'Country Manager' },
    { firstname: 'Mario', lastname: 'Badoo', avar: 'assets/images/6.jpg', title: 'Business Development Officer' },
    { firstname: 'Mobolaji', lastname: 'Lewis', avar: 'assets/images/59639c879aa65_team2.jpg', title: 'Country Manager' },
    {
      firstname: 'Mokola', lastname: 'Edwin',
      avar: 'assets/images/5863cb5a7e3f0_why-you-should-consider-dating-african-girls.jpg',
      title: 'Business Development Officer'
    },
    { firstname: 'Moletus', lastname: 'Ray', avar: 'assets/images/16.jpg', title: 'Marketing Executive' }];
  }

  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
  }

  public logout() {
    this.authService.logout();
    this.storageService.clear();
    this.router.navigateByUrl('');
  }

}
