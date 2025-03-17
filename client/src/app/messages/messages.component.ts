import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationExtras, RouterModule } from '@angular/router';
import { Message } from '@app/_models/message';
import { MessageService } from '@app/_services/message.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimeagoModule } from 'ngx-timeago';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-messages',
  imports: [ButtonsModule, FormsModule, TimeagoModule, PaginationModule, RouterModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messageService = inject(MessageService);
  router = inject(Router);
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;
  isOutbox = this.container === 'Outbox';

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container);
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: _ => {
        this.messageService.paginatedResult.update(prev => {
          if (prev && prev.items) {
            prev.items.splice(prev.items.findIndex(m => m.id === id), 1);
            return prev;
          }
          return prev;
        })
      }
    })
  }

  getRoute(message: Message) {
    if (this.container === 'Outbox') return `/members/${message.recipientUsername}`;
    else return `/members/${message.senderUsername}`;
  }

  navigateToRoute(message: Message) {
    const navigationExtras: NavigationExtras = {
      queryParams: { tab: 'Messages' }
    };
    this.router.navigate([this.getRoute(message)], navigationExtras);
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
}