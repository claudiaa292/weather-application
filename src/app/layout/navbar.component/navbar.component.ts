import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  theme: string = 'bootstrap';

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {}

  public openRoute(route: string): void {
    this.router.navigate([route]);
  }
  toggleTheme() {
    if (this.theme === 'bootstrap') {
      this.theme = 'bootstrap-dark';
    } else {
      this.theme = 'bootstrap';
    }

    this.themeService.setTheme(this.theme);
  }
}
