import { Component } from '@angular/core';
import { AdminMessageService } from '../admin-message.service';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent {

  messages: String[] = [];

  constructor(
    private adminMessageService: AdminMessageService
  ){}

  ngOnInit(){
    this.adminMessageService.subject.subscribe(messages=> this.messages = messages)
  }
  
  closeMessages() {
    this.messages = [];
    this.adminMessageService.clear();
  }

  ngOnDestroy(){
    this.adminMessageService.subject.unsubscribe();
  }
}
