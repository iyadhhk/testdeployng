import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showSuccessMessage:any
  serverErrorMessages:any;
  selectedCountry: any={} ;

  registerForm:FormGroup;
  submitted = false;
  selectedOption:any
  constructor(private _formBuilder:FormBuilder, private router : Router,private UserService:UserService) {
    this.createForm();
  }

  ngOnInit(): void {

  }



  createForm() {
    this.registerForm = this._formBuilder.group(
        {

            email: [
                null,[Validators.required, Validators.email]
            ],
            nomPresidentAssociation: [null, Validators.required],
            prenom: [null, Validators.required],
            password: ['', [Validators.required, Validators.minLength(4)]],
            siteInternet:["",[Validators.required]],
            nomAssociation:["",[Validators.required]],
            pays:["",[Validators.required]],
            ville:["",[Validators.required]],
            adresse:["",[Validators.required]],
            codePostal:["",[Validators.required]],
            pageReseauSocial:["",[Validators.required]],
            telephone:["",[Validators.required]],
            role:["propriétaire",[Validators.required]],
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
      this.UserService.addService(
          this.registerForm.value
      ).subscribe(
          (res:any)  =>{
              console.log('user added ',res)
              this.showSuccessMessage=true
              setTimeout(()=>this.showSuccessMessage=false,4000)
            this.router.navigateByUrl('/home')
          },
            err =>{
              if(err.status=== 422)
               this.serverErrorMessages=err.error.join('<br/>')
               else
               this.serverErrorMessages='something went wrong .Please contact admin'
            }



          )


}
}
