import { Component, h } from "@stencil/core";

@Component({
  tag: "app-tabs",
  styleUrl: "app-tabs.css"
})

export class AppTabs {
  render() {
    return [
      <ion-tabs>
        <ion-tab tab="tab-home">
          <ion-nav />
        </ion-tab>

        <ion-tab tab="tab-config" >
          <ion-nav />
        </ion-tab>

        <ion-tab-bar slot="bottom">

          <ion-tab-button tab="tab-home">
            <ion-icon name="map" />
            <ion-label>Home</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab-config">
            <ion-icon name="information-circle" />
            <ion-label>Config</ion-label>
          </ion-tab-button>

        </ion-tab-bar>

      </ion-tabs>
    ];
  }
}