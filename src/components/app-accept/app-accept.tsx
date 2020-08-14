import { Component, Prop, h } from '@stencil/core';

import { ReferralsService} from "../../services/referrals-svc"


@Component({
  tag: 'app-accept',
  styleUrl: 'app-accept.css',
})
export class AppAccept {
    @Prop() id: string;
    private priority : string = "routine";
    private navCtrl: HTMLIonRouterElement;

    componentDidLoad(){
      this.navCtrl = document.querySelector("ion-router")
    }

    private confirm() {
      this.updateTask()
    }

    async updateTask() {
      let outcome = await ReferralsService.accept(this.id,this.priority);
      console.log('done',outcome);

      if (outcome.ok) {
        //success
        this.navCtrl.push("/","forward")
      } else {

      }
      
    }
 
    private setPriority(ev) {
      this.priority = ev.target.value
    }

    render() {
        return [
          <ion-header>
            <ion-toolbar color="primary">
              <ion-buttons slot="start">
                <ion-back-button defaultHref="/" />
              </ion-buttons>

            <ion-title>Accept {this.id}</ion-title>
    
            </ion-toolbar>
          </ion-header>,
    
          <ion-content class="ion-padding">
              <p></p>


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
            

            <ion-button color="success" onClick={() => this.confirm()}>Confirm</ion-button>


          </ion-content>,
        ];
      }

}