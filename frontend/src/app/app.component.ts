//app.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    NgIf,
    RouterOutlet
  ],
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'frontEnd';
  message: any;
  constructor(private apiService: ApiService) { };
  ngOnInit() {
    this.apiService.getMessage().subscribe(data => {
      this.message = data;
    });
  }
}
