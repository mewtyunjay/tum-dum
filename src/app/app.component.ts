import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AppService } from './services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // revisitForm: FormGroup;
  // isLoading: boolean = false;
  // blogDetails: any;
  // constructor(
  //   private formBuilder: FormBuilder,
  //   private router: Router,
  //   private http: HttpClient,
  //   private sanitizer: DomSanitizer,
  //   private firestore: AngularFirestore,
  //   private storage: AngularFireStorage,
  //   private appService: AppService
  // ) {
  //   this.revisitForm = this.formBuilder.group({
  //     name: ['', [Validators.required]],
  //     email: ['', [Validators.required]],
  //     contact: ['', [Validators.required]],
  //     state: ['', [Validators.required]],
  //   });
  //   this.youtubeVideos = this.youtubeVideos.map((video: any) => ({
  //     ...video,
  //     safeLink: this.sanitizer.bypassSecurityTrustResourceUrl(video.link),
  //   }));
  // }
  // instaPosts: any = [
  //   {
  //     instaSrc: '../assets/Images/laguardia.jpg',
  //     title: 'Laguardia, Rioja Alavesa',
  //     instaPara:
  //       'My Cousin Nathan from Bolsena, Italy joined Mrs. Kay and I for a fantastic day in Rioja. We visited a medievel winery, Bottega El Fabulista in Laguardia . Then we went ultra modern an visited Bai Gorri. Fantastic tasting of world class wine in a worldclass region.',
  //   },
  //   {
  //     instaSrc: '../assets/Images/sanders.jpg',
  //     title: 'Sanders Family Winery',
  //     instaPara:
  //       'Was able to get by Sanders Family Winery in Pahrump. Its a fantastic drive west from Las Vegas. Julie was a wonderful wine guide. The red ginger drink at the end is a refreshing and unique drink experience.',
  //   },
  //   {
  //     instaSrc: '../assets/Images/dancing apache.jpg',
  //     title: ' Dancing Apache Lodge Weddings & Events',
  //     instaPara:
  //       'DA Ranch is an fantastic venue. I really enjoyed having a picnic while tasting wine. Highly recommend this stop to anyone considering a road trip to the Sedona area.',
  //   },
  //   {
  //     instaSrc: '../assets/Images/douro.jpg',
  //     title: 'Douro Valley, Portugal',
  //     instaPara:
  //       'Wine tasting in the Douro Valley today was a great experience! River boating down the Douro River was a dream experience. Thanks to Viera de Sousa for presenting such quality wines.Evidently I like ruby port. Who knew!?!',
  //   },
  //   {
  //     instaSrc: '../assets/Images/laguardia.jpg',
  //     title: 'Laguardia, Rioja Alavesa',
  //     instaPara:
  //       'My Cousin Nathan from Bolsena, Italy joined Mrs. Kay and I for a fantastic day in Rioja. We visited a medievel winery, Bottega El Fabulista in Laguardia . Then we went ultra modern an visited Bai Gorri. Fantastic tasting of world class wine in a worldclass region.',
  //   },
  //   {
  //     instaSrc: '../assets/Images/zorvino.jpg',
  //     title: 'Zorvino vineyards',
  //     instaPara:
  //       'Zorvino is a quaint vineyard in New Hampshire. The Bistro served amazing food. I received a tour of the wine making facility. Dave, Sam and Kerry were very hospitable.',
  //   },
  //   {
  //     instaSrc: '../assets/Images/truro.jpg',
  //     title: 'Truro, Massachusetts',
  //     instaPara:
  //       'Truro Vineyards is a great summer wine tasting adventure, way up towards the end of Cape Cod. Had the fortune of a beautiful day.Make a reservation to be sure you have a table!',
  //   },
  //   {
  //     instaSrc: '../assets/Images/newport.jpg',
  //     title: 'Newport, Rhode Island',
  //     instaPara:
  //       'Newport Vineyards was a happening place today!!! Lots going on.There is something for everyone at this vineyard with an onsite winery, brewery and restaurant. Had an excellent time!',
  //   },
  //   {
  //     instaSrc: '../assets/Images/jonathan.jpg',
  //     title: 'Jonathan Edwards Winery',
  //     instaPara:
  //       'Just spent some time in the small town of North Stonington, CT at J Edwards Winery. Fantastic experience and a must visit if you are in the area. It was a great way to enjoy a lunchtime road stop.',
  //   },
  //   {
  //     instaSrc: '../assets/Images/los milics.jpg',
  //     title: 'Los Milics Vineyards',
  //     instaPara:
  //       'Los Milics was the perfect stop in Scottsdale on a day that reached 115 degrees!!! Matts, the white wine, was the perfect crisp, zippy wine to cool you down. Sean is very knowledgeable and a fellow certified somm!',
  //   },
  //   {
  //     instaSrc: '../assets/Images/gruet.jpg',
  //     title: 'Gruet Santa Fe Tasting Room',
  //     instaPara:
  //       'Sparkling wine in New Mexico, what a find!!!! The quality of wine here is exceptional. The tasting venue is comfortable, and the patio was perfect. Autumn was a great flight attendant. Overall, a must visit when in New Mexico!!!',
  //   },
  //   {
  //     instaSrc: '../assets/Images/bookcliff.jpg',
  //     title: 'BookCliff Vineyards',
  //     instaPara:
  //       'Bookcliff is an award winning winery in Palisade Colorado. It has been in business for 26 years. The vineyard is beautiful, and the tasting experience is relaxing and comfortable Thanks to Kris for guiding us through the wines!!!. ',
  //   },
  //   {
  //     instaSrc: '../assets/Images/ig winery.jpg',
  //     title: 'IG Winery',
  //     instaPara:
  //       'Visited IG Winery. This is a well designed, comfortable tasting room in Cedar City. The wine is well made and I am so glad I made the stop. Michelle was a fantastic. Cedar City is known for getting a Tony Award for its Shakespeare Theatre...who knew.',
  //   },
  // ];
  // youtubeVideos: any = [
  //   {
  //     title: 'Wine tasting at IG Winery in Cedar City, Utah.',
  //     link: 'https://www.youtube.com/embed/GAZK-16CkN0?si=IVFXO-YA6BHRS2v0',
  //   },
  //   {
  //     title: 'Wine tasting in Palisade, Colorado at BookCliff Vineyards.',
  //     link: 'https://www.youtube.com/embed/-EZU5KZ4S0Q?si=gtvbBLrWkXFBoahz',
  //   },
  //   {
  //     title:
  //       'Wine tasting in Arizona at D A Ranch. See the venue, the experience and the wines.',
  //     link: 'https://www.youtube.com/embed/r3T0BI-S9Ks?si=f-44-VGgLRbyUxAL',
  //   },
  //   {
  //     title: 'Champagne Tasting in Beautiful Santa Fe!',
  //     link: 'https://www.youtube.com/embed/zJE0BM6fvHU?si=iUm9rcf-Vpjge2mQ"',
  //   },
  //   {
  //     title: 'Wine tasting at IG Winery in Cedar City, Utah',
  //     link: 'https://www.youtube.com/embed/GAZK-16CkN0?si=IVFXO-YA6BHRS2v0',
  //   },
  //   {
  //     title: 'Wine tasting in Palisade, Colorado at BookCliff Vineyards',
  //     link: 'https://www.youtube.com/embed/-EZU5KZ4S0Q?si=gtvbBLrWkXFBoahz',
  //   },
  //   {
  //     title:
  //       'Wine tasting in Arizona at D A Ranch. See the venue, the experience and the wines.',
  //     link: 'https://www.youtube.com/embed/r3T0BI-S9Ks?si=f-44-VGgLRbyUxAL',
  //   },
  //   {
  //     title: 'Champagne Tasting in Beautiful Santa Fe!',
  //     link: 'https://www.youtube.com/embed/zJE0BM6fvHU?si=iUm9rcf-Vpjge2mQ',
  //   },
  //   {
  //     title: 'Wine tasting in Palisade, Colorado at BookCliff Vineyards.',
  //     link: 'https://www.youtube.com/embed/-EZU5KZ4S0Q?si=gtvbBLrWkXFBoahz',
  //   },
  //   {
  //     title:
  //       'Wine tasting in Arizona at D A Ranch. See the venue, the experience and the wines.',
  //     link: 'https://www.youtube.com/embed/r3T0BI-S9Ks?si=f-44-VGgLRbyUxAL',
  //   },
  // ];
  // ngOnInit(): void {
  //   this.getBlogList();
  // }
  // title = 'cowboy-somm-frontend';
  // slideConfig = {
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   nextArrow:
  //     '<button class="slick-next" style="color: red !important">Next</button>',
  //   prevArrow: '<button class="slick-prev">Prev</button>',
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         // dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         // dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         // dots: true,
  //       },
  //     },
  //   ],
  // };
  // navigateToAbout() {
  //   window.scroll({ top: 0, behavior: 'smooth' });
  // }
  // goToAbout() {
  //   window.scroll({ top: 2100, behavior: 'smooth' });
  // }
  // slideConfig2 = {
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   nextArrow: '<button class="slick-next"">Next</button>',
  //   prevArrow: '<button class="slick-prev">Prev</button>',
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         // dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         // dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         // dots: true,
  //       },
  //     },
  //   ],
  // };
  // onRevisitClubSubmit() {
  //   // this.isLoading = true;
  //   let fd = {
  //     name: this.revisitForm.value['name'] || 'null',
  //     email: this.revisitForm.value['email'] || 'null',
  //     contact: this.revisitForm.value['contact'] || 'null',
  //     state: this.revisitForm.value['state'] || 'null',
  //   };
  //   console.log('revisitClub', fd);
  //   this.firestore
  //     .collection('revisitClub')
  //     .add(fd)
  //     .then(() => {
  //       this.revisitForm.reset();
  //       console.log('revisitClub Data saved successfully!');
  //     })
  //     .catch((error: any) => {
  //       console.error('Error saving data: ', error);
  //     });
  //   // this.isLoading = false;
  // }
  // getBlogList() {
  //   this.appService.getBlogDetails().subscribe((res: any) => {
  //     // Assuming `res` is an array of blog details with a `url` property for YouTube links
  //     this.blogDetails = res?.map((video: any) => ({
  //       ...video,
  //       safeLink: this.sanitizer.bypassSecurityTrustResourceUrl(
  //         `https://www.youtube.com/embed/${this.extractYouTubeId(video.url)}`
  //       ),
  //     }));
  //     console.log('this.blogDetails', this.blogDetails);
  //   });
  // }
  // // Helper method to extract YouTube ID from a URL
  // private extractYouTubeId(url: string): string {
  //   const regExp =
  //     /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  //   const match = url.match(regExp);
  //   return match && match[1] ? match[1] : '';
  // }
  // // getName() {
  // //   this.revisitForm.get('name');
  // // }
  // // getEmail() {
  // //   this.revisitForm.get('email');
  // // }
  // // getContact() {
  // //   this.revisitForm.get('contact');
  // // }
  // // getState() {
  // //   this.revisitForm.get('state');
  // // }
}
