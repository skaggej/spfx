import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CswpNgCalculatorWebPart.module.scss';
import * as strings from 'CswpNgCalculatorWebPartStrings';
import { ICswpNgCalculatorWebPartProps } from './ICswpNgCalculatorWebPartProps';

import * as angular from 'angular';
require('../../../node_modules/office-ui-fabric/dist/css/fabric.css');
require('../../../node_modules/office-ui-fabric/dist/css/fabric.components.css');
import 'ng-office-ui-fabric';

import './app/app.module';

export default class CswpNgCalculatorWebPartWebPart extends BaseClientSideWebPart<ICswpNgCalculatorWebPartProps> {

  private $injector: angular.auto.IInjectorService;

  public render(): void {
    if(this.renderedOnce === false){
      this.domElement.innerHTML = `<ng-hello-world-wp></ng-hello-world-wp>`;
      this.$injector = angular.bootstrap(this.domElement, ['ngSpfx']);
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
