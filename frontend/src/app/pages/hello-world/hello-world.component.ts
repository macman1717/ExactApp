import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css'
})
export class HelloWorldComponent {
  title = 'Hello World';
  message: any;
  constructor(private apiService: ApiService) { };
  ngOnInit() {
    this.apiService.getHelloWorld().subscribe(data => {
      this.message = data;
    });
  }
}
