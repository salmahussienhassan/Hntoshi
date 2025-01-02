import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LangService } from './shared/services/lang.service';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hantoshi';

  direction: string = 'rtl';
  lang ='ar'

  constructor(@Inject(DOCUMENT)  private document: Document,private langService:LangService){}

  ngOnInit(): void {
    
    this.langService.languageChanged.subscribe(lang => {
      this.direction = lang === 'ar' ? 'rtl' : 'ltr';
    })
  }

}
