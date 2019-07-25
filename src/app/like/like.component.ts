import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('likeCount') likeCount: number;
  // tslint:disable-next-line:no-input-rename
  @Input('isLiked') isLiked: Boolean;
  @Output() change = new EventEmitter();



  onClick() {
    this.likeCount += (this.isLiked) ? -1 : 1;
    this.isLiked = !this.isLiked;
    this.change.emit(this.isLiked);
  }
}
