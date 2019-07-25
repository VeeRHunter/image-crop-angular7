import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataservicesService } from '../app-services/dataservices.service';
import { ApiService } from '../app-services/api.service';
import { StorageService } from '../app-services/storage.service';
import { friendmodel } from './friendmodel';
import { addsharepostmodel } from './addsharepostmodel';

@Component({
  selector: 'app-shared-popup',
  templateUrl: './shared-popup.component.html',
  styleUrls: ['./shared-popup.component.css']
})
export class SharedPopupComponent implements OnInit {

  public onClose: Subject<boolean>;
  public post: any;
  public error: any;
  public friendList: friendmodel[];
  public addsharepost: addsharepostmodel;

  constructor(
    public _bsModalRef: BsModalRef,
    private dataService: DataservicesService,
    private apiService: ApiService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.post = this.dataService.data;
    this.getMyFirendList();
    this.addsharepost = new addsharepostmodel();
  }
  public sharePost(post): void {
    // tslint:disable-next-line:no-debugger
    debugger;
    console.log(post);
    console.log(this.friendList);

    // var MemberId = this.storageService.get('memberID');
    this.addsharepost.memberID = this.storageService.get('memberID');
    this.addsharepost.postID = post.postID;
    this.addsharepost.shareID = this.storageService.get('memberID');
    this.addsharepost.recipients = [];
    const count = this.friendList.length;
    let i = 0;
    let j = 0;
    for (i = 0; i < count; i++) {
      if (this.friendList[i].hasShared) {
        this.addsharepost.recipients[j] = this.friendList[i].email;
        j++;
      }
    }
    if (this.addsharepost.recipients.length !== 0) {
      this.apiService.sharePost(this.addsharepost).subscribe(
        (response) => {
          this.onClose.next(true);
          this._bsModalRef.hide();
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

  public onCancel(): void {
    this.onClose.next(false);
    this._bsModalRef.hide();
  }

  getMyFirendList() {
    const MemberId = this.storageService.get('memberID');
    this.apiService.getMyFriends(MemberId).subscribe(
      (response) => {
        // tslint:disable-next-line:no-debugger
        debugger;
        this.friendList = [];
        this.friendList = response;
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
