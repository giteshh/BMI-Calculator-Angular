import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BMI';
  height = 0;
  weight = 0;
  BMI = 0;
  finalHeight = 0;
  result = "";

  bmiForm = new FormGroup({
    weight: new FormControl(''),
    height: new FormControl(''),
  });

  computeBMI(){
    console.log(this.bmiForm.value);
    // converting input height from cm to m
     this.finalHeight = this.bmiForm.value.height / 100;
    //  formula for calculating BMI (with kg and m)
    this.BMI = this.bmiForm.value.weight / (this.finalHeight * this.finalHeight);
    console.log(this.BMI);
    // call to show result of BMI categories
    this.showBmiCategories();
  }
  showBmiCategories(){
    if(this.BMI < 18.5){
      this.result = "Your BMI- Underweight";
    }
    else if(this.BMI >= 18.5 && this.BMI <=24.9){
      this.result = "Your BMI - Normal Weight";
    }
    else if(this.BMI >= 25 && this.BMI <=29.9){
      this.result = "Your BMI - Overweight";
    }
    else{
      this.result = "Your BMI - Obesity";
    }
  }
}
