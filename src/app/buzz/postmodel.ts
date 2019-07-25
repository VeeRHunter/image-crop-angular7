import { commentmodel } from './commentmodel';

// tslint:disable-next-line:class-name
export class postmodel {
    public postID: string;
    public memberID: string;
    public author: string;
    public title: string;
    public description: string;
    public message: string;
    public type: string;
    public url: string;
    public provider_url: string;
    public provider_name: string;
    public thumbnail_url: string;
    public html: string;
    public avatar_url: string;
    public post_date: string;
    public post_type: string;
    public showComment = false;
    public commentStr: string;
    public likeCount = 0;
    public isLiked = false;
    public author_position: string;
    public activityType: string;
    public feedType: string;
    public author_current_employer: string;
    public author_avatar: string;
    public commentsModel: Array<commentmodel> = [];

}
