import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { FileUploader } from 'ng2-file-upload';


import { Services } from '../../services/Services';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})


export class CarDetailsComponent implements OnInit {

  carDetailsregistration: FormGroup;
  submitted = false;
  imageData: any;


  // private photo: any =File;
  // private fuel='Diesel';
  // private transmission='Auto';
  // private acOrNonAc='Ac';
  // private registerdNumber:String;
  // private registerdYear:String;
  // private brand:String;
  // private ModelName:String;
  // private modelColor:String;
  // private modelYear:String;
  // private comment:String;
  // private onwerName:String;
  // private owners: Array<String>=[];

  file: File;
  private data: any[];
  Type = ['Choose your Brand', 'Toyota', 'Nissan', 'Mazda', 'Benz', 'Mitsubishi', 'Suzuki'];
  fuelType = ['Select Fuel Type', 'Diesel', 'Petrol', 'Hybrid'];
  acNonAc = ['Select Ac Type', 'AC', 'Non Ac'];
  tranmision = ['Select Transmision Type', 'Auto', 'Manual'];

  constructor(private services: Services,
    private formBuilder: FormBuilder,

  ) {
    this.services = services;
  }


  ngOnInit() {
    this.carDetailsregistration = this.formBuilder.group({
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
      photo: ['', Validators.required]
    },
    {
      validator: this.MustMatch('modelYear', 'registerdYear')
    }
    
    )
    this.addDefaultValue()
    // this.getOwners();
    this.genID()
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      var matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      
      if (control.value >= matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true }); 
      } else {
        matchingControl.setErrors(null);

      }
    }
  }


  addDefaultValue() {
    const defaultData = 'Choose your Brand';

    if (defaultData !== this.Type[0]) {
      this.Type.push('Choose your Brand');
    }

  }

  removeDefualtValue() {
    const defaultData = 'Choose your Brand';
    if (defaultData == this.Type[0]) {
      this.Type.shift();

    }

  }

  addDefaultFuelValue() {
    const defaultfuel = 'Select Fuel Type';

    if (defaultfuel !== this.fuelType[0]) {
      this.fuelType.push('Select Fuel Type');
    }

  }

  removeDefualtFuelValue() {
    const defaultfuel = 'Select Fuel Type';
    if (defaultfuel == this.fuelType[0]) {
      this.fuelType.shift();

    }

  }

  addDefaultAcValue() {
    const defaultAc = 'Select Ac Type';

    if (defaultAc !== this.acNonAc[0]) {
      this.acNonAc.push('Select Ac Type');
    }

  }

  removeDefualtAcValue() {
    const defaultAc = 'Select Ac Type';
    if (defaultAc == this.acNonAc[0]) {
      this.acNonAc.shift();

    }

  }

  addDefaultTransmisionValue() {
    const defaultTranmision = 'Select Transmision Type';

    if (defaultTranmision !== this.tranmision[0]) {
      this.tranmision.push('Select Transmision Type');
    }

  }

  removeDefualtTransmisionValue() {
    const defaultTranmision = 'Select Transmision Type';
    if (defaultTranmision == this.tranmision[0]) {
      this.tranmision.shift();

    }

  }

  genID() {
    // Id Gen
    const chars = 'ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';
    const string_length = 8;
    let id = 'IT_' + '';
    for (let i = 0; i < string_length; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.carDetailsregistration.controls['ownerId'].setValue(id);


    }
  }
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  // getOwners(){



  //   this.services.getOwners().subscribe(
  //         (serversData: any[]) => this.owners=serversData,
  //         (error) => console.log(error)
  //     );
  // }


  //data ganwa controller
  get controlerData() {
    return this.carDetailsregistration.controls;
  }


  uploadFile(event) {

    // console.log(event.target.value);

    // const reader = new FileReader(); // HTML5 FileReader API
    this.file = event.target.files[0];
    // if (event.target.files && this.file) {
    console.log(this.file)
    //   reader.readAsDataURL(this.file);

    //   // When file uploads set it to file formcontrol
    //   reader.onload = () => {
    //     this.imageData = reader.result;
    //     this.carDetailsregistration.patchValue({
    //       file: reader.result
    //     });
    //     // this.editFile = false;
    //     // this.removeUpload = true;
    //   };
    //   // ChangeDetectorRef since file is loading outside the zone
    //   this.cd.markForCheck();
    // }
  }

  uploadSubmit() {
    this.submitted = true;

    if (this.carDetailsregistration.valid) {
      let carData = {
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
        "ownerId": this.controlerData.ownerId.value,
        "photo": this.imageData
      }
      console.log('SUBMIT');
      console.log(carData);
      //image eka yane Sti    
      console.log("qqqqqqqqqqqqqqqqqqqqq" + this.file)
      const formData = new FormData();
      formData.append('car', JSON.stringify(carData));
      formData.append('photo', this.file);

      console.log('lolllll')
      console.log(formData);
      //passing to service
      this.services.saveCarDetails(formData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = false;
            this.carDetailsregistration.reset();
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
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
