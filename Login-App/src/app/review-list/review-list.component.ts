import { Component, OnInit } from '@angular/core';
import { ReviewService, AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviews = [];
  currentUser: any;
  constructor(
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService) {
      this.currentUser = this.authenticationService.currentUserValue;
     }

  ngOnInit() {
    this.loadAllReviews();
  }
  private loadAllReviews() {
    this.reviewService.getAllReviews()
        .pipe(first())
        .subscribe(reviews => this.reviews = reviews);
  }
}
