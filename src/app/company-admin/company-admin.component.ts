import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';
import { ApiService } from './../app-services/api.service';
import { StorageService } from './../app-services/storage.service';
import { LonLatService } from './../app-services/lon-lat.service';


const DEFAULT_IMAGE = 'assets/images/avatar-collection/company-avatar.png';
const DEFAULT_COVER = 'assets/images/sample-logos/bg3.jpg';

@Component({
  selector: 'app-company-admin',
  templateUrl: './company-admin.component.html',
  styleUrls: ['./company-admin.component.css'],
  animations: [
    trigger('imganimate', [
      transition('* => *', [
        query('img', style({ opacity: 0 })),

        query('img', stagger('60ms', [
          animate('600ms 1.3s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),

    trigger('page', [
      transition('* => *', [
        query('.page-content', style({ opacity: 0 })),

        query('.page-content', stagger('30ms', [
          animate('600ms 1.7s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),


  ]
})
export class CompanyAdminComponent implements OnInit {

  lat = 6.5760641;
  lng = 3.3661079;

  latlng;
  address;



  private profileAvatarUrl;
  private profileBackgroundUrl;

  private profileImageSlimOptions;
  private coverImageSlimOptions;
  constructor(private apiService: ApiService,
    private storageService: StorageService,
    private lonLatService: LonLatService) { }

  ngOnInit() {
    this.profileImageSlimOptions = {
      ratio: '1:1',
      label: 'Click here to add profile image',
      rounded: true,
      defaultImage: DEFAULT_IMAGE,
      imageUrl: this.profileAvatarUrl,
      // imageUrl: 'http://178.62.74.44/uploads/profile/cHJvZmlsZV9hdmF0YXIzMg==.jpg',
      didSave: this.profileImageSave.bind(this)
    };

    this.coverImageSlimOptions = {
      label: 'Click here to add cover image',
      defaultImage: DEFAULT_COVER,
      imageUrl: this.profileBackgroundUrl,
      didSave: this.profileBackgroundSave.bind(this)
    };

    this.profileBackgroundUrl = this.storageService.get('profileBackgroundUrl');

    // this.address = '719A Adetokunbo Ademola street Victoria island lagos'

    this.latlng = this.lonLatService.getLatLon();

    console.log(this.latlng);



  }

  public companyDetails() {
    // getLatLon
  }

  public profileImageSave(data) {

    const body = {
      memberID: this.storageService.get('memberID'),
      base64Image: data.output.image.replace(/^data:image\/.{2,4};base64,/, '')
    };

    this.apiService.updateProfileAvatar(body)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {

          }
        }
      );
    return true;

  }

  public profileBackgroundSave(data) {


    const body = {
      memberID: this.storageService.get('memberID'),
      base64BgImage: data.output.image.replace(/^data:image\/.{2,4};base64,/, '')

    };
    this.apiService.updateProfileBackground(body)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {

          }
        }
      );
    return true;
  }

}
