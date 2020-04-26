import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RentService } from 'src/app/services/rent.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rent-details-edit',
  templateUrl: './rent-details-edit.component.html',
  styleUrls: ['./rent-details-edit.component.css']
})
export class RentDetailsEditComponent implements OnInit {
  id:any;
  rentDetailsEdit:FormGroup;
  submitted = false;
  selectValue:any;

  constructor(
    private route: ActivatedRoute,
    private rentservice:RentService,
    private formBuilder:FormBuilder
    
  ) { }

  

  ngOnInit() {
    this.rentDetailsEdit = this.formBuilder.group({
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
       this.rentDetailsEdit.controls['customerId'].setValue(data[0].customerId);
       this.rentDetailsEdit.controls['idNo'].setValue(data[0].customerOwner[0].idCardNumber); 
       this.rentDetailsEdit.controls['customerName'].setValue(data[0].customerOwner[0].firstName+" "+data[0].customerOwner[0].lastName);       
       this.rentDetailsEdit.controls['carId'].setValue(data[0].carId);
       this.rentDetailsEdit.controls['registeredNumber'].setValue( data[0].car[0].registeredNumber );
       this.rentDetailsEdit.controls['model'].setValue(data[0].car[0].vehicleBrand+" "+data[0].car[0].vehicleModel.name+" "+data[0].car[0].vehicleModel.modelYear);
       this.rentDetailsEdit.controls['startDate'].setValue(data[0].needDate);
       this.rentDetailsEdit.controls['endDate'].setValue(data[0].endDate);
       this.rentDetailsEdit.controls['startLocation'].setValue(data[0].start);
       this.rentDetailsEdit.controls['endLocation'].setValue(data[0].end);
       this.rentDetailsEdit.controls['comment'].setValue(data[0].comments);
       this.rentDetailsEdit.controls['createdDate'].setValue(data[0].createdDate);
         
     
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
    return this.rentDetailsEdit.controls;
  }
  
  
  
      uploadSubmit() {
        this.submitted = true;
    
        if (this.rentDetailsEdit.valid) {
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
                this.rentDetailsEdit.reset();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Your Rent has been updated',
                  showConfirmButton: false,
                  timer: 2500
                })
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
