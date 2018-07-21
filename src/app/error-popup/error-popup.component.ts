import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {

  constructor( public thisDialogRef:MatDialogRef<ErrorPopupComponent>) { }

  ngOnInit() {
  }
  onCloseDialog(){
    this.thisDialogRef.close("Close");
  }

}
