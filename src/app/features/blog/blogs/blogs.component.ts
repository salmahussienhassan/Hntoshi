import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../shared/pipe/truncate.pipe';
import { BlogCardsComponent } from '../../../shared/component/blog-cards/blog-cards.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [TranslateModule,BlogCardsComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {

}
