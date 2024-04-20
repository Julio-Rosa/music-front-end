import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {

  constructor() { }


  formatDateToSend(date:any){
    let day = date.substring(0,2);
    let month = date.substring(3,5);
    let year = date.substring(6,10);
    date = year+"-"+month+"-"+day;
  
    return date;
  
   }


   formatDateToGet(date:any){

    
    let day = date.substring(8,10);
    let month = date.substring(5,7);
    let year = date.substring(0,4);
    date = day+"/"+month+"/"+year;

    return date;
   }
}
