import { Component, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { SidebarMenuItems } from '../../model/sidebar-menu-items';
import { TokenService } from '../../admin-service/token/token.service';
import { AuthService } from '../../admin-service/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {

  @Input() menus: SidebarMenuItems[];
  loggedIn: boolean;
  apiResponse: any[] = [];    // rename this with your custom name
  customList: any[] = [];     // rename this with your custom name
  name: string;
  disabled = false;
  selectLang:string="";
  TransLang=[];

  constructor(private tokenService: TokenService, 
              private authService: AuthService,
              private translate: TranslateService,
              private router: Router,
              private datePipe: DatePipe,
              @Inject(DOCUMENT) private document: Document,
              private render: Renderer2) {
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'ar']);
    this.selectLang = 'en';
    translate.use('en');
  }

  ngOnInit() {
    this.getTransLanguage();
    
    this.authService.authState.subscribe(
      loggedIn => this.loggedIn = loggedIn
    );

    /*
      Search API Method Here
    */
    
  }

  setTransLanguage() {
    console.log('set new language', this.selectLang);
    const htmlTag = this.document.querySelector('html') as HTMLElement;    
    const loaderIcon = this.document.querySelector('.lds-ring') as HTMLElement;    
    this.collapseMenu();
    if (this.selectLang == 'ar') {
      // set all project direction
      this.render.setStyle(htmlTag, 'direction', 'rtl');
      // set sidebar button direction
      this.document.querySelectorAll('.btn.btn-link').forEach(e => {
        this.render.setStyle(e, 'text-align', 'right');
      });
      // set sidebar button icon direction
      this.document.querySelectorAll('.fa-custom').forEach(e => {
        this.render.setStyle(e, 'right', 'unset');
        this.render.setStyle(e, 'left', '10px');
      });
      // set sidebar form direction to ltr 
      this.render.setStyle(this.document.querySelector('.mobile-search-form'), 'direction', 'ltr');
      this.render.setStyle(this.document.querySelector('.input-group-prepend'), 'display', 'flex');
      this.render.addClass(this.document.querySelector('.input-group-text'), 'input-group-text-custom');
      // change bootstrap link to bootstrap-rtl version link
      this.document.querySelectorAll('link').forEach((e, k, i) => {
        if (e.href.search('bootstrap.min.css') > 0) {
          e.href = 'assets/css/bootstrap-rtl.min.css';
          e.removeAttribute('integrity');
          e.removeAttribute('crossorigin');
        }
      });
    } else {
      this.render.setStyle(htmlTag, 'direction', 'ltr');
      this.document.querySelectorAll('.btn.btn-link').forEach(e => {
        this.render.setStyle(e, 'text-align', 'left');
      });
      this.document.querySelectorAll('.fa-custom').forEach(e => {
        this.render.setStyle(e, 'right', '10px');
        this.render.setStyle(e, 'left', 'unset');
      });
      this.render.removeClass(this.document.querySelector('.input-group-text'), 'input-group-text-custom');
      this.document.querySelectorAll('link').forEach((e, k, i) => {
        console.log(e.href);
        if (e.href.search('bootstrap-rtl.min.css') > 0) {
          e.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
          e.setAttribute('integrity', 'sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm');
          e.setAttribute('crossorigin', 'anonymous');
        }
      });
    }
    this.translate.use(this.selectLang);
  }

  getTransLanguage(){
    this.TransLang = [...this.translate.getLangs()];
  }

  logout() {
    this.tokenService.deleteToken();
    this.authService.changeAuthStatus(false);
    this.router.navigate(['/login']);
  }

  clicked(value = null) {
    this.collapseMenu();
    if (value) {
      // Add The Event Here
    }
  }

  select(id: number) {
    this.collapseMenu();
    this.disabled = false;
    // empty search input
    this.render.setProperty(this.document.getElementById('inlineFormInputGroupUsername2'), 'value', '');
    this.router.navigate(['/customRoute/', id]);  // rename this with your custom route
  }

  collapseMenu() {
    const screenWidth = window.innerWidth;
    console.log('screenWidth', screenWidth);
    if (screenWidth < 768) {
      this.render.addClass(this.document.querySelector('.navbar-toggler'), 'collapsed');
      this.render.removeClass(this.document.getElementById('navbarSupportedContent'), 'show');
    }
  }


  applyFilter() {
    this.collapseMenu();
    if (this.name == '') {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
    // if the search input value is empty
    if (!this.name) {
      this.customList = [...this.apiResponse];
    } else {
      this.customList = [];
      this.customList = this.apiResponse.filter(res => {
        /* Example :
        if (res.orderDate) {
          const orderDate = (this.datePipe.transform(new Date(res.orderDate.timestamp * 1000), 'yyyy-MM-dd')).toString().match(this.name.toLocaleLowerCase());
          if (orderDate) {
            return orderDate;
          } 
        }
        */
      });
    }
  }


}
