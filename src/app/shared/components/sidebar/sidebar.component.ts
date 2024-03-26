import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SidebarCategory } from './sidebar.model';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { Subscription, combineLatest, filter, map, tap } from 'rxjs';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  categories: SidebarCategory[] = [];

  private _subscription = new Subscription();

  isProfile = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private jwtService: JwtService
  ){}

  ngOnInit() {
    this._subscription.add(combineLatest([
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd || event instanceof Scroll)
        ),
      this.jwtService.isLoggedInUpdates
    ]).pipe(
      map(([routerEvent, isLoggedIn]) => {
        let url = "";
        if(routerEvent instanceof NavigationEnd) {
          url = (routerEvent as NavigationEnd).url; 
        } else if(routerEvent instanceof Scroll) {
          url = (routerEvent as Scroll).routerEvent.url;
        }
        return isLoggedIn && url.startsWith('/profile');
      })
    ).subscribe(isProfile => {
      this.isProfile = isProfile;
    }));
    this.sidebarService.getCategories().subscribe(cat => this.categories = cat);
  }

  logOut() {
    this.jwtService.removeToken();
    this.jwtService.setAminAccess(false);
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
