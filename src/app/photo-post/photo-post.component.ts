import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ApiService } from './../app-services/api.service';
import { ImageUploadService } from './../app-services/image-upload.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../app-services/storage.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-photo-post',
  templateUrl: './photo-post.component.html',
  styleUrls: ['./photo-post.component.css']
})
export class PhotoPostComponent implements OnInit {
  @Input() showMePhoto: Boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('previewImage') previewImage;
  // tslint:disable-next-line:no-input-rename
  @Input('thumbnail_url') thumbnail_url: any;
  @BlockUI('cover') blockUIList: NgBlockUI;

  private resultDisplay: Boolean = false;

  private addImageForm: FormGroup;
  private error;
  post_result: any = {};
  previewThumbnail;

  private post_type_image = 'image';
  private provider_url = 'www.careercolony.com';
  private provider_name = 'Careercolony';

  private firstname;
  private lastname;
  private author;

  private avatar;
  private current_employer;
  private current_position;


  defaultImage = '';
  fileToUpload: File = null;
  imageToUpload: File = null;

  constructor(private apiService: ApiService,
    private imageService: ImageUploadService,
    private storageService: StorageService,
    private http: HttpClient,
    formBuilder: FormBuilder
  ) {
    this.addImageForm = formBuilder.group({
      memberID: [null, Validators.required],
      author: [null],
      message: [null],
      thumbnail_url: [null],
      provider_name: [null],
      provider_url: [null],
      post_type: [null]
    });
  }



  ngOnInit() {
    this.firstname = this.storageService.get('firstname');
    this.lastname = this.storageService.get('lastname');
    this.author = this.firstname + ' ' + this.lastname;

    this.apiService.getUserdetails(this.storageService.get('memberID'))
      .subscribe((response) => {
        console.log(response);
        this.avatar = response[0].avatar;
        this.current_position = response[0].current_position;
        this.current_employer = response[0].current_employer;

      });
  }



  onImageFormSubmit() {
    const data = this.addImageForm.value;
    data['post_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    data['post_type'] = 'image';
    data['author_avatar'] = this.avatar;
    data['author_position'] = this.current_employer;
    data['author_current_employer'] = this.current_position;
    this.apiService.addImage(data).subscribe(
      (response) => {
        this.post_result = response;
        // this.message = 'Experience successfully added';
        this.previewThumbnail = 'http://165.227.59.197' + this.post_result.thumbnail_url;
        this.resultDisplay = true;
        this.showMePhoto = false;
        console.log(this.post_result);

      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          // this.message = 'Experience successfully added';

        } else {
          // this.message = '';
          this.error = 'Error occurred while saving image';

        }
      }
    );
  }



}
