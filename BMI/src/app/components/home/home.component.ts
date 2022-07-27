import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() {
  }

  name = "";
  height = 0;
  weight = 0;
  BMI = 0;
  finalHeight = 0;
  result = "";
  minNormalWeight = 0;
  maxNormalWeight = 0;
  normalWeight: any;
  differenceInMinBmi = 0;
  differenceInMaxBmi = 0;
  differenceInMinWeight = 0;
  differenceInMaxWeight = 0;
  BmiUnit = "Kg/m2";
  bmiPrefix = "BMI = ";
  namePrefix = "Hey";
  weightUnit = "Kg";
  weightSuggestion = "";

  // form init and validation
  bmiForm = new FormGroup({
    name: new FormControl('Gitesh', Validators.required),
    weight: new FormControl('50.50', Validators.required),
    height: new FormControl('', Validators.required),
  });

  computeBMI() {
    // converting input height from cm to m
    this.finalHeight = this.bmiForm.value.height / 100;

    //  formula for calculating BMI (with kg and m)
    this.BMI = this.bmiForm.value.weight / (this.finalHeight * this.finalHeight);

    // call to show result of BMI categories
    this.showBmiCategories();
  }

  suggestNormalWeight() : void {
    //  -----Pseudocode-----
    //  if Bmi < 18.5
    //  minNorWt = 18.5 * ht * ht
    //  diffMinWt = minNorWt - wt (input)
    //  maxNorWt = 24.9 * ht * ht
    //  diffMaxWt = minNorWt - wt (input)
     //  if Bmi >24.9
    //  maxNorWt = 24.9 * ht * ht
    //  norWt = maxNorWt - wt (input)

    this.weightSuggestion = "For Healthy BMI your weight should be between";
    if (this.BMI < 18.5) {

      this.minNormalWeight = Math.round(18.5 * (this.finalHeight * this.finalHeight));
      this.differenceInMinWeight = this.minNormalWeight - this.bmiForm.value.weight;

      this.maxNormalWeight = Math.round(24.9 * (this.finalHeight * this.finalHeight));
      this.differenceInMaxWeight = this.maxNormalWeight - this.bmiForm.value.weight;

      this.normalWeight = "Try to gain weight by " + this.differenceInMinWeight + " Kg"
        + "  to " + this.differenceInMaxWeight + " Kg.";
    } else if (this.BMI > 24.9) {
      this.minNormalWeight = Math.round(18.5 * (this.finalHeight * this.finalHeight));
      this.differenceInMinWeight = this.bmiForm.value.weight - this.minNormalWeight;

      this.maxNormalWeight = Math.round(24.9 * (this.finalHeight * this.finalHeight));
      this.differenceInMaxWeight = this.bmiForm.value.weight -  this.maxNormalWeight;

      this.normalWeight = "Try to lose your weight by " + this.differenceInMaxWeight + " Kg"
        + "  to " + this.differenceInMinWeight + " Kg.";
    }
  }

  showBmiCategories(): void {
    // this will show 4 respective categories
    if (this.BMI < 18.5) {
      this.result = "Your BMI is - Underweight.";
    } else if (this.BMI >= 18.50 && this.BMI <= 24.9) {
      this.result = "Your BMI is - Normal Weight.";
    } else if (this.BMI >= 25 && this.BMI <= 29.9) {
      this.result = "Your BMI is - Overweight.";
    } else if (this.BMI > 30) {
      this.result = "Your BMI is - Obesity.";
    }
    // call to reach normal weight
    this.suggestNormalWeight();
  }

}
