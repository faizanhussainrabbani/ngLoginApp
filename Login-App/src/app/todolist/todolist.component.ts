import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReviewService, AuthenticationService } from '../_services';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  currentUser: any;
  reviews = [];

  postReviewForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit() {
    this.loadAllReviews();
    this.postReviewForm = this.formBuilder.group({
      review: ['', Validators.required],
      rating: ['', Validators.required],
      user: ''
  });
  }
  get f() { return this.postReviewForm.controls; }

  private loadAllReviews() {
    this.reviewService.getAllReviews()
        .pipe(first())
        .subscribe(reviews => this.reviews = reviews);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.postReviewForm.invalid) {
        return;
    }
    this.postReviewForm.value.user = this.currentUser.firstName;
    this.loading = true;
    this.reviewService.createReview(this.postReviewForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/'] /*, { queryParams: { registered: true }}*/);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }
}
