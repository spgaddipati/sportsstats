import { Component,OnInit,Input } from '@angular/core';
import { MLBTeams } from '../API/isr';
import { MLBService } from '../API/mlb.service';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { of } from 'rxjs';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
const API_KEY = "e8067b53"
@Component({
  selector: 'app-mlb',
  templateUrl: './mlb.component.html',
  styleUrls: ['./mlb.component.css']
})
export class MlbComponent implements OnInit{

  mlbteams:any;
  observableMLBTeams: Observable<MLBTeams[]>
  mlbTeams: MLBTeams[] = [];
  pageTitle = 'MLB Teams';

  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedMovie: any = "";
  @Input() data ="";
  constructor(private route: Router,private mlbisrservice:MLBService, private http: HttpClient) {}
  onSelected() {
    console.log(this.selectedMovie);
    this.selectedMovie = this.selectedMovie;
  }

  displayWith(value: any) {
    return value?.Title;
  }

  clearSelection() {
    this.selectedMovie = "";
    this.filteredMovies = [];
  }
  ngOnInit(): void {

    this.mlbteams = this.mlbisrservice.getMLBTeams();
    this.mlbteams.subscribe(mlbTeamsData => {
      this.mlbTeams = mlbTeamsData.team_all_season.queryResults.row;
    })

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

}
