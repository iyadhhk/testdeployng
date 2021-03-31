import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ApiserviceService } from '../shared/apiservice.service';
import { UserService } from '../shared/user.service'

import {Router} from '@angular/router'
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  userDetails:any;

  showSuccessMessage:any
  serverErrorMessages:any;
  selectedCountry: any={} ;

  registerForm:any;
  submitted = false;
  selectedOption:any
  constructor(private _formBuilder:FormBuilder, private router : Router,private MosqueeService:ApiserviceService,
    private userService:UserService,
    ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data:any)=>{
      console.log(data)
      this.userDetails=data.user
    })
  }



  createForm() {
    this.registerForm = this._formBuilder.group(
        {

          nomMosquee: ['',Validators.required],
            adresse: ['', Validators.required],
            imamMosquee: ['', Validators.required],
            siteWeb: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            associationMosquee:["",Validators.required],
            lat:["",Validators.required],
            lng:["",Validators.required],
            openingHours:["",Validators.required],
            featuredImage:["",Validators.required],
            municipality:["",Validators.required],
            facebook:["",Validators.required],
            nomGestionnaire:["",Validators.required],
            sallePriereFemmes:["",Validators.required],
            mosqueeSallePriere:["",Validators.required],
            fermetureExeptionnelle:["",Validators.required],
            telephone:["",Validators.required],
            telephone1:["",Validators.required],
            ouvertureMosquee:["",Validators.required],
        }
    );
}
get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;
console.log(this.registerForm.value)
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('error')
        return;
    }

    // display form values on success
      this.MosqueeService.addService(
        this.registerForm.value.nomMosquee,this.registerForm.value.adresse,
        this.registerForm.value.telephone,this.registerForm.value.telephone1,this.registerForm.value.email,
        this.registerForm.value.facebook, this.registerForm.featuredImage,this.registerForm.value.ouvertureMosquee,
        this.registerForm.value.imamMosquee,this.registerForm.value.nomGestionnaire, this.registerForm.value.sallePriereFemmes,
        this.registerForm.value.mosqueeSallePriere, this.registerForm.value.fermetureExeptionnelle,this.registerForm.value.siteWeb,
        this.registerForm.value.associationMosquee, this.registerForm.value.lat, this.registerForm.value.lng,
        this.registerForm.value.openingHours, this.registerForm.value.municipality
      ).subscribe(
          (res:any)  =>{
              console.log('mosquee added ',res)
              this.showSuccessMessage=true
              setTimeout(()=>this.showSuccessMessage=false,4000)
          },
            err =>{
              if(err.status=== 422)
               this.serverErrorMessages=err.error.join('<br/>')
               else
               this.serverErrorMessages='verifiez avec admin'
            }



          )


}
onSelectimage(event: any){
  console.log(event.target.files[0])
  const file = event.target.files[0];
    this.registerForm.featuredImage=file
    console.log(this.registerForm.featuredImage)
}
}
