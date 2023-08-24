import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sliders: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchSliderData();
  }

  fetchSliderData(): void {
    const apiUrl = 'https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee';

    this.http.get(apiUrl).subscribe((response: any) => {
      this.sliders = response.data.category.frontPage;
    });
  }
}