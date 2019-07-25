import { StorageService } from './../app-services/storage.service';
import { ApiService } from './../app-services/api.service';
import { ImageUploadService } from './../app-services/image-upload.service';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';
// import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';



// import { UserService } from '../services/user.service'
// import { ExperienceService } from '../services/experience.service'
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operator/first';

import { PopoverModule } from 'ngx-popover';


import { Subject } from 'rxjs';
import { postmodel } from './postmodel';
import { BsModalService, BsModalRef } from '../../../node_modules/ngx-bootstrap/modal';
import { SharedPopupComponent } from '../shared-popup/shared-popup.component';
import { DataservicesService } from '../app-services/dataservices.service';
import { ScrollEvent } from '../../../node_modules/ngx-scroll-event';
import { commentmodel } from './commentmodel';
import { replymodel } from './replymodel';
import { addcommentmodel } from './addcommentmodel';
import { addlikemodel } from './addlikemodel';
import { addpostmodel } from './addpostmodel';
import { likecommentmodel } from './likecommentmodel';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'buzz',
  templateUrl: './buzz.component.html',
  styleUrls: ['./buzz.component.css'],
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
export class BuzzComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    private imageService: ImageUploadService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private modalService: BsModalService,
    private dataService: DataservicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.test();

    this.addLinkForm = formBuilder.group({
      title: [null],
      description: [null],
      post_type: [null],
      post_url: [null],
      provider_url: [null],
      provider_name: [null],
      thumbnail_url: [null],
      html: [null]
    });


    this.loginForm = formBuilder.group({
      post_image: [null],
    });

  }

  @Input() myval;
  // Pass instance name to decorator
  // @BlockUI('cover') blockUIList: NgBlockUI;



  gaugeType = 'arch';
  gaugeSize = 140;
  gaugeThick = 3;
  gaugeCap = 'round';
  gaugeValue;
  gaugeLabel = 'Complete';
  gaugeAppendText = '%';
  guageForegroundColor;
  guageBackgroundColor = 'rgba(77, 208, 226)';


  update: Boolean = false;


  title;
  // url =''
  base_url = 'https://api.embedly.com/1/oembed?';
  wee: any;

  showPostSpinner = 'Loading more';
  showSelectedMessage: boolean;
  showSelectedEmbedly: boolean;
  showSelectedImage: boolean;
  showSelectedVideo: boolean;


  defaultImage = '';
  defaultVideo = '';
  fileToUpload: File = null;
  imageToUpload: File = null;
  newFileName;

  isShareLinkThought = false;
  isSharePhoto = false;
  isShareVideo = false;
  isShareDefault = true;

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
  storageUrl = 'http://165.227.59.197/uploads/';



  result_video: any = { thumbnail_url: '' };

  result_image: any = { thumbnail_url: '' };

  /*
  userDetails: any[]
  firstname
  lastname
  email
  memberID
  showSelected : boolean;

  public loginForm = this.fb.group({
    email: ["", Validators.required],
    profilephoto: ["", Validators.required],
    password: ["", Validators.required]
  });

  */
  private ptype: any;
  private post_type1;
  private post_type_image;
  private post_type_video;
  private provider_url;
  private provider_name;
  private post_type_message;

  private memberID;
  private userDetails = null;
  private fname;

  private friend_of_friend_position;

  private addLinkForm: FormGroup;


  private loginForm: FormGroup;


  private feeds;
  private comments;
  private posterInfo;
  private usersInfo;
  private error;
  private post_result;


  public imageUrl;
  private defaultAvatar = '/assets/images/avatar-collection/009-user-1.png';
  private peoplemayknow: any;
  private friendViewmode = false;

  showThought = false;
  showLink = false;
  showPhoto = false;
  showVideo = false;
  showPreloader = false;
  showLoader = false;
  showMeVideo: boolean;
  showPlaceHolder = true;
  showAvatar = true;

  avatar;


  modalRef: BsModalRef;
  showPost = false;
  offset = 0;
  isLiked = false;

  public addcomment: addcommentmodel;
  public addlike: addlikemodel;
  public addpost: addpostmodel;
  public addcommentlike: likecommentmodel;

  selectedPost: any;
  postModel: Array<postmodel> = [];
  // commentsModel:Array<commentmodel> = [];
  posts: postmodel[];
  comment: commentmodel[];
  reply: replymodel[];

  comment_count;

  public loading = false;

  myFiles: string[] = [];

  public onError(): void {
    this.avatar = this.defaultAvatar;
    console.log(this.avatar);
  }

  ngOnInit() {
    this.loading = true;
    this.showThought = false;
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.loading = false;
    }, 5000);

    // Profile meter
    this.gaugeValue = 54;
    if (this.gaugeValue <= 30) {
      this.guageForegroundColor = 'rgba(253, 94, 137)';
      this.update = true;
    } else if (this.gaugeValue <= 50) {
      this.guageForegroundColor = 'rgba(255, 87, 51)';
      this.update = true;
    } else if (this.gaugeValue <= 70) {
      this.guageForegroundColor = 'rgba(61, 171, 227)';
      this.update = true;
    } else {
      this.guageForegroundColor = 'rgba(19, 174, 162)';
    }
    this.memberID = this.storageService.get('memberID');
    this.fname = this.storageService.get('firstname');


    this.apiService.getUserdetails(this.storageService.get('memberID'))
      .subscribe((response) => {
        console.log(response);

        this.avatar = response[0].avatar;
        console.log(this.avatar);
      });


    this.apiService.getPeopleYouMayKnow(this.memberID) // still working on it
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => { }
      );

    this.listFeeds(); // list of feeds function
    this.apiService.getProfileAvatar(this.memberID) // get user avatar
      .subscribe(
        (response) => {
          this.imageUrl = response;
          console.log(response);
        },
        (error) => { }
      );
    this.apiService.getProfileBackground(this.memberID)
      .subscribe(
        (response) => {

        },
        (error) => { }
      );

    this.peoplemayknow = [];

    this.apiService.getMyFriends(this.memberID)
      .subscribe(
        (myfriends) => {
          myfriends.forEach(friend => {
            console.log(myfriends);
            this.apiService.getMyFriends(friend.memberID)
              .subscribe(
                (res_friends) => {
                  res_friends.forEach(element => {
                    if (element.memberID !== this.memberID) {
                      // check is in my friends lists
                      let infriends = 0;
                      myfriends.forEach(myfriend => {
                        if (infriends === 0 && myfriend.memberID === element.memberID) {
                          infriends = 1;
                        }
                      });
                      if (infriends === 0) {
                        const people = { name: element.firstname + ' ' + element.lastname, avatar: this.defaultAvatar, position: '' };
                        // get detail for job
                        this.apiService.getUserdetails(element.memberID)
                          .subscribe(
                            (res_detail) => {
                              console.log(res_detail);
                              people.position = res_detail[0].current_position;
                              people.avatar = res_detail[0].avatar;
                              if (res_detail.avatar != null) { people.avatar = res_detail.avatar; }
                              this.peoplemayknow.push(people);
                            }
                          );
                      }
                    }
                  });
                });
          });

        },
        (error) => { }
      );


    this.apiService.getUserdetails(this.memberID)
      .subscribe(
        (response) => {
          this.userDetails = response[0];

        },
        (error) => { }
      );

    this.provider_name = 'Careercolony';
    this.provider_url = 'www.careercolony.com';
    this.post_type_message = 'text';

    this.showVideo = false;
    this.showThought = false;
    this.showLink = false;
    this.showPhoto = false;
  }
  /*
  toggleChild(){
    this.showThought = !this.showThought;
  }
  */
  onSelectMember(people) {
    this.router.navigate(['/pp', people.name]);
  }
  public test() {
    this.showVideo = false;
    this.showThought = false;
    this.showLink = false;
    this.showPhoto = true;

  }

  listFeeds() {
    this.apiService.getFeedsByFriends(this.memberID) // Get feeds
      .subscribe(
        (response) => {
          this.feeds = response;
          console.log(this.feeds);
          response.forEach(feeds => {
            // this.ptype = feeds.post_type
            // console.log(this.ptype)

            this.apiService.getUserdetails(feeds.memberID) // Get user details
              .subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                (response) => {
                  this.posterInfo = response;
                  console.log(this.posterInfo);

                }
              );

            this.apiService.getComments(feeds.postID) // Get user comments
              .subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                (response) => {
                  this.comments = response;
                  console.log(this.comments);
                  response.forEach(comments => {
                    this.apiService.getUserdetails(comments.memberID)
                      .subscribe(
                        // tslint:disable-next-line:no-shadowed-variable
                        (response) => {
                          this.usersInfo = response;
                          console.log(this.usersInfo);

                        }
                      );

                  });
                  console.log(response);
                }
              );
          });

        },
        (error) => { }
      );
  }
  handleImageInput(file: FileList) {
    // starting to block
    // this.blockUIList.start('uploading...'); // Start blocking element only
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.defaultImage = event.target.result;
      console.log(this.fileToUpload);

      this.imageService.processImage(this.fileToUpload)
        // this.imageService.avatar(this.memberID, this.fileToUpload)
        .subscribe(data => {
          // this.blockUIList.stop(); // Start blocking element only
          this.result_image = data;
          console.log(data);
        });
      this.provider_name = 'Careercolony';
      this.provider_url = 'www.careercolony.com';
      this.post_type_image = 'image';
      // this.showMeVideo = true

      this.test();

    };

    reader.readAsDataURL(this.fileToUpload);

  }

  handleVideoInput(file: FileList) {
    // this.blockUIList.start('Authenticating video...'); // Start blocking element only

    this.showPreloader = true;
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      console.log(this.fileToUpload);
      this.spinner.show();
      this.imageService.processImage(this.fileToUpload)
        .subscribe(data => {
          this.result_video = data;
          console.log(data);

          // this.blockUIList.stop(); // Start blocking element only
          this.spinner.hide();
          this.showVideo = true; // show submit video form in child component of video
          this.defaultVideo = event.target.result;
          this.showPreloader = false;

        });




    };

    reader.readAsDataURL(this.fileToUpload);


    this.showThought = false;
    this.showLink = false;
    this.showPhoto = false;
  }
  /*
    fileReady(e) {
      const file: File = e[0];
      const fileReader = new FileReader();
      fileReader.onloadend = (event: any) => {
        const arrayBuffer = event.target.result;
        const fileType = "video/mpeg";
        const blob = new Blob(arrayBuffer , {type: fileType });
        const src = URL.createObjectURL(blob);
        video.src = src;
      };
      fileReader.readAsArrayBuffer(file);
    }
  */
  thought() {
    this.showThought = true;
    this.showLink = false;
    this.showPhoto = false;
    this.showVideo = false;
    this.showPlaceHolder = false;
    this.showAvatar = true;
  }

  link() {
    this.showLink = true;
    this.showThought = false;
    this.showPhoto = false;
    this.showVideo = false;
  }

  photo() {
    this.showPhoto = true;
    this.showThought = false;
    this.showLink = false;
    this.showVideo = false;
  }

  video() {
    this.showVideo = true;
    this.showThought = false;
    this.showLink = false;
    this.showPhoto = false;
  }



  viewMoreFriends() {
    this.friendViewmode = true;
  }


  getPosts() {
    const memberId = this.storageService.get('memberID');
    this.apiService.getPosts(memberId, this.offset)     // get posts
      .subscribe(
        (response) => {
          this.posts = response;
          const count = this.posts.length;
          let i = 0;
          for (i = 0; i < count; i++) {
            if (this.posts[i].thumbnail_url) {
              if (this.posts[i].thumbnail_url.startsWith('http')) {
                this.posts[i].thumbnail_url = this.posts[i].thumbnail_url;
              } else {
                this.posts[i].thumbnail_url = 'http://165.227.59.197' + this.posts[i].thumbnail_url;
              }
            }
            if (this.posts[i].author_position) {
              this.posts[i].author_position = 'http://178.62.74.44/uploads/profile/' + this.posts[i].author_position;
            } else {
              this.posts[i].author_position = this.defaultAvatar;
            }
            this.posts[i].showComment = false;
            this.posts[i].likeCount = 0;
            this.posts[i].isLiked = false;
            this.posts[i].commentsModel = [];
            this.postModel.push(this.posts[i]);
          }
        }
      );
  }

  public handleScroll(event: ScrollEvent) {
    if (event.isReachingBottom && !this.showPost) {

      this.showLoader = true;
      this.showPost = true;
      // tslint:disable-next-line:no-unused-expression
      this.showPostSpinner;
      this.offset = this.offset + 3;
      const memberId = this.storageService.get('memberID');
      this.apiService.getPosts(memberId, this.offset)     // get posts
        .subscribe(
          (response) => {
            if (response.length !== 0) {
              this.showPost = false;
              this.posts = response;
              let i = 0;
              for (i = 0; i < this.posts.length; i++) {
                if (this.posts[i].thumbnail_url) {
                  if (this.posts[i].thumbnail_url.startsWith('http')) {
                    this.posts[i].thumbnail_url = this.posts[i].thumbnail_url;
                  } else {
                    this.posts[i].thumbnail_url = 'http://165.227.59.197' + this.posts[i].thumbnail_url;
                  }
                }
                if (this.posts[i].author_position) {
                  this.posts[i].author_position = 'http://178.62.74.44/uploads/profile/' + this.posts[i].author_position;
                } else {
                  this.posts[i].author_position = this.defaultAvatar;
                }
                this.posts[i].showComment = false;
                this.posts[i].likeCount = 0;
                this.posts[i].isLiked = false;
                this.posts[i].commentsModel = [];
                this.postModel.push(this.posts[i]);
              }
            }
          }
        );
    }
    if (event.isReachingTop) {
      // this.showPost = false;

    }
  }

  showComment(post) {
    if (!post.showComment) {
      this.apiService.getComments(post.postID)     // get posts
        .subscribe(
          (response) => {
            this.comment = response;
            this.comment_count = this.comment.length;
            const count = this.comment.length;
            let i = 0;
            for (i = 0; i < count; i++) {
              this.comment[i].likeCount = 0;
              this.comment[i].isLiked = false;
              if (this.comment[i].fullname) {
                this.comment[i].fullname = 'http://178.62.74.44/uploads/profile/' + this.comment[i].fullname;
              } else {
                this.comment[i].fullname = this.defaultAvatar;
              }
              post.commentsModel.push(this.comment[i]);
            }
          }
        );
    }
    post.showComment = true;


  }

  addComment(post) {
    if (post.commentStr) {
      this.addcomment = new addcommentmodel();
      this.addcomment.postID = post.postID;
      this.addcomment.memberID = post.memberID;
      // this.addcomment.commenterID =this.storageService.get('memberID');
      this.addcomment.comment_text = post.commentStr;
      // this.addcomment.message = post.message;
      this.addcomment.post_type = post.post_type;
      this.addcomment.author = post.author;
      this.addcomment.thumbnail_url = post.thumbnail_url;
      this.addcomment.provider_url = post.provider_url;
      this.addcomment.provider_name = post.provider_name;
      this.addcomment.actorID = this.storageService.get('memberID');
      this.addcomment.actorName = this.storageService.get('firstname') + ' ' + this.storageService.get('lastname');
      // this.addcomment.actorAvatar = this.storageService.get('memberID');
      this.addcomment.actorAvatar = this.imageUrl;
      this.addcomment.actorPosition = post.actorPosition;
      this.addcomment.actorCurrent_employer = post.actorCurrent_employer;
      this.addcomment.title = post.title;
      this.addcomment.author_position = post.author_position;
      this.addcomment.author_current_employer = post.author_current_employer;
      this.addcomment.feedType = post.feedType;
      this.addcomment.activityType = post.activityType;


      this.apiService.addComment(this.addcomment).subscribe(
        (response) => {
          this.error = '';
          post.commentStr = null;
          this.comment = [];
          this.comment[0] = response;
          console.log(this.comment[0]);
          this.comment[0].likeCount = 0;
          this.comment[0].isLiked = false;
          if (this.comment[0].fullname) {
            this.comment[0].fullname = 'http://178.62.74.44/uploads/profile/' + this.comment[0].fullname;
          } else {
            this.comment[0].fullname = this.defaultAvatar;
          }
          post.commentsModel.unshift(this.comment[0]);
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {
            this.error = '';

          } else {
            this.error = 'Error occurred while saving education';
          }
        }
      );
    }
  }

  showShared(post) {
    this.dataService.add(post);
    this.modalRef = this.modalService.show(SharedPopupComponent);
  }

  showReplies(com) {
    if (!com.showReply) {
      this.apiService.getReplies(com.commentID)     // get posts
        .subscribe(
          (response) => {
            this.reply = response;
            const count = this.reply.length;
            let i = 0;
            for (i = 0; i < count; i++) {
              this.reply[i].likeCount = 0;
              this.reply[i].isLiked = false;
              if (this.reply[i].fullname) {
                this.reply[i].fullname = 'http://178.62.74.44/uploads/profile/' + this.comment[i].fullname;
              } else {
                this.reply[i].fullname = this.defaultAvatar;
              }
              com.repliesModel.push(this.reply[i]);
            }
          }
        );
    }
    com.showReply = true;
  }


  likePost(post) {
    this.addlike = new addlikemodel();

    post.isLiked = !post.isLiked;
    if (post.isLiked) {
      this.addlike.postID = post.postID;
      this.addlike.memberID = post.memberID;
      // this.addlike.likerID =this.storageService.get('memberID');
      // this.addlike.like = 'true';
      // this.addlike.message = post.message;
      this.addlike.post_type = post.post_type;
      this.addlike.author = post.author;
      this.addlike.thumbnail_url = post.thumbnail_url;
      this.addlike.provider_url = post.provider_url;
      this.addlike.provider_name = post.provider_name;
      this.addlike.actorID = this.storageService.get('memberID');
      this.addlike.actorName = post.actorName;
      this.addlike.actorAvatar = post.actorAvatar;
      this.addlike.actorPosition = post.actorPosition;
      this.addlike.actorCurrent_employer = post.actorCurrent_employer;
      this.addlike.title = post.title;
      this.addlike.author_position = post.author_position;
      this.addlike.author_current_employer = post.author_current_employer;
      this.addlike.feedType = post.feedType;
      this.addlike.activityType = post.activityType;

      this.apiService.addLike(this.addlike).subscribe(
        (response) => {
          this.error = '';
          post.likeCount += (!post.isLiked) ? -1 : 1;
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {
            this.error = '';

          } else {
            this.error = 'Error occurred while saving education';
          }
        }
      );
    } else {
      const memberId = this.storageService.get('memberID');
      this.apiService.unlike(post.postID, memberId).subscribe(
        (response) => {
          this.error = '';
          post.likeCount += (!post.isLiked) ? -1 : 1;
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {
            this.error = '';

          } else {
            this.error = 'Error occurred while saving education';
          }
        }
      );
    }

  }

  addPost() {
    this.addpost.memberID = this.storageService.get('memberID');
    this.addpost.author = this.storageService.get('firstname') + ' ' + this.storageService.get('lastname');
    this.addpost.post_type = 'article';
    this.addpost.thumbnail_url = this.result_image.filename;
    this.addpost.provider_name = 'Careercolony';
    this.addpost.provider_url = 'www.careercolony.com';
    this.addpost.html = '';
    this.addpost.post_url = '';
    this.addpost.likes = [];
    this.addpost.readers = [];
    console.log(this.addpost);
    this.apiService.addArticle(this.addpost).subscribe(
      (response) => {
        // this.completeModal.nativeElement.modal('hide')
        this.error = '';
        this.posts = [];
        this.posts[0] = response;
        this.posts[0].thumbnail_url = 'http://165.227.59.197' + this.posts[0].thumbnail_url;
        this.posts[0].showComment = false;
        this.posts[0].likeCount = 0;
        this.posts[0].isLiked = false;
        this.posts[0].commentsModel = [];
        this.postModel.unshift(this.posts[0]);
        this.addpost = new addpostmodel();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          this.error = '';

        } else {
          this.error = 'Error occurred while saving education';
        }
      }
    );
  }

  likeCommnet(commentLike) {
    this.addcommentlike = new likecommentmodel();
    commentLike.isLiked = !commentLike.isLiked;
    if (commentLike.isLiked) {
      this.addcommentlike.commentID = commentLike.commentID;
      this.addcommentlike.memberID = this.storageService.get('memberID');

      this.apiService.addCommentLike(this.addcommentlike).subscribe(
        (response) => {
          this.error = '';
          commentLike.likeCount += (!commentLike.isLiked) ? -1 : 1;
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {
            this.error = '';

          } else {
            this.error = 'Error occurred while saving education';
          }
        }
      );
    } else {
      const memberId = this.storageService.get('memberID');
      this.apiService.unlikeComment(commentLike.commentID, memberId).subscribe(
        (response) => {
          this.error = '';
          commentLike.likeCount += (!commentLike.isLiked) ? -1 : 1;
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {
            this.error = '';

          } else {
            this.error = 'Error occurred while saving education';
          }
        }
      );
    }
  }


}



