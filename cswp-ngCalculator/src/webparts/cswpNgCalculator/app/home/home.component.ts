import * as angular from 'angular';

export class HomeComponent {
  public static $inject: string[] = ['$rootScope', '$scope', '$log'];

  public displayName: string;

  constructor(private $rootScope: angular.IRootScopeService, private $scope: angular.IScope, private $log: angular.ILogService) {
    // set displayName
    this.displayName = "Hello World";
  }

} // HomeComponent