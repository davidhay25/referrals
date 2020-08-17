import { Component, h, State } from '@stencil/core';
import { Referral, Service } from "../../classes/referral"

import { ReferralsService} from "../../services/referrals-svc"
import { loadingController } from '@ionic/core'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  //need an initial array to avoid errors in template
  @State() referrals: Referral[] = [new Referral("0","Waiting...")]

  @State() selectedReferrral : Referral = null;
  @State() actionState: string = null;
  @State() priority : string = "routine";

  services : Service[];
  selectedService : Service;

  note : string = null;

  loading : HTMLIonLoadingElement = null;

  async createLoadingOverlay() {
    return await loadingController.create({
    message: "Loading referrals...",
    spinner: "crescent" });
  }

  async createSavingOverlay() {
    return await loadingController.create({
    message: "Updating referral...",
    spinner: "crescent" });
  }

  async componentWillLoad() {
    this.loading = await this.createLoadingOverlay(); 
    this.loading.present();
    console.log('loading',this.loading)
  }

  async componentWillRender() {
    //let loading = await this.createLoadingOverlay(); 
   // loading.present();

    this.referrals = await ReferralsService.load()
    this.services = await ReferralsService.getServices()
    
    //console.log(this.loading)
  }

componentDidRender() {
  console.log('home: will render')
  console.log(this.loading)

  if (this.loading !== null) {
    this.loading.dismiss();
  }
}

  async refresh() {
    this.referrals = await ReferralsService.load()
  }

  //will return to the detail display
  cancel() {
    //this.selectedReferrral = null
    this.actionState = null;
    this.note = null;
  }

  //will re-display the list
  return() {
        this.selectedReferrral = null
        this.actionState = null;
        this.note = null;
  }

  private setPriority(ev) {
    this.priority = ev.target.value
  }

  async confirmAction() {

    console.log(this.note)

    let saving = await this.createSavingOverlay(); 
    saving.present();


    switch (this.actionState) {
      case "accept" :
        let outcome = await ReferralsService.accept(this.selectedReferrral,this.priority,this.note);
        saving.dismiss();
        console.log('done',outcome);
        this.selectedReferrral = null
        this.actionState = null
        break;
    }
    this.note = null;
    this.priority = "routine"
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
         
        <ion-title>Referrals Triage</ion-title>

        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">


        <div  hidden = {! this.selectedReferrral}>
          <div class = "ion-padding">
         


            <app-detail referralId={this.selectedReferrral && this.selectedReferrral.id}></app-detail>


            
          </div>
          <hr/>
             
          <section hidden = {this.actionState !== null}>         
              <ion-button color="danger" onClick={() => this.actionState = 'reject'}>Reject</ion-button>
              <ion-button color="warning" onClick={() => this.actionState = 'transfer'}>Transfer</ion-button>
              <ion-button color="success" onClick={() => this.actionState = 'accept'}>Accept</ion-button>
              <ion-button color="primary" onClick={() => this.return()}>Cancel</ion-button>
          </section>

          <section hidden = {this.actionState !== 'reject'}>
            <ion-label>Reject Referral</ion-label>
            <ion-textarea rows={10} value = {this.note} name = "note"
                    onChange = {(ev:any) => this.note = ev.target.value}
                    placeholder="Enter any notes here...">                
                  </ion-textarea>
          </section>

          <section hidden = {this.actionState !== 'transfer'}>
            <ion-label>Transfer Referral</ion-label>

            <ion-radio-group value={this.selectedService} onClick={(ev) => this.setPriority(ev)}>

              {this.services.map((service) =>
              <ion-item>
                <ion-radio onClick={() => this.selectedService = service}>
                
                <ion-label>{service.name}</ion-label>
               </ion-radio>
               </ion-item>
            )}

            </ion-radio-group>


            <ion-textarea rows={10} value = {this.note} name = "note"
                    onChange = {(ev:any) => this.note = ev.target.value}
                    placeholder="Enter any notes here...">                
                  </ion-textarea>
          </section>

          <section hidden = {this.actionState !== 'accept'}>

            

            <ion-grid>
              <ion-row>
                <ion-col>
                <ion-label>Accept Referral</ion-label>

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
                <ion-label>Notes</ion-label>
                  <ion-textarea rows={10} value = {this.note} name = "note"
                    onChange = {(ev:any) => this.note = ev.target.value}
                    placeholder="Enter any notes here...">                
                  </ion-textarea>
                </ion-col>

              </ion-row>
            </ion-grid>

          </section>


          <section hidden = {this.actionState == null}>

            

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
               <h2>{referral.patient.display}</h2>
               <h3>{referral.display}</h3>
             </ion-label>
   
            </ion-item>

          )}

          </ion-list>
      </ion-content>,




    ];
  }
}
