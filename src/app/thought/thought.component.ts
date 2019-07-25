import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from './../app-services/storage.service';
import { ApiService } from './../app-services/api.service';



@Component({
  selector: 'app-thought',
  templateUrl: './thought.component.html',
  styleUrls: ['./thought.component.css'],
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
export class ThoughtComponent implements OnInit {
  @Input() showMeThought: Boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('thumbnail_url') thumbnail_url: any;
  private addMessageForm: FormGroup;
  private post_result;
  private error;

  private firstname;
  private lastname;
  private author;
  private avatar;
  private current_employer;
  private current_position;

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService) {
    this.addMessageForm = formBuilder.group({
      message: [null],
      post_type: [null],
      provider_url: [null],
      provider_name: [null]
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

  public onMessageFormSubmit() {
    const data = this.addMessageForm.value;
    this.author = this.firstname + ' ' + this.lastname;
    data['post_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    data['author'] = this.author;
    data['post_type'] = 'thought';
    data['author_avatar'] = this.avatar;
    data['author_position'] = this.current_employer;
    data['author_current_employer'] = this.current_position;
    data['provider_url'] = 'www.careercolony.com';
    data['provider_name'] = 'Careercolony';

    this.apiService.addMessage(data).subscribe(
      (response) => {
        this.post_result = response[0];
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
          this.error = 'Error occurred while saving message';

        }
      }
    );
  }

}
