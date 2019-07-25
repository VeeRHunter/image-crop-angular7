import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { TestRxjs6Component } from './test-rxjs6/test-rxjs6.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { ImageCroppingComponent } from './image-cropping/image-cropping.component';



import { AuthGuardService } from './app-services/auth-guard.service';

const routes: Routes = [
  { path: '', component: StarterHomeComponent },
  { path: 'buzz', component: BuzzComponent },
  { path: 'signup', component: StarterSignupComponent },
  { path: 'login', component: StarterLoginComponent },
  { path: 'interest', component: StarterInterestComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'messaging', component: MessagingComponent },
  { path: 'image-cropping', component: ImageCroppingComponent },
  { path: 'test-rxjs', component: TestRxjs6Component },
  { path: 'logout', component: StarterLogoutComponent },
  {
    path: 'profile', component: ProfileComponent,
    children: [
      { path: 'dashboard', component: ProfileDashboardComponent },
      { path: 'experience', component: ProfileExperienceComponent },
      { path: 'education', component: ProfileEducationComponent },
      { path: 'skills', component: ProfileSkillComponent, canActivate: [AuthGuardService] },
      { path: 'portfolio', component: ProfilePortfolioComponent, canActivate: [AuthGuardService] },
      { path: 'certification', component: ProfileCertificationComponent, canActivate: [AuthGuardService] },
      { path: 'project', component: ProfileProjectComponent, canActivate: [AuthGuardService] },
      { path: 'award', component: ProfileAwardComponent, canActivate: [AuthGuardService] },
      { path: 'publication', component: ProfilePublicationComponent, canActivate: [AuthGuardService] },
      { path: 'web-profile', component: ProfileWebProfileComponent, canActivate: [AuthGuardService] },
      { path: 'language', component: ProfileWebLanguageComponent, canActivate: [AuthGuardService] },
      { path: 'image', component: ProfileImageComponent, canActivate: [AuthGuardService] }
    ]
  },

  { path: 'pp/:name', component: PublicProfileComponent },
  {
    path: 'company', component: CompanyComponent,
    children: [
      {
        path: 'admin', component: CompanyAdminComponent,
        children: [
          { path: 'home/:memberID', component: CompanyAdminHomeComponent },
          { path: 'updates/:memberID', component: CompanyAdminUpdateComponent },
          { path: 'careers/:memberID', component: CompanyCareersComponent }
        ]
      },
      { path: 'public', component: CompanyPublicComponent }
    ]
  },
  {
    path: 'companies', component: CompaniesComponent,
    children: [
      { path: 'my-companies', component: CompanyMineComponent },
      { path: 'companies-i-follow', component: CompanyFollowingComponent }
    ]
  },
  { path: 'email-verification', component: StarterEmailConfirmationComponent, canActivate: [AuthGuardService] },
  { path: 'email-verification/:option', component: StarterEmailConfirmationComponent, canActivate: [AuthGuardService] },
  { path: 'email-verification/:option/:id/:mail', component: StarterEmailConfirmationComponent },
  { path: 'forgot-pass', component: StarterForgotPasswordComponent },
  { path: 'signup-steps', component: StarterSignupStepsComponent, canActivate: [AuthGuardService] }
];
/**
const routes: Routes = [
  {path: '', component: StarterHomeComponent},
      {path: 'buzz', component: BuzzComponent, canActivate: [AuthGuardService]},
      {path: 'signup', component: StarterSignupComponent},
      {path: 'login', component: StarterLoginComponent},
      {path: 'interest', component: StarterInterestComponent},
      {path: 'articles', component: ArticlesComponent},
      {path: 'messaging', component: MessagingComponent},
      {path: 'image-cropping', component: ImageCroppingComponent},
      {path: 'test-rxjs', component: TestRxjs6Component},
      {path: 'logout', component: StarterLogoutComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService],
        children: [
          {path: 'dashboard', component: ProfileDashboardComponent, canActivate: [AuthGuardService]},
          {path: 'experience', component: ProfileExperienceComponent, canActivate: [AuthGuardService]},
          {path: 'education', component: ProfileEducationComponent, canActivate: [AuthGuardService]},
          {path: 'skills', component: ProfileSkillComponent, canActivate: [AuthGuardService]},
          {path: 'portfolio', component: ProfilePortfolioComponent, canActivate: [AuthGuardService]},
          {path: 'certification', component: ProfileCertificationComponent, canActivate: [AuthGuardService]},
          {path: 'project', component: ProfileProjectComponent, canActivate: [AuthGuardService]},
          {path: 'award', component: ProfileAwardComponent, canActivate: [AuthGuardService]},
          {path: 'publication', component: ProfilePublicationComponent, canActivate: [AuthGuardService]},
          {path: 'web-profile', component: ProfileWebProfileComponent, canActivate: [AuthGuardService]},
          {path: 'language', component: ProfileWebLanguageComponent, canActivate: [AuthGuardService]},
          {path: 'image', component: ProfileImageComponent, canActivate: [AuthGuardService]}
      ]},

      {path:'pp/:name', component:PublicProfileComponent},
      {path:'company', component:CompanyComponent,
      children:[
        {path:'admin', component:CompanyAdminComponent,
        children:[
          {path:'home/:memberID', component:CompanyAdminHomeComponent},
          {path:'updates/:memberID', component:CompanyAdminUpdateComponent},
          {path:'careers/:memberID', component:CompanyCareersComponent}
        ]},
        {path:'public', component:CompanyPublicComponent}
      ]},
      {path: 'companies', component: CompaniesComponent,
      children:[
        {path: 'my-companies', component: CompanyMineComponent},
        {path: 'companies-i-follow', component: CompanyFollowingComponent}
      ]},
      {path: 'email-verification', component: StarterEmailConfirmationComponent, canActivate: [AuthGuardService]},
      {path: 'email-verification/:option', component: StarterEmailConfirmationComponent, canActivate: [AuthGuardService]},
      {path: 'email-verification/:option/:id/:mail', component: StarterEmailConfirmationComponent},
      {path: 'forgot-pass', component: StarterForgotPasswordComponent},
      {path: 'signup-steps', component: StarterSignupStepsComponent, canActivate: [AuthGuardService] }
];
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
