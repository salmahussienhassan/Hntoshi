import { Routes } from '@angular/router';
import { BlogDetailsComponent } from './features/blog/blog-details/blog-details.component';
import { HomeComponent } from './features/home/home.component';
import { BlogsComponent } from './features/blog/blogs/blogs.component';
import { ContactUsComponent } from './features/contact-us/contact-us.component';
import { ConsultationComponent } from './features/consultation/consultation.component';
import { FAQComponent } from './shared/component/faq/faq.component';


export const routes: Routes = [ 
    {path: '',redirectTo:'home',pathMatch:'full'},
    {path: 'home',component:HomeComponent,title:'Home'},
    {path: 'blogs',component:BlogsComponent,title:'Blogs'},
    {path: 'blog-details',component:BlogDetailsComponent,title:'blog-details'},
    {path: 'contact-us',component:ContactUsComponent,title:'contact-us'},
    {path: 'Consultation',component:ConsultationComponent,title:'Consultation'},
    {path: 'faq',component:FAQComponent,title:'FAQ'},
];
