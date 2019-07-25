import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormWizardModule } from './modules/form-wizard/form-wizard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPopoverImageModule } from 'ngx-popover-image';
import { PopoverModule } from 'ngx-popover';
import { AutosizeModule } from 'ngx-autosize';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ClickOutsideModule } from 'ng-click-outside';
// import { NgxStickyModule } from 'ng6-sticky';
import { NgxLoadingModule } from 'ngx-loading';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ContentLoaderModule } from '@netbasal/content-loader';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { StarterHomeComponent } from './starter-home/starter-home.component';
import { StarterSignupStepsComponent } from './starter-signup-steps/starter-signup-steps.component';
import { StarterEmailConfirmationComponent } from './starter-email-confirmation/starter-email-confirmation.component';
import { StarterInterestComponent } from './starter-interest/starter-interest.component';
import { StarterBuzzComponent } from './starter-buzz/starter-buzz.component';
import { StarterForgotPasswordComponent } from './starter-forgot-password/starter-forgot-password.component';
import { StarterLogoutComponent } from './starter-logout/starter-logout.component';
import { StarterSignupComponent } from './starter-signup/starter-signup.component';
import { StarterLoginComponent } from './starter-login/starter-login.component';
import { BuzzComponent } from './buzz/buzz.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileExperienceComponent } from './profile-experience/profile-experience.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileSkillComponent } from './profile-skill/profile-skill.component';
import { ProfileCertificationComponent } from './profile-certification/profile-certification.component';
import { ProfileProjectComponent } from './profile-project/profile-project.component';
import { ProfileAwardComponent } from './profile-award/profile-award.component';
import { ProfilePublicationComponent } from './profile-publication/profile-publication.component';
import { ProfileWebProfileComponent } from './profile-web-profile/profile-web-profile.component';
import { ProfileWebLanguageComponent } from './profile-web-language/profile-web-language.component';
import { ProfilePortfolioComponent } from './profile-portfolio/profile-portfolio.component';
import { ThoughtComponent } from './thought/thought.component';
import { EmbedlyComponent } from './embedly/embedly.component';
import { VideoPostComponent } from './video-post/video-post.component';
import { PhotoPostComponent } from './photo-post/photo-post.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { CompanyAdminComponent } from './company-admin/company-admin.component';
import { CompanyAdminHomeComponent } from './company-admin-home/company-admin-home.component';
import { CompanyAdminUpdateComponent } from './company-admin-update/company-admin-update.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompanyPublicComponent } from './company-public/company-public.component';
// import { AgmCoreModule } from '@agm/core';
import { CompanyCareersComponent } from './company-careers/company-careers.component';
import { LikeComponent } from './like/like.component';
import { CompanyMineComponent } from './company-mine/company-mine.component';
import { CompanyFollowingComponent } from './company-following/company-following.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { MessagingComponent } from './messaging/messaging.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ArticlesComponent } from './articles/articles.component';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { BlockUIModule } from 'ng-block-ui';

import { NgxGaugeModule } from 'ngx-gauge';

import { Slim } from './thirdparty-services/slim-image/slim.angular2';
import { RelativeTimePipe } from './app-services/relative-time.pipe';
import { CapitalizePipe } from './app-services/capitalize.pipe';
// import { AnimationComponent } from './animation/animation.component';

import { GeolocationService } from './thirdparty-services/geolocation.service';
import { IndustryService } from './thirdparty-services/industry.service';
import { CountryService } from './thirdparty-services/country.service';
import { ApiService } from './app-services/api.service';
import { StorageService } from './app-services/storage.service';
import { CipherService } from './app-services/cipher.service';
import { AuthService } from './app-services/auth.service';
import { AuthGuardService } from './app-services/auth-guard.service';
import { EmailService } from './app-services/email.service';
import { ProfileService } from './app-services/profile.service';
import { ImageUploadService } from './app-services/image-upload.service';
import { LonLatService } from './app-services/lon-lat.service';
import { TestRxjs6Component } from './test-rxjs6/test-rxjs6.component';



import { SharedPopupComponent } from './shared-popup/shared-popup.component';
import { ModalModule, BsModalService } from '../../node_modules/ngx-bootstrap/modal';
import { DataservicesService } from './app-services/dataservices.service';
import { ScrollEventModule } from 'ngx-scroll-event';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { ImageCroppingComponent } from './image-cropping/image-cropping.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StarterHomeComponent,
    StarterSignupStepsComponent,
    StarterEmailConfirmationComponent,
    StarterInterestComponent,
    StarterBuzzComponent,
    StarterForgotPasswordComponent,
    StarterLogoutComponent,
    StarterSignupComponent,
    StarterLoginComponent,
    BuzzComponent,
    ProfileComponent,
    ProfileExperienceComponent,
    ProfileEducationComponent,
    ProfileSkillComponent,
    ProfileCertificationComponent,
    ProfileProjectComponent,
    ProfileAwardComponent,
    ProfilePublicationComponent,
    ProfileWebProfileComponent,
    ProfileWebLanguageComponent,
    ProfilePortfolioComponent,
    RelativeTimePipe,
    CapitalizePipe,
    ProfileImageComponent,
    Slim,
    ArticlesComponent,
    ThoughtComponent,
    EmbedlyComponent,
    VideoPostComponent,
    PhotoPostComponent,
    CompaniesComponent,
    CompanyComponent,
    CompanyAdminComponent,
    CompanyAdminHomeComponent,
    CompanyAdminUpdateComponent,
    CompanyCreateComponent,
    CompanyPublicComponent,
    CompanyCareersComponent,
    LikeComponent,
    CompanyMineComponent,
    CompanyFollowingComponent,
    ProfileDashboardComponent,
    MessagingComponent,
    SharedPopupComponent,
    TestRxjs6Component,
    PublicProfileComponent,
    ImageCroppingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormWizardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxGaugeModule,
    NgxSpinnerModule,
    NgxPopoverImageModule,
    AutosizeModule,
    NgSelectModule,
    NgSelectModule,
    FilterPipeModule,
    ClickOutsideModule,
    // NgxStickyModule,
    ImageCropperModule,
    PopoverModule,
    ContentLoaderModule,
    NgxLoadingModule.forRoot({}),
    ModalModule.forRoot(),
    ScrollEventModule,
    DeviceDetectorModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyD8zG5kUSEGMA3lHV0yd_C7ulvwGNLILiU' }),
    AppRoutingModule,
    BlockUIModule.forRoot()
  ],
  providers: [
    GeolocationService,
    IndustryService,
    CountryService,
    ApiService,
    StorageService,
    CipherService,
    AuthService,
    AuthGuardService,
    EmailService,
    ProfileService,
    ImageUploadService,
    LonLatService,
    BsModalService,
    DataservicesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SharedPopupComponent,
  ]
})
export class AppModule { }
