import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getAllReviews() {
    return this.http.get<any[]>(`http://localhost:4000/reviews`);
  }
  createReview(review) {
    return this.http.post(`http://localhost:4000/reviews/create`, review);
  }
}
