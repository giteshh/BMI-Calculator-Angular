import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  name = "";
  height = 0;
  weight = 0;
  BMI = 0;
  imperialBMI = 0;
  finalHeight = 0;    // converts height in meters
  heightInFt: number | null = 0;
  heightInInchh = 0;
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
  showImperialForm = false;
  convertHeight: number | undefined;

  constructor() {
  }

  // form init and validation
  bmiForm = new FormGroup({
    name: new FormControl('Gitesh', Validators.required),
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required)
  });
  feet: number | undefined;
  inch: number | undefined;

  toggleMetricForm() {
    this.showImperialForm = false;
  }

  toggleImperialForm() {
    this.showImperialForm = true;
  }

  computeBMI() {
    if (!this.showImperialForm) {
      // converting input height from cm to m
      this.finalHeight = this.bmiForm.value.height / 100;

      //  formula for calculating BMI (with kg and m)
      this.BMI = this.bmiForm.value.weight / Math.pow(this.finalHeight, 2);

    } else {
      // this.finalHeight = this.bmiForm.value.heightInFeet * 12 + this.bmiForm.value.heightInInch;
      this.BMI = (this.bmiForm.value.weight / Math.pow(this.bmiForm.value.height, 2)) * 703;

    }
    // call to show result of BMI categories
    this.showBmiCategories();
  }

  suggestNormalWeight(): void {

    if (!this.showImperialForm) {
      this.minNormalWeight = Math.round(18.5 * Math.pow(this.finalHeight, 2));
      this.maxNormalWeight = Math.round(24.9 * Math.pow(this.finalHeight, 2));
      if (this.BMI < 18.5) {
        this.differenceInMinWeight = Math.round(this.minNormalWeight - this.bmiForm.value.weight);

        this.differenceInMaxWeight = Math.round(this.maxNormalWeight - this.bmiForm.value.weight);

        this.normalWeight = "Try to gain weight by " + this.differenceInMinWeight + " Kg"
          + "  to " + this.differenceInMaxWeight + " Kg.";
      } else if (this.BMI > 24.9) {
        this.differenceInMinWeight = Math.round(this.bmiForm.value.weight - this.minNormalWeight);

        this.differenceInMaxWeight = Math.round(this.bmiForm.value.weight - this.maxNormalWeight);

        this.normalWeight = "Try to lose your weight by " + this.differenceInMaxWeight + " Kg"
          + "  to " + this.differenceInMinWeight + " Kg.";
      } else {
        this.differenceInMinWeight = Math.round(this.bmiForm.value.weight - this.minNormalWeight);

        this.differenceInMaxWeight = Math.round(this.bmiForm.value.weight - this.maxNormalWeight);

        this.normalWeight = "Try to maintain your weight between " + this.minNormalWeight + " Kg"
          + "  to " + this.maxNormalWeight + " Kg.";
      }
    } else {
      this.minNormalWeight = Math.round(18.5 * Math.pow(this.bmiForm.value.height, 2) / 703);
      this.maxNormalWeight = Math.round(24.9 * Math.pow(this.bmiForm.value.height, 2) / 703);
      if (this.BMI < 18.5) {
        this.differenceInMinWeight = Math.round(this.minNormalWeight - this.bmiForm.value.weight);

        this.differenceInMaxWeight = Math.round(this.maxNormalWeight - this.bmiForm.value.weight);

        this.normalWeight = "Try to gain weight by " + this.differenceInMinWeight + " lbs"
          + "  to " + this.differenceInMaxWeight + " lbs.";
      } else if (this.BMI > 24.9) {
        this.differenceInMinWeight = Math.round(this.bmiForm.value.weight - this.minNormalWeight);

        this.differenceInMaxWeight = Math.round(this.bmiForm.value.weight - this.maxNormalWeight);

        this.normalWeight = "Try to lose your weight by " + this.differenceInMaxWeight + " lbs"
          + "  to " + this.differenceInMinWeight + " lbs.";
      } else {
        this.differenceInMinWeight = Math.round(this.bmiForm.value.weight - this.minNormalWeight);

        this.differenceInMaxWeight = Math.round(this.bmiForm.value.weight - this.maxNormalWeight);

        this.normalWeight = "Try to maintain your weight between " + this.minNormalWeight + " lbs"
          + "  to " + this.maxNormalWeight + " lbs.";
      }
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
    if (!this.showImperialForm) {
      if (this.BMI >= 18.5 && this.BMI <= 24.9) {
        this.weightSuggestion = "For Healthy BMI maintain your weight between " +
          this.minNormalWeight + " Kg to " + this.maxNormalWeight + " Kg " +
          " for " + this.bmiForm.value.height + " cm height."
      } else {
        this.weightSuggestion = "For Healthy BMI your weight should be between " +
          this.minNormalWeight + " Kg to " + this.maxNormalWeight + " Kg " +
          " for " + this.bmiForm.value.height + " cm height."
      }
    } else {
      if (this.BMI >= 18.5 && this.BMI <= 24.9) {
        this.weightSuggestion = "For Healthy BMI maintain your weight between " +
          this.minNormalWeight + " lbs to " + this.maxNormalWeight + " lbs " +
          " for " + this.bmiForm.value.height + " inch height."
      } else {
        this.weightSuggestion = "For Healthy BMI your weight should be between " +
          this.minNormalWeight + " lbs to " + this.maxNormalWeight + " lbs " +
          " for " + this.bmiForm.value.height + " inch height."
      }
    }
  }

  // we can also use click event on the button x (close)
  resetForm(): void {
    this.bmiForm.reset();
  }
}
