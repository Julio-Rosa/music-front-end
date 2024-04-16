import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent implements OnInit {
  @Input() message: string = 'Sucesso!';

  constructor() { }

  ngOnInit(): void {
  }

}
