import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

  id:any;
  carDelete:FormGroup;
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
    this.carDelete = this.formBuilder.group({
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
      
       this.carDelete.controls['registeredNumber'].setValue(data[0].registeredNumber);
       this.carDelete.controls['registerdYear'].setValue(data[0].registerdYear);
       this.carDelete.controls['vehicleBrand'].setValue(data[0].vehicleBrand);
       this.carDelete.controls['vehicleModel'].setValue(data[0].vehicleModel.name);
       this.carDelete.controls['color'].setValue(data[0].vehicleModel.color);
       this.carDelete.controls['modelYear'].setValue(data[0].vehicleModel.modelYear);
       this.carDelete.controls['fuleType'].setValue(data[0].fuleType);
       this.carDelete.controls['acNonAc'].setValue(data[0].acOrNonAc);
       this.carDelete.controls['tranmision'].setValue(data[0].transmission);
       this.carDelete.controls['comment'].setValue(data[0].comment);
       this.carDelete.controls['createdDate'].setValue(data[0].createdDate);
       
       
       
     
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
    return this.carDelete.controls;
  }
  

  
      uploadSubmit() {


        this.submitted = true;
    
        if (this.carDelete.valid) {
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
            "createdDate":this.controlerData.createdDate.value
            
            
          }
          console.log('SUBMIT');
          console.log(carData);
          //image eka yane Sting eka
    
    
          //passing to service
          
    
       

        Swal.fire({
          title: 'Are you sure?',
          text: "Do you Want to delete!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.carService.deleteCar(carData)
            .subscribe(
              response => {
                console.log(response);
                this.submitted = false;
                this.carDelete.reset();
                this.router.navigate(['/carDeleteTable']);
                
                
              },
              error => {
                console.log(error);
                return;
              }
            )
          }
        })
        
  
      } 
    
      }
  

}
