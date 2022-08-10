import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //app last updated on & version, go & update on environment.ts
  lastUpdatedOn = environment.lastUpdatedOn;
  version = environment.version;
  //other declarations
  name = "";
  height = 0;
  weight = 0;
  BMI = 0;
  finalHeight = 0;    // converts height in meters
  result = "";
  minNormalWeight = 0;
  maxNormalWeight = 0;
  normalWeight: any;
  differenceInMinWeight = 0;
  differenceInMaxWeight = 0;
  BmiUnitInMetric = "kg/m";
  BmiUnitInImperial = "lbs/in"
  bmiPrefix = "BMI = ";
  weightSuggestion = "";
  // convertHeight: number | undefined;
  //for ng model
  selectedWeight = 'kg';
  selectedHeight = 'cm';

  constructor() {
  }

  // form init and validation
  bmiForm = new UntypedFormGroup({
    weight: new UntypedFormControl('', Validators.required),
    height: new UntypedFormControl('', Validators.required),
    weightType: new UntypedFormControl('', Validators.required),
    heightType: new UntypedFormControl('', Validators.required),
  });

  // toggleMetricForm() {
  //   this.showImperialForm = false;
  // }
  //
  // toggleImperialForm() {
  //   this.showImperialForm = true;
  // }

  computeBMI() {
    // this.onWeightTypeChanged(e);
    if (this.bmiForm.value.weightType == "kg" && this.bmiForm.value.heightType == "cm") {
      // converting input height from cm to m
      this.finalHeight = this.bmiForm.value.height / 100;

      //  formula for calculating BMI (with kg and m)
      this.BMI = this.bmiForm.value.weight / Math.pow(this.finalHeight, 2);
    }
    else if (this.bmiForm.value.weightType == "kg" && this.bmiForm.value.heightType == "inch") {
      // converting input height from inch to m
      this.finalHeight = this.bmiForm.value.height * 0.0254;

      //  formula for calculating BMI (with kg and m)
      this.BMI = this.bmiForm.value.weight / Math.pow(this.finalHeight, 2);
    }
    else if (this.bmiForm.value.weightType == "lbs" && this.bmiForm.value.heightType == "cm") {
      // converting input height from cm to inch
      this.finalHeight = this.bmiForm.value.height / 2.54;

      //  formula for calculating BMI (with lbs and inch)
      this.BMI = (this.bmiForm.value.weight / Math.pow(this.finalHeight, 2)) * 703;
    }
    else if (this.bmiForm.value.weightType == "lbs" && this.bmiForm.value.heightType == "inch") {

      //  formula for calculating BMI (with lbs and inch)
      this.BMI = (this.bmiForm.value.weight / Math.pow(this.bmiForm.value.height, 2)) * 703;
    }

    // call to show result of BMI categories
    this.showBmiCategories();
  }

  // function to suggest weight range for healthy bmi
  suggestNormalWeight(): void {

    this.minNormalWeight = Math.round(18.5 * Math.pow(this.finalHeight, 2));
    this.maxNormalWeight = Math.round(24.9 * Math.pow(this.finalHeight, 2));
    if (this.BMI < 18.5) {
      this.differenceInMinWeight = Math.round(this.minNormalWeight - this.bmiForm.value.weight);

      this.differenceInMaxWeight = Math.round(this.maxNormalWeight - this.bmiForm.value.weight);

      this.normalWeight = "Gain weight by " + this.differenceInMinWeight + " Kg"
        + "  to " + this.differenceInMaxWeight + " Kg.";
    } else if (this.BMI > 24.9) {
      this.differenceInMinWeight = Math.round(this.bmiForm.value.weight - this.minNormalWeight);

      this.differenceInMaxWeight = Math.round(this.bmiForm.value.weight - this.maxNormalWeight);

      this.normalWeight = "Lose your weight by " + this.differenceInMaxWeight + " Kg"
        + "  to " + this.differenceInMinWeight + " Kg.";
    } else {
      this.differenceInMinWeight = Math.round(this.bmiForm.value.weight - this.minNormalWeight);

      this.differenceInMaxWeight = Math.round(this.bmiForm.value.weight - this.maxNormalWeight);

      this.normalWeight = "Maintain your weight between " + this.minNormalWeight + " Kg"
        + "  to " + this.maxNormalWeight + " Kg.";
    }

    this.minNormalWeight = Math.round(18.5 * Math.pow(this.bmiForm.value.height, 2) / 703);
    this.maxNormalWeight = Math.round(24.9 * Math.pow(this.bmiForm.value.height, 2) / 703);
    if (this.BMI < 18.5) {
      this.differenceInMinWeight = Math.round(this.minNormalWeight - this.bmiForm.value.weight);

      this.differenceInMaxWeight = Math.round(this.maxNormalWeight - this.bmiForm.value.weight);

      this.normalWeight = "Gain weight by " + this.differenceInMinWeight + " lbs"
        + "  to " + this.differenceInMaxWeight + " lbs.";
    } else if (this.BMI > 24.9) {
      this.differenceInMinWeight = Math.round(this.bmiForm.value.weight - this.minNormalWeight);

      this.differenceInMaxWeight = Math.round(this.bmiForm.value.weight - this.maxNormalWeight);

      this.normalWeight = "Lose your weight by " + this.differenceInMaxWeight + " lbs"
        + "  to " + this.differenceInMinWeight + " lbs.";
    } else {
      this.differenceInMinWeight = Math.round(this.bmiForm.value.weight - this.minNormalWeight);

      this.differenceInMaxWeight = Math.round(this.bmiForm.value.weight - this.maxNormalWeight);

      this.normalWeight = "Maintain your weight between " + this.minNormalWeight + " lbs"
        + "  to " + this.maxNormalWeight + " lbs.";
    }
  }


  // this will show 4 respective categories
  showBmiCategories(): void {
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
    this.showSuggestions();
  }

  // this shows weight suggestions for achieving healthy bmi
  showSuggestions(): void {

    if (this.BMI >= 18.5 && this.BMI <= 24.9) {
      this.weightSuggestion = "Healthy BMI range- " +
        this.minNormalWeight + " Kg to " + this.maxNormalWeight + " Kg " +
        " for " + this.bmiForm.value.height + " cm height."
    } else {
      this.weightSuggestion = "Healthy BMI range- " +
        this.minNormalWeight + " Kg to " + this.maxNormalWeight + " Kg " +
        " for " + this.bmiForm.value.height + " cm height."
    }

    if (this.BMI >= 18.5 && this.BMI <= 24.9) {
      this.weightSuggestion = "Healthy BMI range- " +
        this.minNormalWeight + " lbs to " + this.maxNormalWeight + " lbs " +
        " for " + this.bmiForm.value.height + " inch height."
    } else {
      this.weightSuggestion = "Healthy BMI range- " +
        this.minNormalWeight + " lbs to " + this.maxNormalWeight + " lbs " +
        " for " + this.bmiForm.value.height + " inch height."
    }
  }

  // we can also use click event on the button x (close)
  resetForm(): void {
    this.bmiForm.reset();
  }

  onWeightTypeChanged(e: any) {
  }

  onHeightTypeChanged(e: any) {
  }
}

function e(e: any) {
  throw new Error('Function not implemented.');
}

