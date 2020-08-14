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
  //private navCtrl: HTMLIonRouterElement;

  //@State() hideme: boolean = false;
  @State() selectedReferrral : Referral = null;
  @State() actionState: string = null;
  @State() priority : string;

  //@Event() onToggle: EventEmitter;

/*
  @Watch('referrals')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of referrals is: ', newValue);
  }
*/


  async componentWillRender() {
    this.referrals = await ReferralsService.load()
    console.log('home: will render')
    console.log(this.actionState)

  }

  componentDidLoad(){
    //this.navCtrl = document.querySelector("ion-router")
    console.log('home: did load')
  }

/*
  async loadData() {
    this.referrals = await ReferralsService.load()
    console.log(this.referrals)
  
  }

  */
/*
  // <ion-item onClick={() => this.detail(referral)}>
  detail(referral) {
    console.log(referral)
    this.navCtrl.push("/detail/" + referral.id,"forward")
  }
*/
  cancel() {
    this.selectedReferrral = null
    this.actionState = null
  }

  private setPriority(ev) {
    this.priority = ev.target.value
  }

  async confirmAction() {
    switch (this.actionState) {
      case "accept" :
        let outcome = await ReferralsService.accept(this.selectedReferrral.id,this.priority);
        console.log('done',outcome);
        this.selectedReferrral = null
        this.actionState = null
        break;
    }
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


        <div  hidden = {! this.selectedReferrral}>
          <div class = "ion-padding">
            {this.selectedReferrral && this.selectedReferrral.display}
          </div>
          <hr/>
             
          <section hidden = {this.actionState !== null}>         
              <ion-button color="danger" onClick={() => this.actionState = 'reject'}>Reject</ion-button>
              <ion-button color="warning" onClick={() => this.actionState = 'transfer'}>Transfer</ion-button>
              <ion-button color="success" onClick={() => this.actionState = 'accept'}>Accept</ion-button>
          </section>

          <section hidden = {this.actionState !== 'reject'}>
            <ion-label>Reject Referral</ion-label>
          </section>

          <section hidden = {this.actionState !== 'transfer'}>
            <ion-label>Transfer Referral</ion-label>
          </section>

          <section hidden = {this.actionState !== 'accept'}>

            <ion-label>Accept Referral</ion-label>

            <ion-grid>
              <ion-row>
                <ion-col>

                <ion-radio-group value={this.priority} onClick={(ev) => this.setPriority(ev)}>
                <ion-list-header>
                  <ion-label>Priority</ion-label>
                </ion-list-header>

                <ion-item>
                  <ion-label>Urgent</ion-label>
                  <ion-radio slot="start" color="danger" value="urgent"></ion-radio>
                </ion-item>

                <ion-item>
                  <ion-label>Routine</ion-label>
                  <ion-radio slot="start" color="success" value="routine"></ion-radio>
                </ion-item>

                <ion-item>
                  <ion-label>Stat</ion-label>
                  <ion-radio slot="start" color="tertiary" value="stat"></ion-radio>
                </ion-item>
            </ion-radio-group>

                </ion-col>
                <ion-col>
                <ion-textarea rows={10} placeholder="Enter any notes here..."></ion-textarea>
                </ion-col>

              </ion-row>
            </ion-grid>

          </section>


          <section hidden = {this.actionState == null}>

            <ion-item>
              <ion-label>Notes</ion-label>
              <ion-textarea rows={3} placeholder="Enter any notes here..."></ion-textarea>
            </ion-item>

            <br/>
            <section>         
              <ion-button color="success" onClick={() => this.confirmAction()}>Confirm</ion-button>
              <ion-button color="primary" onClick={() => this.cancel()}>Cancel</ion-button>
          </section>


          </section>


        </div>


          <ion-list hidden = {this.selectedReferrral !== null}>
            {this.referrals.map((referral) =>
              <ion-item onClick={() => this.selectedReferrral = referral}>
              
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
