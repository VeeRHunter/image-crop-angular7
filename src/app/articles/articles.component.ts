import { Component, OnInit } from '@angular/core';
import { StorageService } from './../app-services/storage.service';
import { ApiService } from './../app-services/api.service';
import { ImageUploadService } from './../app-services/image-upload.service';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
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
export class ArticlesComponent implements OnInit {

  // Pass instance name to decorator
  @BlockUI('cover') blockUIList: NgBlockUI;


  defaultImage = '';
  newCover = false;
  fileToUpload: File = null;

  private memberID;
  private addArticleForm: FormGroup;

  private article_result;
  private error;

  result_image: any = {
    thumbnail_url: ''
  };

  private firstname;
  private lastname;

  private author;
  // private thumbnail_url = 'http://165.227.59.197/assets/uploads/'+ this.fileToUpload
  private type;
  private provider_name;
  private provider_url;
  private post_type;

  private avatar;
  private current_employer;
  private current_position;

  public defaultFoto = true;
  public defaultCoverButton = true;
  public newCoverButton = false;
  public defaultCover = true;
  public buttonName: any = '';




  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    private imageService: ImageUploadService,
    private http: HttpClient) {
    this.addArticleForm = formBuilder.group({
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
    this.memberID = this.storageService.get('memberID');
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

    this.provider_name = 'Careercolony';
    this.provider_url = 'www.careercolony.com';
    this.post_type = 'link';

  }
  /*
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)
      this.buttonName = "Remove cover";
    else
      this.buttonName = "Add cover";
  }
  */

  removeDefaultCover() {
    this.defaultCoverButton = false;
    this.defaultCover = false;
    this.buttonName = 'Add cover';
  }
  addCover() {
    this.defaultCover = true;
    this.defaultCoverButton = true;
    this.buttonName = '';
  }

  removeNewCover() {
    this.defaultCover = true;
    this.defaultImage = '';
    this.defaultCoverButton = true;
    this.newCoverButton = false;
    this.defaultFoto = true;
    this.newCover = false;
  }

  handleFileInput(file: FileList) {

    // starting to block
    this.blockUIList.start('uploading...'); // Start blocking element only

    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.defaultImage = event.target.result;
    };


    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload);
    this.imageService.processImage(this.fileToUpload)
      .subscribe(data => {
        this.result_image = data;

        console.log(data);
      });
    this.defaultFoto = false;
    this.newCoverButton = true;
    this.defaultCoverButton = false;
    this.buttonName = '';
    this.newCover = true;

    // this.blockUIList.stop(); // Stop blocking element only



  }

  onSubmitArticle(memberID, title, description, provider_name, provider_url, post_type, url, html, image) {
    this.imageService.addArticle(
      memberID.value, title.value, description.value,
      provider_name.value, provider_url.value, post_type.value,
      url.value, html.value, this.fileToUpload
    )
      .subscribe(data => {
        console.log(data);
        memberID.value = null;
        title.value = null;
        description.value = null;
        provider_name.value = null;
        provider_url.value = null;
        post_type.value = null;

      });
  }
  /*
    onSubmit(memberID,title, image){
      this.imageService.postFile(memberID.value, title.value, this.fileToUpload )
      .subscribe( data =>{
        console.log(data);
        memberID.value = null
        title.value = null
        image.value = null
      })
    }
  */
  public postArticle() {
    const data = this.addArticleForm.value;
    data['post_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    data['post_type'] = 'link';
    data['author_avatar'] = this.avatar;
    data['author_position'] = this.current_employer;
    data['author_current_employer'] = this.current_position;
    this.apiService.addArticle(data).subscribe(
      (response) => {
        this.article_result = response[0];
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
          this.error = 'Error occurred while saving education';

        }
      }
    );
  }

}
