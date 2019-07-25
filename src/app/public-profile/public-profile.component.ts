import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { StorageService } from '../app-services/storage.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  public firstname;
  public lastname;
  public memberID;
  public baseUrl = 'http://careercolony.com/pub/';
  public profileUrl; // The profile url variable to be stored on the database
  constructor(private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService) { }

  ngOnInit() {
    this.firstname = this.storageService.get('firstname');
    this.route.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(params.get('memberID'));
      this.memberID = id;
      this.profileUrl = this.baseUrl + '' + this.firstname + '-' + this.lastname;
    });
  }


}
