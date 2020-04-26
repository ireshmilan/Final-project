import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-my-active-rent-update',
  templateUrl: './my-active-rent-update.component.html',
  styleUrls: ['./my-active-rent-update.component.css']
})
export class MyActiveRentUpdateComponent implements OnInit {

  id:any;
  myRentDetailsEdit:FormGroup;
  submitted = false;
  selectValue:any;

  constructor(
    private route: ActivatedRoute,
    private rentservice:RentService,
    private formBuilder:FormBuilder,
    private router:Router
    
  ) { }

  

  ngOnInit() {
    this.myRentDetailsEdit = this.formBuilder.group({
      carId: [''],
      registeredNumber: [''],
      model: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startLocation: ['', Validators.required],
      endLocation: ['', Validators.required],
      comment: ['', Validators.required],
      customerId:[''],
      customerName:[''],
      idNo:[''],
      createdDate:['']
      
    });
    this.displayValueForm()


  }

  displayValueForm() {
    //get accutale route id 
   this.id = (this.route.snapshot.paramMap.get('id'));
   console.log(this.id);
 
    
    this.rentservice.getRentByRentId(this.id)
    .subscribe(
      data=>{
       this.myRentDetailsEdit.controls['customerId'].setValue(data[0].customerId);
       this.myRentDetailsEdit.controls['idNo'].setValue(data[0].customerOwner[0].idCardNumber); 
       this.myRentDetailsEdit.controls['customerName'].setValue(data[0].customerOwner[0].firstName+" "+data[0].customerOwner[0].lastName);       
       this.myRentDetailsEdit.controls['carId'].setValue(data[0].carId);
       this.myRentDetailsEdit.controls['registeredNumber'].setValue( data[0].car[0].registeredNumber );
       this.myRentDetailsEdit.controls['model'].setValue(data[0].car[0].vehicleBrand+" "+data[0].car[0].vehicleModel.name+" "+data[0].car[0].vehicleModel.modelYear);
       this.myRentDetailsEdit.controls['startDate'].setValue(data[0].needDate);
       this.myRentDetailsEdit.controls['endDate'].setValue(data[0].endDate);
       this.myRentDetailsEdit.controls['startLocation'].setValue(data[0].start);
       this.myRentDetailsEdit.controls['endLocation'].setValue(data[0].end);
       this.myRentDetailsEdit.controls['comment'].setValue(data[0].comments);
       this.myRentDetailsEdit.controls['createdDate'].setValue(data[0].createdDate);
         
     
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
    return this.myRentDetailsEdit.controls;
  }
  
  
  
      uploadSubmit() {
        this.submitted = true;
    
        if (this.myRentDetailsEdit.valid) {
          let rentData = {
            "id": this.id,
            "customerId": this.controlerData.customerId.value,
            "carId": this.controlerData.carId.value,
            "needDate": this.controlerData.startDate.value,
            "endDate": this.controlerData.endDate.value,
            "start": this.controlerData.startLocation.value,
            "end": this.controlerData.endLocation.value,
            "comments": this.controlerData.comment.value,
            
            "createdDate":this.controlerData.createdDate.value
            
            
          }
          console.log('SUBMIT');
          console.log(rentData);
          //image eka yane Sting eka
    
    
          //passing to service
          this.rentservice.update(rentData)
            .subscribe(
              response => {
                console.log(response);
                this.submitted = false;
                this.myRentDetailsEdit.reset();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Your Rent has been updated',
                  showConfirmButton: false,
                  timer: 2500
                })
                this.router.navigate(['/myPreviousRentTable']);
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
