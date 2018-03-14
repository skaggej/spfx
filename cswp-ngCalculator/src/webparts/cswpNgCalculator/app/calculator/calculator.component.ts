import * as angular from 'angular';

export class CalculatorComponent {
  public static $inject: string[] = ['$rootScope', '$scope', '$log'];

  public operator: string = '+';
  public operandA: number = 10;
  public operandB: number = 2;
  public result: number = this.operandA + this.operandB;
  public errors: string = '';

  constructor(private $rootScope: angular.IRootScopeService, private $scope: angular.IScope, private $log: angular.ILogService) {
    this.calculate();
  } // constructor

  /**
   * If the current model is not valid, return error message. Otherwise return empty string.
   * 
   * @private
   * @returns {string} Error message if the model is not valid.
   * 
   * @memberOf CalculatorController
   */
  private isValid(): string {
    // errors
    const errors: string[] = [];

    if (isNaN(Number(this.operandA))) {
      errors.push('Operand A must be of type integer.');
    }
    if (isNaN(Number(this.operandB))) {
      errors.push('Operand B must be of type integer.');
    }

    // if errors, add them up
    return (errors.length > 0)
      ? errors.join('; ')
      : '';
  }

  /**
   * Calculates the model. 
   * 
   * @returns {number} 
   * 
   * @memberOf CalculatorController
   */
  public calculate(): void {
    this.errors = this.isValid();

    if (this.errors.length === 0) {
      switch (this.operator) {
        case '+':
          this.result = Number(this.operandA) + Number(this.operandB);
          break;
        case '-':
          this.result = Number(this.operandA) - Number(this.operandB);
          break;
        case '*':
          this.result = Number(this.operandA) * Number(this.operandB);
          break;
        case '/':
          this.result = Number(this.operandA) / Number(this.operandB);
          break;
      }
    } else {
      this.result = -1;
    }
  }

} // CalculatorComponent
