import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  apiUrl:string=environment.backendUrl+'/api';

  constructor(private http: HttpClient) { }
  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  sendFeedback(feedback: any): Observable<any> {
    console.log(feedback);
    return this.http.post(this.apiUrl+'/feedback',feedback, { headers: this.getAuthHeaders() });
  }
  getAllFeedbacksByUserId(userId:number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback/user/${userId}`,{ headers: this.getAuthHeaders() });
  }
  deleteFeedback(feedbackId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/feedback/${feedbackId}`,{ headers: this.getAuthHeaders() });
  }


  deleteFeedbackByUser(feedbackId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/feedback/user/${feedbackId}`,{ headers: this.getAuthHeaders() });
  }
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl+'/feedback',{ headers: this.getAuthHeaders() });
  }


}