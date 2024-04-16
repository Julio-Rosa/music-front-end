import { Component, OnInit, Output, Input , EventEmitter} from '@angular/core';


@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnInit {
  @Input() message: string = 'Are you sure you want to delete this item?';
  @Output() confirm: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  showConfirm(){
   
    this.confirm.emit();

  }

  showCancel(){
    
    this.cancel.emit();
  }

}
