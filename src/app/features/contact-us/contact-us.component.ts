import { ContactService } from './../../core/services/contact.service';
import arLocale  from 'i18n-iso-countries/langs/ar.json';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { LangService } from './../../shared/services/lang.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import intlTelInput from 'intl-tel-input';
import Swal from 'sweetalert2';
import * as countries from 'i18n-iso-countries';
import { OnlyNumbersDirective } from '../../shared/directives/only-numbers.directive';
import { NoNumbersDirective } from '../../shared/directives/no-numbers.directive';
import { CommonModule } from '@angular/common';
import { NotExpr } from '@angular/compiler';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [TranslateModule,ReactiveFormsModule,OnlyNumbersDirective,NoNumbersDirective,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  iti: any;
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  selectedLanguage: 'en' | 'ar' = 'ar';
  direction: string = 'rtl';
  contactForm!:FormGroup;
  submitted:boolean=false
  notValidHere: any[] = [];

constructor(private langService:LangService,private fb: FormBuilder,private contactService:ContactService){
  countries.registerLocale(enLocale);
  countries.registerLocale(arLocale);

  this.contactForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(25)]],
    email: ['', [Validators.required,Validators.maxLength(100), Validators.email]],
    phoneNumber: ['', [Validators.required,Validators.maxLength(20), Validators.pattern('^[0-9]+$')]],
    countryCode:[''],
   message:['',[Validators.required,Validators.maxLength(500)]]
  });

}

ngOnInit(): void {

  const inputElement = document.querySelector('#phone') as HTMLInputElement | null;
  if (inputElement) {
    this.iti = intlTelInput(inputElement, {
      initialCountry: 'sa',
      separateDialCode: true,
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      excludeCountries: ['il']
    } as any);
  }

  this.langService.languageChanged.subscribe(lang => {
    this.direction = lang === 'ar' ? 'rtl' : 'ltr';
    this.selectedLanguage = lang === 'ar' ? 'ar' : 'en';
    this.updateCountryNames();
  });

}

 
  // iti iti--container iti--fullscreen-popup
  getLocalizedCountryName(countryCode: string): string {
    return countries.getName(countryCode.toUpperCase(), this.selectedLanguage) || countryCode;
  }
  
  updateCountryNames() {
    // const countryListItems = document.querySelectorAll('.iti__dropdown-content .iti__country-name');
    const countryButton = document.querySelector('.iti__selected-country');
    countryButton?.addEventListener('click', () => {
        setTimeout(() => {
            const countryListItems = document.querySelectorAll('.iti__country-list .iti__country-name');
            countryListItems.forEach(item => {
              const countryCode = (item.parentElement?.getAttribute('data-country-code') || '').toUpperCase();
              const localizedCountryName = this.getLocalizedCountryName(countryCode);
              if (localizedCountryName) {
                item.textContent = localizedCountryName;
              }
                console.log(item.textContent);  // Example: log each country name
            });
        }, 10); // Delay to allow the popup to render
    });
  
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
  
    if (control instanceof FormControl) {
  
      if (control.invalid) {
  
        this.notValidHere.push(control);
      }
      else {
        control.markAsPristine();
      }
  
      control.markAsTouched({ onlySelf: true });
    }
  
    else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
  }

  clearForm(): void {
    // this.contactForm.reset({
    //   fullName: '',
    //   email: '',
    //   phoneNumber: '',
    //   countryCode: '',
    //   message: ''
    // });
  }
  get fireValidation() { return this.contactForm.controls; }
  errors:any
  

  getCountryCode() {
    if (this.iti) {
      const countryData = this.iti.getSelectedCountryData();
      return countryData.dialCode; // This will give you the country code
    }
    return '';
  }
 
 onSubmit(form:any){
  const countryCode = this.getCountryCode();
  this.contactForm.controls['countryCode'].setValue(countryCode);
  this.errors = [];
  this.submitted=true
  if(form.valid){
    console.log(form.value)
    this.contactService.createContact(form.value).subscribe({
        next:(res)=>{
          console.log(res)
          this.clearForm()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "تم إرسال رسالتك بنجاح",
            text: "نحن هنا لمساعدتك في التنقل عبر احتياجاتك القانونية بثقة",
            showConfirmButton: false,
           
          });
        },
        error:(err)=>{
          console.log(err)
        }

      }
    )
 

  }
 }
}
