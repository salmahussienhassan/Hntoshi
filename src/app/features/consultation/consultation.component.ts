import arLocale from 'i18n-iso-countries/langs/ar.json';
import  enLocale  from 'i18n-iso-countries/langs/en.json';
import { LangService } from './../../shared/services/lang.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import intlTelInput from 'intl-tel-input';
import * as countries from 'i18n-iso-countries';
import { NoNumbersDirective } from '../../shared/directives/no-numbers.directive';
import { OnlyNumbersDirective } from '../../shared/directives/only-numbers.directive';
import { ConsultationService } from '../../core/services/consultation.service';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [TranslateModule,CommonModule,ReactiveFormsModule,NoNumbersDirective,OnlyNumbersDirective ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css'
})
export class ConsultationComponent {

  items = [
    {
      icons: [
        { src: '../../../assets/img/consultation/thin_12737916 1.svg', text: 'consultation.legalConsultations' },
        { src: '../../../assets/img/consultation/job-search_9752490 1.svg', text: 'consultation.criminalCase' },
        { src: '../../../assets/img/consultation/laws_11520986 1.svg', text: 'consultation.laborLawsuits' },
      ]
    },
    {
      icons: [
        { src: '../../../assets/img/consultation/Frame 1410103830.svg', text: 'consultation.legalRepresentation' },
        { src: '../../../assets/img/consultation/service icons.svg', text: 'consultation.civilSuits' },
        { src: '../../../assets/img/consultation/thin_12737916 1 (1).svg', text: 'consultation.alternativeDisputeResolution' }
      ]
    },
    {
      icons: [
        { src: '../../../assets/img/consultation/money_15420351 1.svg', text: 'consultation.commercialLawsuits' },
        { src: '../../../assets/img/consultation/equality-symbol_15791418 1.svg', text: 'consultation.bankingLawsuits' },
      ]
    }
 
  ];
  selectedLanguage: 'en' | 'ar' = 'ar';
  iti: any;
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  direction: string = 'rtl';
  consultationForm!:FormGroup;
  submitted:boolean=false
  notValidHere: any[] = [];
selectedService!:string
errors:any

constructor(private translate: TranslateService,private langService:LangService,private fb: FormBuilder,private consultationService:ConsultationService){
  countries.registerLocale(enLocale);
  countries.registerLocale(arLocale);

  this.consultationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(25)]],
    email: ['', [Validators.required,Validators.maxLength(100), Validators.email]],
    phoneNumber: ['', [Validators.required,Validators.maxLength(20), Validators.pattern('^[0-9]+$')]],
    countryCode:[''],
    serviceType:['',Validators.required],
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

onDropdownClick(): void {
  const serviceTypeControl = this.consultationForm.get('serviceType');
  if (!serviceTypeControl?.value) {
    serviceTypeControl?.markAsTouched(); // Ensure it shows validation error if nothing is selected
  }
}

userService(service:string){
  this.translate.get(service).subscribe((translatedText: string) => {
    this.selectedService=translatedText
    this.consultationForm.get('serviceType')?.setValue(this.selectedService)
    this.consultationForm.get('serviceType')?.markAsTouched(); // Ma
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
    // this.consultationForm.reset({
    //   fullName: '',
    //   email: '',
    //   phoneNumber: '',
    //   countryCode: '',
    //   message: ''
    // });
    
  }

  getCountryCode() {
    if (this.iti) {
      const countryData = this.iti.getSelectedCountryData();
      return countryData.dialCode; // This will give you the country code
    }
    return '';
  }

  onSubmit(form:any){
    const countryCode = this.getCountryCode();
    this.consultationForm.controls['countryCode'].setValue(countryCode);
    this.errors = [];
    this.submitted=true
    if(form.valid){

this.consultationService.createConsultation(form.value).subscribe({
  next:(res)=>{
    console.log(res)
    if (this.selectedLanguage === 'ar') {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "تم إرسال طلب استشارتك بنجاح",
        text: "نحن هنا لنقدم لك الدعم والخبرة اللازمة",
        showConfirmButton: false,
      });
    } else if (this.selectedLanguage === 'en') {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your consultation request has been successfully sent",
        text: "We are here to provide you with the necessary support and expertise",
        showConfirmButton: false,
      });
    }
    this.clearForm()
  },
  error:(err)=>{
    console.log(err);
    
  }
})}
}

}
