import { Component, h } from '@stencil/core';
import {AuthService} from '../../services/auth'

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  componentWillLoad() { 
    AuthService.init();
  }

  render() {
    return (
      <ion-app>

        <ion-router useHash={false}>

          <ion-route component="app-tabs">

            <ion-route url="/" component="tab-home">
              <ion-route component="app-home" />
              <ion-route url="/detail/:id" component="app-detail" />
              <ion-route url="/accept/:id" component="app-accept" />
            </ion-route>

            <ion-route url="/config" component="tab-config">
              <ion-route component="app-config" />
            </ion-route>

          </ion-route>
          
        </ion-router>
        <ion-nav /> 
      </ion-app>
    );
  }
}
