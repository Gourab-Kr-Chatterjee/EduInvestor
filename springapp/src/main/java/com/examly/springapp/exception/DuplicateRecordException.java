package com.examly.springapp.exception;

public class DuplicateRecordException extends RuntimeException {
    public DuplicateRecordException(String message){
        super(message);
    }
    
}
