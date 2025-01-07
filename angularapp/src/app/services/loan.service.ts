import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {


  apiUrl = environment.backendUrl + '/api';
  constructor(private http: HttpClient) { }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/loan`, { headers: this.getAuthHeaders() });
  }

  deleteLoan(loanId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/loan/${loanId}`, { headers: this.getAuthHeaders() });
  }

  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/loan/loanId?loanId=${id}`, { headers: this.getAuthHeaders() });
  }

  addLoan(requestObject: Loan): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/loan`, requestObject, { headers: this.getAuthHeaders() });
  }

  updateLoan(id: number, requestObject: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/loan/${id}`, requestObject, { headers: this.getAuthHeaders() });
  }

  getAppliedLoans(userId: number): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/loanapplication/user/${userId}`, { headers: this.getAuthHeaders() });

  }

  deleteLoanApplication(loanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/loanapplication/${loanId}`, { headers: this.getAuthHeaders() });
  }

  addLoanApplication(formData: FormData): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.apiUrl}/loanapplication`, formData, { headers: this.getAuthHeaders() });
  }


  getAllLoanApplications(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/loanapplication`, { headers: this.getAuthHeaders() });
  }

  updateLoanStatus(loanId: number, loanApplication: LoanApplication): Observable<LoanApplication> {
    return this.http.put<LoanApplication>(`${this.apiUrl}/loanapplication/${loanId}`, loanApplication, { headers: this.getAuthHeaders() });
  }

  randomImageUrl(): Observable<Blob> {
    const headers = new HttpHeaders({
      'X-Api-Key': 'lh1uPcUIBZvqQQKYSyDCIg==IuL38GNtRaLXcRel',
      'Accept': 'image/jpg'
    });

    return this.http.get('https://api.api-ninjas.com/v1/randomimage?category=abstract', { headers, responseType: 'blob' });
  }

  


}