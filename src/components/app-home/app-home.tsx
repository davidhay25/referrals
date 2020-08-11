import { Component, h } from '@stencil/core';
import { Referral } from "../../classes/referral"

import { ReferralsService} from "../../services/referrals-svc"

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  private referrals: Referral[];
  private navCtrl: HTMLIonRouterElement;

  componentDidLoad(){
    this.navCtrl = document.querySelector("ion-router")
  }

  constructor() {
    this.loadData()
  }

  async loadData() {
    this.referrals = await ReferralsService.load()
    console.log(this.referrals)
  
  }

  detail(referral) {
    console.log(referral)
    this.navCtrl.push("/detail/" + referral.id,"forward")
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
         


          <ion-grid>
          <ion-row>
            <ion-col size="auto">
            <ion-title>Referrals Manager</ion-title>
            </ion-col>
            <ion-col>
            <ion-select value="card">
            <ion-select-option value="card">Cardiology</ion-select-option>
            <ion-select-option value="ortho">Orthopaedics</ion-select-option>
          </ion-select>
              </ion-col>
          </ion-row>
        </ion-grid>
          


          
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">

        <ion-grid>
          <ion-row>
            <ion-col size="auto">
              Service 
            </ion-col>
            <ion-col>
            <ion-select value="card">
            <ion-select-option value="card">Cardiology</ion-select-option>
            <ion-select-option value="ortho">Orthopaedics</ion-select-option>
          </ion-select>
              </ion-col>
          </ion-row>
        </ion-grid>
          
          


          <ion-list>
          {this.referrals.map((referral) =>
            <ion-item onClick={() => this.detail(referral)}>
              <ion-label>{referral.display}</ion-label>
            </ion-item>

          )}
          </ion-list>

        <ion-button href="/profile/ionic" expand="block">
          Profile page
        </ion-button>


      </ion-content>,
    ];
  }
}
