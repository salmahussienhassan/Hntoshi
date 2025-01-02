import { Component, HostListener, Inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled = false;
  @HostListener('window:scroll', [])
  langText:string = 'English';
  langUrl:string = 'ar';
  isMobile: boolean = false;
  constructor(private router: Router,
    private langService:LangService,
    @Inject(DOCUMENT) private document: Document 
  ) { }

  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;
  }

  ngOnInit(): void {
    this.changeCssFile(this.langUrl);
  }

  changeLanguage(lang:string) {
    this.langText = lang === 'ar' ? 'English' : 'ar';
    this.langUrl = lang === 'ar' ? 'ar' : 'en';
   
    this.changeCssFile(this.langUrl);
    this.langService.setLanguage(this.langUrl);
  }

  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
    let bundleName = lang === 'ar' ? "arabicStyle.css" : "englishStyle.css";
    if (existingLink) {
      existingLink.href = bundleName;
    }
    else{
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.id = "langCss";
      newLink.href = bundleName;
      headTag.appendChild(newLink);
    }
  }
}
