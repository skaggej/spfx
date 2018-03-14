import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NasaApolloMissionViewerWebPart.module.scss';
import * as strings from 'NasaApolloMissionViewerWebPartStrings';

export interface INasaApolloMissionViewerWebPartProps {
  description: string;
  selectedMission: string;
}

import { IMission } from '../../models';
import { MissionService } from '../../services';
import { IPropertyPaneTextFieldProps } from '@microsoft/sp-webpart-base';


export default class NasaApolloMissionViewerWebPart extends BaseClientSideWebPart<INasaApolloMissionViewerWebPartProps> {

  private selectedMission: IMission;

  private missionDetailElement: HTMLElement;

  protected onInit(): Promise<void>{
    return new Promise<void>(
      (
        resolve: () => void,
        reject: (error: any) => void
      ): void => {
        this.selectedMission = this._getSelectedMission();
        resolve();
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.nasaApolloMissionViewer }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Apollo Mission Viewer</span>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <div id="apolloMissionDetails"></div>
            </div>
          </div>
        </div>
      </div>`;

      this.missionDetailElement = document.getElementById('apolloMissionDetails');

      if(this.selectedMission){
        this._renderMissionDetails(this.missionDetailElement, this.selectedMission);
      } else {
        this.missionDetailElement.innerHTML = '';
      }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('selectedMission', <IPropertyPaneTextFieldProps> {
                  label: "Apollo Mission to Show"
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getSelectedMission(): IMission {
    const selectedMissionId: string = (this.properties.selectedMission)
    ? this.properties.selectedMission
    : 'AS-506';
    return MissionService.getMission(selectedMissionId);
  }

  private _renderMissionDetails(element: HTMLElement, mission: IMission): void {
    element.innerHTML = `
      <p class="ms-font-m">
        <span class="ms-fontWeight-semibold">Mission: </span>
        ${escape(mission.name)}
      </p>
      <p class="ms-font-m">
        <span class="ms-fontWeight-semibold">Duration: </span>
        ${escape(this._getMissionTimeline(mission))}
      </p>
      <a href="${mission.wiki_href}" target="_blank" class="${styles.button}">
        <span class="${styles.label}">Learn more about ${escape(mission.name)} on Wikipedia >></span>
      </a>
    `;
  }

  private _getMissionTimeline(mission: IMission): string {
    let missionDate = mission.end_date !== ''
    ? `${mission.launch_date.toString()} - ${mission.end_date.toString()}`
    : `${mission.launch_date.toString()}`;
    return missionDate;
  }
}
