import { Component, OnInit } from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-big-slide',
  templateUrl: './big-slide.component.html',
  styleUrls: ['./big-slide.component.css']
})
export class BigSlideComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  constructor() { }

  ngOnInit(): void {
  }
  slideLeft() {
    const slidesContainer = document.getElementById("slides-container") as HTMLElement;
    const slide = document.querySelector(".slide") as HTMLElement;
    const prevButton = document.getElementById("slide-arrow-prev") as HTMLButtonElement;
    prevButton.addEventListener("click", () => {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft -= slideWidth;
    });
  }

  slideRight() {
    const slidesContainer = document.getElementById("slides-container") as HTMLElement;
    const slide = document.querySelector(".slide") as HTMLElement;
    const nextButton = document.getElementById("slide-arrow-next") as HTMLButtonElement;

    nextButton.addEventListener("click", (event) => {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft += slideWidth;
    });
  }
  scrollDown() {
    const target = document.querySelector('#products') as HTMLElement;
    window.scrollTo(0, target.offsetTop);
  }
}
