import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  public activeIconSubject = new BehaviorSubject<string>(''); 

  private languageSubject = new BehaviorSubject<string>('ar');
  language$ = this.languageSubject.asObservable();

  languageChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(router: Router, private translateService: TranslateService) {
    
    this.translateService.use('ar');
    this.emitLanguageChange('ar');
    this.activeIconSubject.next(router.url.substring(router.url.lastIndexOf('/') + 1));
  }


  setLanguage(lang: string) {
    this.translateService.use(lang);
    this.languageSubject.next(lang);
    this.emitLanguageChange(lang);
  }

  private emitLanguageChange(lang: string) {
    this.languageChanged.emit(lang);
  }

  set currentLang(lang: string) {
    localStorage.setItem('lang',lang);
  }
  get currentLang(): string {
    return localStorage.getItem('lang')?? 'ar';
  }
}
