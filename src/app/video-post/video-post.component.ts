import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ApiService } from './../app-services/api.service';
import { ImageUploadService } from './../app-services/image-upload.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../app-services/storage.service';

@Component({
  selector: 'app-video-post',
  templateUrl: './video-post.component.html',
  styleUrls: ['./video-post.component.css']
})
export class VideoPostComponent implements OnInit {

  @Input() showMeVideo: Boolean;
  @Input() showPreloaderVideo: Boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('previewVideo') previewVideo;
  // tslint:disable-next-line:no-input-rename
  @Input('poster_url') poster_url: any;

  post_result: any = {};

  private imageUploadUrl = 'http://165.227.59.197';
  private videoForm: FormGroup;
  private error;

  private post_type_video = 'video';
  private provider_url = 'www.careercolony.com';
  private provider_name = 'Careercolony';

  private firstname;
  private lastname;
  private author;
  private avatar;
  private current_employer;
  private current_position;

  defaultVideo = '';
  fileToUpload: File = null;
  imageToUpload: File = null;
  previewPoster;

  private resultDisplay;

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    private imageService: ImageUploadService,
    private http: HttpClient) {
    this.videoForm = formBuilder.group({
      memberID: [null, Validators.required],
      author: [null],
      message: [null],
      thumbnail_url: [null],
      provider_name: [null],
      provider_url: [null],
      post_type: [null],
      html: [null]

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



  onVideoFormSubmit() {
    const data = this.videoForm.value;
    data['post_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    data['author'] = this.author;
    data['author_avatar'] = this.avatar;
    data['author_position'] = this.current_employer;
    data['author_current_employer'] = this.current_position;
    data['post_type'] = 'video';
    data['provider_url'] = 'www.careercolony.com';
    data['provider_name'] = 'Careercolony';
    this.apiService.addVideo(data).subscribe(
      (response) => {
        this.post_result = response;


        this.previewPoster = 'http://165.227.59.197' + this.post_result.thumbnail_url;
        this.resultDisplay = true;
        this.showMeVideo = false;



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
          this.error = 'Error occurred while saving video';

        }
      }
    );
  }


}
