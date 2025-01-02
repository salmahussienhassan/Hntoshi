import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TruncatePipe } from '../../pipe/truncate.pipe';

@Component({
  selector: 'app-blog-cards',
  standalone: true,
  imports: [TranslateModule,RouterLink,TruncatePipe,CommonModule],
  templateUrl: './blog-cards.component.html',
  styleUrl: './blog-cards.component.css'
})
export class BlogCardsComponent {
  imgs=[
    '../../../assets/img/blogs/Image (7).png',
    '../../../assets/img/blogs/unsplash_l5Tzv1alcps (1).png',
    '../../../assets/img/blogs/unsplash_l5Tzv1alcps.png',
    '../../../assets/img/blogs/wooden-gavel-law-table-top-with-city-skyline-blur-background-generative-ai-aig32 1.png',
  ]
}
