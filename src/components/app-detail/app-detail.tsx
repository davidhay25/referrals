import { Component, Prop, h } from '@stencil/core';
import { ReferralsService} from "../../services/referrals-svc"
import { Referral } from '../../classes/referral';


@Component({
  tag: 'app-detail',
  styleUrl: 'app-detail.css',
})

export class AppDetail {
  referral : Referral;
  @Prop() referralId: string;

/*
  private navCtrl: HTMLIonRouterElement;

  componentDidLoad(){
    this.navCtrl = document.querySelector("ion-router")
 
  }
*/

componentDidLoad(){
  console.log("detaill: did load")

}

  async componentWillRender() {
    console.log("detaill: will render")
    this.referral = ReferralsService.getReferral(this.referralId);  //can be sync
    console.log(this.referral)
  }

  componentDidRender() {
    console.log("detaill: did render")
  
  }

  render() {
    return [
      /*
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Referral details: {this.id}</ion-title>
        </ion-toolbar>
      </ion-header>,
*/

<ion-label>
  {this.referral && this.referral.patient && this.referral.patient.display}  
</ion-label>,

<ion-card>
  <ion-card-title>
  
  </ion-card-title>
  <ion-card-content>
    {this.referral && this.referral.display}
  </ion-card-content>
</ion-card>

,



/*
      <ion-footer>
        <section>
          <header>Action</header>
            <ion-button color="danger" fill="outline" onClick={() => this.reject()}>Reject</ion-button>
            <ion-button color="warning">Transfer</ion-button>
            <ion-button color="success" onClick={() => this.accept()}>Accept</ion-button>
        </section>
      </ion-footer>
      */


    ];
  }
}
