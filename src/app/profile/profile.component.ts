import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';

import { ApiService } from './../app-services/api.service';
import { ProfileService } from './../app-services/profile.service';
import { StorageService } from '../app-services/storage.service';
import { ImageUploadService } from './../app-services/image-upload.service';

const DEFAULT_IMAGE = 'assets/images/avarta.png';
const DEFAULT_COVER = 'assets/images/sample-logos/bg3.jpg';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
          animate('900ms 1.7s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),
    trigger('experience', [
      transition('* => *', [
        query('.media-list', style({ opacity: 0 })),

        query('.media-list', stagger('30ms', [
          animate('900ms 1.7s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),


  ]
})
export class ProfileComponent implements OnInit {

  isLoggedin = false;
  private experienceCount;
  private experienceCountSubscription;
  private skillCount;
  private skillCountSubscription;

  private firstname;
  private lastname;

  private profileAvatarUrl;
  private profileBackgroundUrl;

  private profileImageSlimOptions;
  private coverImageSlimOptions;


  private avatar_url;



  constructor(
    private profileService: ProfileService,
    private apiService: ApiService,
    private storageService: StorageService,
    private imageService: ImageUploadService
  ) {
    this.getExperienceCount();
    this.getSkillCount();
    // this.getAvatar()
  }

  ngOnInit() {
    this.experienceCountSubscription = this.profileService.getExperienceCount()
      .subscribe(experienceCount => this.experienceCount = experienceCount);
    this.skillCountSubscription = this.profileService.getSkillCount()
      .subscribe(skillCount => this.skillCount = skillCount);

    this.firstname = this.storageService.get('firstname');
    this.lastname = this.storageService.get('lastname');

    // this.profileAvatarUrl = 'http://178.62.74.44/uploads/profile/cHJvZmlsZV9hdmF0YXIzMg==.jpg';
    this.profileBackgroundUrl = this.storageService.get('profileBackgroundUrl');




    // console.log(this.profileAvatarUrl)

    this.profileImageSlimOptions = {
      ratio: '1:1',
      label: 'Click here to add profile image',
      rounded: true,
      defaultImage: DEFAULT_IMAGE,
      imageUrl: this.profileAvatarUrl,
      didSave: this.profileImageSave.bind(this)
    };

    this.coverImageSlimOptions = {
      label: 'Click here to add cover image',
      defaultImage: DEFAULT_COVER,
      imageUrl: this.profileBackgroundUrl,
      didSave: this.profileBackgroundSave.bind(this)
    };
  }

  /*
    public getUserDetails() {
        this.apiService.getProfileAvatar(this.storageService.get('memberID'))
        .subscribe( (response) => {
          this.avatar_url = response[0].avatar
          console.log(this.avatar_url)
        })
    }
  */
  public getExperienceCount() {
    this.apiService.getExperience(this.storageService.get('memberID'))
      .subscribe(
        (response) => {
          this.experienceCount = response.length;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public getSkillCount() {
    this.apiService.getSkill(this.storageService.get('memberID'))
      .subscribe(
        (response) => {
          if (response.length === 0) {
            this.skillCount = 0;
          } else {
            this.skillCount = response[0]['skill_title'].length;
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
