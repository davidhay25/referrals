import { Component, h, State } from '@stencil/core';
import { Referral } from "../../classes/referral"

import { ReferralsService} from "../../services/referrals-svc"

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  //need an initial array to avoid errors in template
  @State() referrals: Referral[] = [new Referral("0","Waiting...")]
  private navCtrl: HTMLIonRouterElement;


  componentWillLoad() {
    this.loadData()
  }

  componentDidLoad(){
    this.navCtrl = document.querySelector("ion-router")
 
  }

  constructor() {
  
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
          <ion-list>
          {this.referrals.map((referral) =>
            <ion-item onClick={() => this.detail(referral)}>
             
             <ion-label>
               <h2>{referral.patient.name}</h2>
               <h3>{referral.display}</h3>
             </ion-label>
   
            </ion-item>

          )}
          </ion-list>
      </ion-content>,
    ];
  }
}
