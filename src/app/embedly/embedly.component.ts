import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ApiService } from './../app-services/api.service';
import { ImageUploadService } from './../app-services/image-upload.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../app-services/storage.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-embedly',
  templateUrl: './embedly.component.html',
  styleUrls: ['./embedly.component.css']
})
export class EmbedlyComponent implements OnInit {
  @Input() showMeLink: boolean;
  @BlockUI('cover') blockUIList: NgBlockUI;

  base_url = 'https://api.embedly.com/1/oembed?';
  result: any = {
    title: '',
    description: '',
    type: '',
    url: '',
    provider_url: '',
    provider_name: '',
    thumbnail_url: '',
    html: ''
  };

  private addLinkForm;

  private memberID;
  private firstname;
  private lastname;
  private author;

  private avatar;
  private current_employer;
  private current_position;

  error;




  constructor(private apiService: ApiService,
    private imageService: ImageUploadService,
    private storageService: StorageService,
    private http: HttpClient,
    formBuilder: FormBuilder) {
    this.addLinkForm = formBuilder.group({
      title: [null],
      author: [null],
      description: [null],
      post_type: [null],
      post_url: [null],
      provider_url: [null],
      provider_name: [null],
      thumbnail_url: [null],
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

  onPaste(data: string) {
    this.blockUIList.start('uploading...'); // Start blocking element only
    // d2f283608a3b4fa4a6ba77b522d4e26d
    const full_url = this.base_url + 'url=' + data + '&key=1d5c48f7edc34c54bdae4c37b681ea2b&autoplay=true';
    // tslint:disable-next-line:no-shadowed-variable
    this.http.get(full_url).subscribe(data => {
      this.result = data;
      this.blockUIList.stop(); // Stop blocking element only
      console.log(this.result);
    });
  }

  public onLinkFormSubmit() {
    const data = this.addLinkForm.value;
    data['post_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    data['post_type'] = 'link';
    data['author_avatar'] = this.avatar;
    data['author_position'] = this.current_employer;
    data['author_current_employer'] = this.current_position;

    this.apiService.addLink(data).subscribe(
      (response) => {
        this.result = response[0];
        // this.message = 'Experience successfully added';

        console.log(response);

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
          this.error = 'Error occurred while saving post';

        }
      }
    );
  }

}
