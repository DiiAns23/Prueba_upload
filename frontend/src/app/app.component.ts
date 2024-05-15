import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestServiceService } from './services/rest/rest-service.service'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  progress = 0;

  constructor(private uploadService: RestServiceService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.uploadService.uploadFile(file).subscribe(progress => {
        this.progress = progress;
      });
    }
  }
}
