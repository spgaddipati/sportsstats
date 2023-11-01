import { Component , OnChanges, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
const API_KEY = "e8067b53"
@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges, OnInit {
  @Input() rating = 5;
  starWidth = 500;

  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedMovie: any = "";
  cururl:string;
  shownav:boolean = true;
  pageTitle = 'Sports Stats';
  loading = true;
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();
    constructor(private router: Router, private http: HttpClient) {
     router.events.subscribe((routerEvent: Event) => {
       this.checkRouterEvent(routerEvent);
     });
    }
    onSelected() {
      this.selectedMovie = this.selectedMovie;
      this.router.navigateByUrl(this.cururl+"/" + this.selectedMovie.Title)
    }

    displayWith(value: any) {
      return value?.Title;
    }

    clearSelection() {
      this.selectedMovie = "";
      this.filteredMovies = [];
    }
    ngOnInit() {

      this.searchMoviesCtrl.valueChanges
        .pipe(
          filter(res => {
            return res !== null && res.length >= this.minLengthTerm
          }),
          distinctUntilChanged(),
          debounceTime(1000),
          tap(() => {
            this.errorMsg = "";
            this.filteredMovies = [];
            this.isLoading = true;
          }),
          switchMap(value => this.http.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
          )
        )
        .subscribe((data: any) => {
          if (data['Search'] == undefined) {
            this.errorMsg = data['Error'];
            this.filteredMovies = [];
          } else {
            this.errorMsg = "";
            this.filteredMovies = data['Search'];
          }
          console.log(this.filteredMovies);
        });
    }
  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
  }
  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
      this.cururl = "/" + this.router.url.split("/")[1];
      this.shownav = this.cururl == "/welcome" ? false:true;
    }
  }
  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }
}
