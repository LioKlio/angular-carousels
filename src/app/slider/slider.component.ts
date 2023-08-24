import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() slides: any[] = [];
  @Input() title: string = '';

  @ViewChild('slidesContainer') slidesContainer: ElementRef;

  visibleSlides: number = 6;
  slideWidth: number = 0;
  currentIndex: number = 0;

  constructor(private elementRef: ElementRef) {
    this.slidesContainer = new ElementRef(null);
  }  
  
  
  ngOnInit(): void {
    this.visibleSlides = window.innerWidth <= 768 ? 3 : 6;

    window.addEventListener('scroll', () => {
      this.lazyLoadImages();
    });
  }
  ngAfterViewInit() {
    this.slideWidth = this.slidesContainer.nativeElement.offsetWidth / this.visibleSlides;
    this.lazyLoadImages();
  }

  scrollLeft() {
    if (this.currentIndex > 0) {
      const newIndex = this.currentIndex - this.visibleSlides;
      this.currentIndex = newIndex < 0 ? 0 : newIndex;
      this.slidesContainer.nativeElement.scrollTo({
        left: this.currentIndex * this.slideWidth,
        behavior: 'smooth'
      });
    }
  }

  scrollRight() {
    if (this.currentIndex < this.slides.length - this.visibleSlides) {
      const newIndex = this.currentIndex + this.visibleSlides;
      const maxIndex = this.slides.length - 1;
      this.currentIndex = newIndex > maxIndex ? maxIndex : newIndex;
      this.slidesContainer.nativeElement.scrollTo({
        left: this.currentIndex * this.slideWidth,
        behavior: 'smooth'
      });
    }
  }

  lazyLoadImages() {
    const images = this.slidesContainer.nativeElement.querySelectorAll('img');
    const options = {
      root: this.slidesContainer.nativeElement,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc && img.getBoundingClientRect().top <= window.innerHeight) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
            }
          }
        });
      },
      options
    );

    images.forEach((image: HTMLImageElement) => {
      observer.observe(image);
    });
  }
}