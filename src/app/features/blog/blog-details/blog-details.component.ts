import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TruncatePipe } from '../../../shared/pipe/truncate.pipe';
import { RouterLink } from '@angular/router';
import { BlogCardsComponent } from '../../../shared/component/blog-cards/blog-cards.component';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [TranslateModule,BlogCardsComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {

}
