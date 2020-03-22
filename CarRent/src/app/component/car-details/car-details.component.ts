import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';


import { Services } from '../../Services';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})


export class CarDetailsComponent implements OnInit {

  carDetailsregistration: FormGroup;
  submitted = false;
  imageUrl: any;


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

  selectedFileOne: File;
  private data: any[];
  Type = ['Toyota', 'Nissan', 'Mazda', 'Benz', 'Mitsubishi', 'Suzuki'];
  fuelType = ['Diesel', 'Petrol', 'Hybrid'];
  acNonAc = ['AC', 'Non Ac'];
  tranmision = ['Auto', 'Manual'];

  constructor(private services: Services,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
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
      photo: ['']
    })

    // this.getOwners();
    this.genID()
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

    console.log(event.target.value);

    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.carDetailsregistration.patchValue({
          file: reader.result
        });
        // this.editFile = false;
        // this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
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
        "photo": this.imageUrl
      }
      console.log('SUBMIT');
      console.log(carData);
      //image eka yane Sting eka


      //passing to service
      this.services.saveCarDetails(carData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = false;
            this.carDetailsregistration.reset();
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
