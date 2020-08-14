import { Component, Prop, State, h } from '@stencil/core';

import { ReferralsService} from "../../services/referrals-svc"
import { Referral } from '../../classes/referral';


@Component({
  tag: 'app-detail',
  styleUrl: 'app-detail.css',
})

export class AppDetail {
  @State() referral : Referral;
  @Prop() id: string;

  //need to load referral before page displays
  componentWillLoad(){
    console.log(this.id)
    this.referral = ReferralsService.getReferral(this.id);  //can be sync
    console.log(this.referral)
  }

  private navCtrl: HTMLIonRouterElement;

  componentDidLoad(){
    this.navCtrl = document.querySelector("ion-router")
 
  }

  reject() {
    console.log('reject')

  }

  accept() {
    this.navCtrl.push("/accept/" + this.id,"forward")
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
      <ion-content class="ion-padding">
        <p>
         Details page.
            {this.referral.display}
        </p>
      </ion-content>,
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
