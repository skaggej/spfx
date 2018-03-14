import * as angular from 'angular';
import { HomeComponent } from './home';
import { CalculatorComponent } from './calculator';

// modules to import
const modules: string[] = [
  'officeuifabric.core',
  'officeuifabric.components'
];

// create the angular app
const ngSpfxApp: angular.IModule = angular.module('ngSpfx', modules);

// create the home component (directive)
const homeComponent: angular.IComponentOptions = <angular.IComponentOptions>{
  controller: HomeComponent,
  controllerAs: 'vm',
  template: require('./home/home.component.html').toString()
};

// create calc component
const calculatorComponent: angular.IComponentOptions = <angular.IComponentOptions>{
  controller: CalculatorComponent,
  controllerAs: 'vm',
  template: require('./calculator/calculator.component.html').toString()
};

// add the home component to the application
ngSpfxApp
  .component('ngHelloWorldWp', homeComponent)
  .component('calculator', calculatorComponent);
