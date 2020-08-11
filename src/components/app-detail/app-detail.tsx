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

  //private referral : Referral;// = new Referral("3",'test');
  //this.referral = new Referral("3",'test')



  componentWillLoad(){
    console.log(this.id)
    this.referral = ReferralsService.getReferral(this.id);  //can be sync
    console.log(this.referral)
  }


  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Referral details: {this.id}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
         Details page.
            {this.referral.display}
         
         
         
         
        </p>

        <section>
          <header>Action</header>
            <ion-button color="danger">Reject</ion-button>
            <ion-button color="warning">Transfer</ion-button>
            <ion-button color="success">Accept</ion-button>
        </section>
        


 
      </ion-content>,




    ];
  }
}
