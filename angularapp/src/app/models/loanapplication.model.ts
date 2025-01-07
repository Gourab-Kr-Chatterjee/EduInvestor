import { Loan } from "./loan.model";
import { User } from "./user.model";

export interface LoanApplication{
    loanApplicationId?: number;
    submissionDate?: Date;
    institution ?: string;
    course?: string;
    tuitionFee?: number;
    loanStatus?:number;
    address?: string;
    file?: string;
    user?: User;
    loan?:Loan;
}