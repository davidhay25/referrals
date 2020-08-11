import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-config',
  styleUrl: 'app-config.css',
})
export class AppConfig {

    render() {
        return [
          <ion-header>
            <ion-toolbar color="primary">
             
            <ion-title>Config</ion-title>
    
            </ion-toolbar>
          </ion-header>,
    
          <ion-content class="ion-padding">
              <p>Config</p>

          </ion-content>,
        ];
      }

}