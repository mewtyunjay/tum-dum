import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SlickCarouselComponent } from "ngx-slick-carousel";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  @ViewChild("slickCarousel", { static: false })
  slickCarousel!: SlickCarouselComponent;
  constructor(private http: HttpClient) {}
  // slideConfig = {
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   dots: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };
  restaurants = [
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
    {
      image: "../../assets/Images/graphics (1).png",
      name: "Chinese Wok",
      rating: "4.3",
      time: "35-40 mins",
      details: "Chinese, Asian, Tibetan, Desserts",
      location: "Adigodi",
    },
  ];
  ngOnInit(): void {}
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    arrows: false,
    // nextArrow:
    //   '<button class="slick-next" style="color: red !important">Next</button>',
    // prevArrow: '<button class="slick-prev">Prev</button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
    ],
  };

  navigatePrev() {
    this.slickCarousel.slickPrev();
  }

  navigateNext() {
    this.slickCarousel.slickNext();
  }
}
