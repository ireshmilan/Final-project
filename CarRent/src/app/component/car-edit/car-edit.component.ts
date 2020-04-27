import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getQueryValue } from '@angular/core/src/view/query';
import Swal from 'sweetalert2'

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

  Type = [ 'Toyota', 'Nissan', 'Mazda', 'Benz', 'Mitsubishi', 'Suzuki'];
  fuelType = [ 'Diesel', 'Petrol', 'Hybrid'];
  acNonAc = [ 'AC', 'Non Ac'];
  tranmision = [ 'Auto', 'Manual'];

  constructor(
    private route: ActivatedRoute,
    private carService:CarService,
    private formBuilder:FormBuilder,
    private router:Router
    
  ) { }

  

  ngOnInit() {
    this.carDetailsEdit = this.formBuilder.group({
      registeredNumber: ['', Validators.required],
      registerdYear: ['', Validators.required],
      fuleType: ['', Validators.required],
      acNonAc: ['', Validators.required],
      tranmision: ['', Validators.required],
      vehicleBrand: ['', Validators.required],
      comment: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      color: ['', Validators.required],
      modelYear: ['', Validators.required],
      ownerId: [''],
      photo: [''],
      createdDate:['']
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
       this.carDetailsEdit.controls['fuleType'].setValue(data[0].fuleType);
       this.carDetailsEdit.controls['acNonAc'].setValue(data[0].acOrNonAc);
       this.carDetailsEdit.controls['tranmision'].setValue(data[0].transmission);
       this.carDetailsEdit.controls['comment'].setValue(data[0].comment);
       this.carDetailsEdit.controls['createdDate'].setValue(data[0].createdDate);
       this.carDetailsEdit.controls['photo'].setValue(data[0].photo);
       
       
       
     
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
            "photo": this.controlerData.photo.value,
            "vehicleModel": {
              "name": this.controlerData.vehicleModel.value,
              "color": this.controlerData.color.value,
              "modelYear": this.controlerData.modelYear.value
              
            },
            "createdDate":this.controlerData.createdDate.value
            
            
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
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Car Updated',
                  showConfirmButton: false,
                  timer: 2500
                })
                this.router.navigate(['/dashBoard']);
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
