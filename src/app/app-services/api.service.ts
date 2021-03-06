import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';


import { HttpResponse, HttpErrorResponse } from '@angular/common/http/src/response';

// const API_BASE_URL = environment.apiBaseUrl;
const PREFIX_URL = '';

const API_CONFIG = {
  login: {
    baseUrl: 'http://localhost:8088',
    // baseUrl: 'http://178.62.74.44:8086',
    endpoint: '/login',
    method: 'POST'
  },

  getUserdetails: {
    // baseUrl: 'http://178.62.74.44:8086',
    baseUrl: 'http://localhost:8088',
    endpoint: '/get-user/memberID',
    method: 'GET'
  },
  signup: {
    // baseUrl: 'http://localhost:8086',
    // baseUrl: 'http://localhost:8088',
    baseUrl: 'http://178.62.74.44:8086',
    endpoint: '/new-member',
    method: 'POST'
  },
  signupSteps: {
    baseUrl: 'http://localhost:8088',
    // baseUrl: 'http://178.62.74.44:8086',
    endpoint: '/signup-steps',
    method: 'PUT'
  },
  updateInterest: {
    baseUrl: 'http://localhost:8088',
    // baseUrl: 'http://178.62.74.44:8086',
    endpoint: '/update-interest',
    method: 'PUT'
  },

  verifyEmail: {
    baseUrl: 'http://178.62.74.44:8086',
    endpoint: '/verify-email/memberID',
    method: 'GET'

  },
  addExperience: {
    baseUrl: 'http://localhost:8087',
    // baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/new-experience',
    method: 'POST'
  },
  getExperience: {
    // baseUrl: 'http://localhost:8087',
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/get-experience/memberID',
    method: 'GET'
  },
  updateExperience: {
    // baseUrl: 'http://localhost:8087',
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-experience',
    method: 'PUT'
  },
  deleteExperience: {
    // baseUrl: 'http://localhost:8087',
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/delete-experience/expID',
    method: 'GET'
  },
  initSkill: {
    // baseUrl: 'http://localhost:8087',
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/new-skill',
    method: 'POST'
  },
  addSkill: {
    // baseUrl: 'https://api-profile.cfapps.io',
    // baseUrl: 'http://localhost:8087',
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-skill',
    method: 'PUT'
  },
  getSkill: {
    // baseUrl: 'https://api-profile.cfapps.io',
    baseUrl: 'http://178.62.74.44:8087',
    // baseUrl: 'http://localhost:8087',
    endpoint: '/get-skill/memberID',
    method: 'GET'
  },
  deleteSkill: {
    // baseUrl: 'https://api-profile.cfapps.io',
    // baseUrl: 'http://localhost:8087',
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/delete-skill',
    method: 'GET'
  },
  addEducation: {
    // baseUrl: 'http://localhost:8087',
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/new-education',
    method: 'POST'
  },
  updateEducation: {
    // baseUrl: 'https://api-profile.cfapps.io',
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-education',
    method: 'PUT'
  },
  getEducation: {
    // baseUrl: 'http://localhost:8087',
    baseUrl: 'http://178.62.74.44:8087',
    // baseUrl: 'https://api-profile.cfapps.io',
    endpoint: '/get-education/memberID',
    method: 'GET'
  },
  deleteEducation: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/delete-education/eduID',
    method: 'GET'
  },
  addCertification: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/new-certification',
    method: 'POST'
  },
  updateCertification: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-certification',
    method: 'PUT'
  },
  getCertification: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/get-certification/memberID',
    method: 'GET'
  },
  deleteCertification: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/delete-certification/certID',
    method: 'GET'
  },
  addProject: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/new-project',
    method: 'POST'
  },
  updateProject: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-project',
    method: 'PUT'
  },
  getProject: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/get-project/memberID',
    method: 'GET'
  },
  deleteProject: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/delete-project/projID',
    method: 'GET'
  },
  addAward: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/new-award',
    method: 'POST'
  },
  updateAward: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-award',
    method: 'PUT'
  },
  getAward: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/get-award/memberID',
    method: 'GET'
  },
  deleteAward: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/delete-award/awID',
    method: 'GET'
  },
  addWebp: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/new-webp',
    method: 'POST'
  },
  updateWebp: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-webp',
    method: 'PUT'
  },
  getWebp: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/get-webp/memberID',
    method: 'GET'
  },
  deleteWebp: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/delete-webp/webpID',
    method: 'GET'
  },
  addLanguage: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/new-language',
    method: 'POST'
  },
  updateLanguage: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-language',
    method: 'PUT'
  },
  getLanguage: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/get-language/memberID',
    method: 'GET'
  },
  deleteLanguage: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/delete-language/langID',
    method: 'GET'
  },
  addPortfolio: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/new-portfolio',
    method: 'POST'
  },
  updatePortfolio: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-portfolio',
    method: 'PUT'
  },
  getPortfolio: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/get-portfolio/memberID',
    method: 'GET'
  },
  deletePortfolio: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/delete-portfolio/mediaID',
    method: 'GET'
  },
  getProfileAvatar: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/get-avatar/memberID',
    method: 'GET'
  },
  updateProfileAvatar: {
    // baseUrl: 'http://localhost:8098/newuser/upload',
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-avatar',
    method: 'PUT'
  },
  getProfileBackground: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/get_profile_bg/memberID',
    method: 'GET'
  },
  updateProfileBackground: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/update-profile-bg-photo',
    method: 'PUT'
  },
  getMyFriends: {
    baseUrl: 'http://178.62.74.44:8086',
    endpoint: '/get-my-friends/memberID',
    method: 'GET'

  },
  getPeopleYouMayKnow: {
    baseUrl: 'http://178.62.74.44:8087',
    endpoint: '/people-you-may-know/memberID',
    method: 'GET'

  },

  addMessage: {
    // baseUrl: 'http://localhost:8088',
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/new-post',
    method: 'POST'
  },

  addLink: {
    // baseUrl: 'http://localhost:8088',
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/new-post',
    method: 'POST'
  },

  addImage: {
    // baseUrl: 'http://localhost:8088',
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/new-post',
    method: 'POST'
  },

  addVideo: {
    // baseUrl: 'http://localhost:8088',
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/new-post',
    method: 'POST'
  },

  addArticle: {
    // baseUrl: 'http://localhost:8088',
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/new-post',
    method: 'POST'
  },

  getFeedsByFriends: {
    // baseUrl: 'http://178.62.74.44:8088',
    baseUrl: 'http://localhost:8088',
    endpoint: '/v1/get-friends-post/memberID',
    method: 'GET'
  },

  getFeeds: {
    // baseUrl: 'http://178.62.74.44:8088',
    baseUrl: 'http://localhost:8088',
    endpoint: '/get-post/memberID',
    method: 'GET'
  },

  // getComments:{
  // baseUrl: 'http://178.62.74.44:8088',
  // baseUrl: 'http://localhost:8088',
  // endpoint: '/get-comments/postID',
  // method: 'GET'
  // }

  getComments: {
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/get-comments/postID',
    method: 'GET'
  },

  getPost: {
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/get-friends-post/memberID',
    method: 'GET'
  },


  addComment: {
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/new-comment',
    method: 'POST'
  },

  addLike: {
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/likepost',
    method: 'PUT'
  },
  unlike: {
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/unlikepost/postID',
    method: 'GET'
  },
  addCommentLike: {
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/like-comment',
    method: 'PUT'
  },
  unlikeComment: {
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/unlike-comment/commentID',
    method: 'GET'
  },
  getReplies: {
    // baseUrl: 'http://178.62.74.44:8088',
    baseUrl: 'http://localhost:8088',
    endpoint: '/v1/get-replies/commentID',
    method: 'GET'
  },
  sharePost: {
    baseUrl: 'http://178.62.74.44:8088',
    endpoint: '/v1/sharepost',
    method: 'PUT'
  }


};

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // {"firstname": "Revio", "lastname": "Maya", "email": "wale@yahoo.com",
  // "password":"123456", "address": {"city":"Maryland", "state":"Lagos"}  }

  public composeRequest(method: string, url: string, body: any): Observable<HttpResponse<any>> {

    return this.http.request(method, url, { body: body, observe: 'response' });
  }

  public handleError(error: HttpErrorResponse): Observable<Error> {

    console.error('API error occurred');
    console.error(error);
    return Observable.throw(error);
  }

  public ping() {
    console.log('API Service pinged');
  }

  public signup(data: any): Observable<any> {

    const method = API_CONFIG.signup.method;
    const url = PREFIX_URL + API_CONFIG.signup.baseUrl + API_CONFIG.signup.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return Observable.of(response.body);
      }).catch(error => {
        return this.handleError(error);
      });
  }


  public login(data: any): Observable<any> {

    const method = API_CONFIG.login.method;
    const url = PREFIX_URL + API_CONFIG.login.baseUrl + API_CONFIG.login.endpoint;
    return this.composeRequest(method, url, data)
      .pipe(map(response => {
        return Observable.of(response.body);
      })).catch(error => {
        return this.handleError(error);
      });
  }

  public getUserdetails(memberID): Observable<any> {

    const method = API_CONFIG.getUserdetails.method;
    const url = PREFIX_URL + API_CONFIG.getUserdetails.baseUrl + API_CONFIG.getUserdetails.endpoint + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public signupSteps(data: any): Observable<any> {

    const method = API_CONFIG.signupSteps.method;
    const url = PREFIX_URL + API_CONFIG.signupSteps.baseUrl + API_CONFIG.signupSteps.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateInterest(data: any): Observable<any> {

    const method = API_CONFIG.updateInterest.method;
    const url = PREFIX_URL + API_CONFIG.updateInterest.baseUrl + API_CONFIG.updateInterest.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public verifyEmail(memberID): Observable<any> {

    const method = API_CONFIG.verifyEmail.method;
    const url = PREFIX_URL + API_CONFIG.verifyEmail.baseUrl + API_CONFIG.verifyEmail.endpoint + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }
  public addExperience(data: any): Observable<any> {

    const method = API_CONFIG.addExperience.method;
    const url = PREFIX_URL + API_CONFIG.addExperience.baseUrl + API_CONFIG.addExperience.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateExperience(data: any): Observable<any> {

    const method = API_CONFIG.updateExperience.method;
    const url = PREFIX_URL + API_CONFIG.updateExperience.baseUrl + API_CONFIG.updateExperience.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public deleteExperience(expID): Observable<any> {

    const method = API_CONFIG.deleteExperience.method;
    const url = PREFIX_URL + API_CONFIG.deleteExperience.baseUrl + API_CONFIG.deleteExperience.endpoint + '/' + expID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getExperience(memberID): Observable<any> {

    const method = API_CONFIG.getExperience.method;
    const url = PREFIX_URL + API_CONFIG.getExperience.baseUrl + API_CONFIG.getExperience.endpoint + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public initSkill(data): Observable<any> {

    const method = API_CONFIG.initSkill.method;
    const url = PREFIX_URL + API_CONFIG.initSkill.baseUrl + API_CONFIG.initSkill.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addSkill(data): Observable<any> {

    const method = API_CONFIG.addSkill.method;
    const url = PREFIX_URL + API_CONFIG.addSkill.baseUrl + API_CONFIG.addSkill.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public deleteSkill(memberID, skill_title): Observable<any> {

    const method = API_CONFIG.deleteSkill.method;
    const url = PREFIX_URL + API_CONFIG.deleteSkill.baseUrl + API_CONFIG.deleteSkill.endpoint
      + '/memberID/' + memberID + '/skill_title/' + skill_title;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getSkill(memberID): Observable<any> {

    const method = API_CONFIG.getSkill.method;
    const url = PREFIX_URL + API_CONFIG.getSkill.baseUrl + API_CONFIG.getSkill.endpoint + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addEducation(data): Observable<any> {

    const method = API_CONFIG.addEducation.method;
    const url = PREFIX_URL + API_CONFIG.addEducation.baseUrl + API_CONFIG.addEducation.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateEducation(data): Observable<any> {

    const method = API_CONFIG.updateEducation.method;
    const url = PREFIX_URL + API_CONFIG.updateEducation.baseUrl + API_CONFIG.updateEducation.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getEducation(memberID): Observable<any> {

    const method = API_CONFIG.getEducation.method;
    const url = PREFIX_URL + API_CONFIG.getEducation.baseUrl + API_CONFIG.getEducation.endpoint + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public deleteEducation(eduID): Observable<any> {

    const method = API_CONFIG.deleteEducation.method;
    const url = PREFIX_URL + API_CONFIG.deleteEducation.baseUrl + API_CONFIG.deleteEducation.endpoint + '/' + eduID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addCertification(data): Observable<any> {

    const method = API_CONFIG.addCertification.method;
    const url = PREFIX_URL + API_CONFIG.addCertification.baseUrl + API_CONFIG.addCertification.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateCertification(data): Observable<any> {

    const method = API_CONFIG.updateCertification.method;
    const url = PREFIX_URL + API_CONFIG.updateCertification.baseUrl + API_CONFIG.updateCertification.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getCertification(memberID): Observable<any> {

    const method = API_CONFIG.getCertification.method;
    const url = PREFIX_URL + API_CONFIG.getCertification.baseUrl + API_CONFIG.getCertification.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public deleteCertification(certID): Observable<any> {

    const method = API_CONFIG.deleteCertification.method;
    const url = PREFIX_URL + API_CONFIG.deleteCertification.baseUrl + API_CONFIG.deleteCertification.endpoint
      + '/' + certID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addProject(data): Observable<any> {

    const method = API_CONFIG.addProject.method;
    const url = PREFIX_URL + API_CONFIG.addProject.baseUrl + API_CONFIG.addProject.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateProject(data): Observable<any> {

    const method = API_CONFIG.updateProject.method;
    const url = PREFIX_URL + API_CONFIG.updateProject.baseUrl + API_CONFIG.updateProject.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getProject(memberID): Observable<any> {

    const method = API_CONFIG.getProject.method;
    const url = PREFIX_URL + API_CONFIG.getProject.baseUrl + API_CONFIG.getProject.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public deleteProject(projID): Observable<any> {

    const method = API_CONFIG.deleteProject.method;
    const url = PREFIX_URL + API_CONFIG.deleteProject.baseUrl + API_CONFIG.deleteProject.endpoint
      + '/' + projID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addAward(data): Observable<any> {

    const method = API_CONFIG.addAward.method;
    const url = PREFIX_URL + API_CONFIG.addAward.baseUrl + API_CONFIG.addAward.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateAward(data): Observable<any> {

    const method = API_CONFIG.updateAward.method;
    const url = PREFIX_URL + API_CONFIG.updateAward.baseUrl + API_CONFIG.updateAward.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getAward(memberID): Observable<any> {

    const method = API_CONFIG.getAward.method;
    const url = PREFIX_URL + API_CONFIG.getAward.baseUrl + API_CONFIG.getAward.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public deleteAward(awID): Observable<any> {

    const method = API_CONFIG.deleteAward.method;
    const url = PREFIX_URL + API_CONFIG.deleteAward.baseUrl + API_CONFIG.deleteAward.endpoint
      + '/' + awID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addWebp(data): Observable<any> {

    const method = API_CONFIG.addWebp.method;
    const url = PREFIX_URL + API_CONFIG.addWebp.baseUrl + API_CONFIG.addWebp.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateWebp(data): Observable<any> {

    const method = API_CONFIG.updateWebp.method;
    const url = PREFIX_URL + API_CONFIG.updateWebp.baseUrl + API_CONFIG.updateWebp.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getWebp(memberID): Observable<any> {

    const method = API_CONFIG.getWebp.method;
    const url = PREFIX_URL + API_CONFIG.getWebp.baseUrl + API_CONFIG.getWebp.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public deleteWebp(webpID): Observable<any> {

    const method = API_CONFIG.deleteWebp.method;
    const url = PREFIX_URL + API_CONFIG.deleteWebp.baseUrl + API_CONFIG.deleteWebp.endpoint
      + '/' + webpID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addLanguage(data): Observable<any> {

    const method = API_CONFIG.addLanguage.method;
    const url = PREFIX_URL + API_CONFIG.addLanguage.baseUrl + API_CONFIG.addLanguage.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateLanguage(data): Observable<any> {

    const method = API_CONFIG.updateLanguage.method;
    const url = PREFIX_URL + API_CONFIG.updateLanguage.baseUrl + API_CONFIG.updateLanguage.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getLanguage(memberID): Observable<any> {

    const method = API_CONFIG.getLanguage.method;
    const url = PREFIX_URL + API_CONFIG.getLanguage.baseUrl + API_CONFIG.getLanguage.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public deleteLanguage(langID): Observable<any> {

    const method = API_CONFIG.deleteLanguage.method;
    const url = PREFIX_URL + API_CONFIG.deleteLanguage.baseUrl + API_CONFIG.deleteLanguage.endpoint
      + '/' + langID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addPortfolio(data): Observable<any> {

    const method = API_CONFIG.addPortfolio.method;
    const url = PREFIX_URL + API_CONFIG.addPortfolio.baseUrl + API_CONFIG.addPortfolio.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updatePortfolio(data): Observable<any> {

    const method = API_CONFIG.updatePortfolio.method;
    const url = PREFIX_URL + API_CONFIG.updatePortfolio.baseUrl + API_CONFIG.updatePortfolio.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getPortfolio(memberID): Observable<any> {

    const method = API_CONFIG.getPortfolio.method;
    const url = PREFIX_URL + API_CONFIG.getPortfolio.baseUrl + API_CONFIG.getPortfolio.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public deletePortfolio(mediaID): Observable<any> {

    const method = API_CONFIG.deletePortfolio.method;
    const url = PREFIX_URL + API_CONFIG.deletePortfolio.baseUrl + API_CONFIG.deletePortfolio.endpoint
      + '/' + mediaID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getProfileAvatar(memberID): Observable<any> {

    const method = API_CONFIG.getProfileAvatar.method;
    const url = PREFIX_URL + API_CONFIG.getProfileAvatar.baseUrl + API_CONFIG.getProfileAvatar.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateProfileAvatar(data): Observable<any> {

    const method = API_CONFIG.updateProfileAvatar.method;
    const url = PREFIX_URL + API_CONFIG.updateProfileAvatar.baseUrl + API_CONFIG.updateProfileAvatar.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getProfileBackground(memberID): Observable<any> {

    const method = API_CONFIG.getProfileBackground.method;
    const url = PREFIX_URL + API_CONFIG.getProfileBackground.baseUrl + API_CONFIG.getProfileBackground.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public updateProfileBackground(data): Observable<any> {

    const method = API_CONFIG.updateProfileBackground.method;
    const url = PREFIX_URL + API_CONFIG.updateProfileBackground.baseUrl + API_CONFIG.updateProfileBackground.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }


  public getMyFriends(memberID): Observable<any> {

    const method = API_CONFIG.getMyFriends.method;
    const url = PREFIX_URL + API_CONFIG.getMyFriends.baseUrl + API_CONFIG.getMyFriends.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getPeopleYouMayKnow(memberID): Observable<any> {

    const method = API_CONFIG.getPeopleYouMayKnow.method;
    const url = PREFIX_URL + API_CONFIG.getPeopleYouMayKnow.baseUrl + API_CONFIG.getPeopleYouMayKnow.endpoint
      + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }


  public addMessage(data: any): Observable<any> {

    const method = API_CONFIG.addMessage.method;
    const url = PREFIX_URL + API_CONFIG.addMessage.baseUrl + API_CONFIG.addMessage.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addLink(data: any): Observable<any> {

    const method = API_CONFIG.addLink.method;
    const url = PREFIX_URL + API_CONFIG.addLink.baseUrl + API_CONFIG.addLink.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addImage(data: any): Observable<any> {

    const method = API_CONFIG.addImage.method;
    const url = PREFIX_URL + API_CONFIG.addImage.baseUrl + API_CONFIG.addImage.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addVideo(data: any): Observable<any> {

    const method = API_CONFIG.addVideo.method;
    const url = PREFIX_URL + API_CONFIG.addVideo.baseUrl + API_CONFIG.addVideo.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addArticle(data: any): Observable<any> {

    const method = API_CONFIG.addArticle.method;
    const url = PREFIX_URL + API_CONFIG.addArticle.baseUrl + API_CONFIG.addArticle.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getFeedsByFriends(memberID): Observable<any> {

    const method = API_CONFIG.getFeedsByFriends.method;
    const url = PREFIX_URL + API_CONFIG.getFeedsByFriends.baseUrl + API_CONFIG.getFeedsByFriends.endpoint + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getFeeds(memberID): Observable<any> {

    const method = API_CONFIG.getFeeds.method;
    const url = PREFIX_URL + API_CONFIG.getFeeds.baseUrl + API_CONFIG.getFeeds.endpoint + '/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public getComments(postID): Observable<any> {

    const method = API_CONFIG.getComments.method;
    const url = PREFIX_URL + API_CONFIG.getComments.baseUrl + API_CONFIG.getComments.endpoint + '/' + postID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }



  public getReplies(postID): Observable<any> {

    const method = API_CONFIG.getReplies.method;
    const url = PREFIX_URL + API_CONFIG.getReplies.baseUrl + API_CONFIG.getReplies.endpoint + '/' + postID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }


  public getPosts(memberID, offset): Observable<any> {

    const method = API_CONFIG.getPost.method;
    const url = PREFIX_URL + API_CONFIG.getPost.baseUrl + API_CONFIG.getPost.endpoint +
      '/' + memberID + '?offset=' + offset + '&limit=3&sort=postID,desc';
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }
  public addComment(data): Observable<any> {

    const method = API_CONFIG.addComment.method;
    const url = PREFIX_URL + API_CONFIG.addComment.baseUrl + API_CONFIG.addComment.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }
  public addLike(data): Observable<any> {
    const method = API_CONFIG.addLike.method;
    const url = PREFIX_URL + API_CONFIG.addLike.baseUrl + API_CONFIG.addLike.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }
  public unlike(postID, memberID): Observable<any> {
    const method = API_CONFIG.unlike.method;
    const url = PREFIX_URL + API_CONFIG.unlike.baseUrl + API_CONFIG.unlike.endpoint + '/' + postID + '/memberID/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public addCommentLike(data): Observable<any> {
    const method = API_CONFIG.addCommentLike.method;
    const url = PREFIX_URL + API_CONFIG.addCommentLike.baseUrl + API_CONFIG.addCommentLike.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public unlikeComment(commentID, memberID): Observable<any> {
    const method = API_CONFIG.unlikeComment.method;
    const url = PREFIX_URL + API_CONFIG.unlikeComment.baseUrl +
      API_CONFIG.unlikeComment.endpoint + '/' + commentID + '/memberID/' + memberID;
    return this.composeRequest(method, url, {})
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  public sharePost(data): Observable<any> {
    const method = API_CONFIG.sharePost.method;
    const url = PREFIX_URL + API_CONFIG.sharePost.baseUrl + API_CONFIG.sharePost.endpoint;
    return this.composeRequest(method, url, data)
      .map(response => {
        return response.body;
      }).catch(error => {
        return this.handleError(error);
      });
  }





}
