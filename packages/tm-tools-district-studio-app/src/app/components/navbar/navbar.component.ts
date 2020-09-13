import { Component, OnInit, } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  selectedItem: string = 'members';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const navigationEnd = e as NavigationEnd;
        if (e.url.startsWith('/members')) {
          this.selectedItem = 'members';
        } else if (e.url.startsWith('/clubs')) {
          this.selectedItem = 'clubs'
        } else if (e.url.startsWith('/settings')) {
          this.selectedItem =  'settings';
        }
      }
    });
  }

  itemClicked( item: string) {
    this.router.navigate([`/${item}`]);
  }

}
