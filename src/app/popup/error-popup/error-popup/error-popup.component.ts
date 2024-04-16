import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent implements OnInit {

  @Input() message: string = 'Ocorreu um erro!';

  constructor() { }

  ngOnInit(): void {
  }

}
