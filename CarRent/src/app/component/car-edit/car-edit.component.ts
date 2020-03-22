import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/car.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  id:any;
  carDetailsEdit:FormGroup;
  submitted = false;
  selectValue:any;
  fuleType=['Diesel','Petrol','Hibrid'];
  constructor(
    private route: ActivatedRoute,
    private carService:CarService,
    private formBuilder:FormBuilder
    
  ) { }

  

  ngOnInit() {
    this.carDetailsEdit = this.formBuilder.group({
      registeredNumber: ['', Validators.required],
      registerdYear: ['', Validators.required],
      fuleType: [''],
      acNonAc: [''],
      tranmision: [''],
      vehicleBrand: [''],
      comment: [''],
      vehicleModel: ['', Validators.required],
      color: ['', Validators.required],
      modelYear: ['', Validators.required],
      ownerId: [''],
      photo: ['']
    });
    this.displayValueForm()


  }

  displayValueForm() {
    //get accutale route id 
   this.id = (this.route.snapshot.paramMap.get('id'));
   console.log(this.id);
 
    
    this.carService.getById(this.id)
    .subscribe(
      data=>{
      
       this.carDetailsEdit.controls['registeredNumber'].setValue(data[0].registeredNumber);
       this.carDetailsEdit.controls['registerdYear'].setValue(data[0].registerdYear);
       this.carDetailsEdit.controls['vehicleBrand'].setValue(data[0].vehicleBrand);
       this.carDetailsEdit.controls['vehicleModel'].setValue(data[0].vehicleModel.name);
       this.carDetailsEdit.controls['color'].setValue(data[0].vehicleModel.color);
       this.carDetailsEdit.controls['modelYear'].setValue(data[0].vehicleModel.modelYear);
       this.carDetailsEdit.controls['fuleType'].setValue(data[0].fuleType.name);
       this.carDetailsEdit.controls['comment'].setValue(data[0].comment);
       this.selectValue =  this.carDetailsEdit.controls['fuleType'].setValue(data[0].fuleType.name);
      },
      error=>{
        console.group(error);
      },
      ()=>{
        console.log('Complete');
      }
    );
  }

  




  get controlerData() {
    return this.carDetailsEdit.controls;
  }
  
  
  
      uploadSubmit() {
        this.submitted = true;
    
        if (this.carDetailsEdit.valid) {
          let carData = {
            "id": this.id,
            "registeredNumber": this.controlerData.registeredNumber.value,
            "registerdYear": this.controlerData.registerdYear.value,
            "fuleType": this.controlerData.fuleType.value,
            "acOrNonAc": this.controlerData.acNonAc.value,
            "transmission": this.controlerData.tranmision.value,
            "vehicleBrand": this.controlerData.vehicleBrand.value,
            "comment": this.controlerData.comment.value,
            "vehicleModel": {
              "name": this.controlerData.vehicleModel.value,
              "color": this.controlerData.color.value,
              "modelYear": this.controlerData.modelYear.value
            },
            
          }
          console.log('SUBMIT');
          console.log(carData);
          //image eka yane Sting eka
    
    
          //passing to service
          this.carService.updateAllCars(carData)
            .subscribe(
              response => {
                console.log(response);
                this.submitted = false;
                this.carDetailsEdit.reset();
              },
              error => {
                console.log(error);
                return;
              }
            )
    
        } else {
          return;
        }
    
    
      }
  

}
