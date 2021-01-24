import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() company: Company | undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  getCurrentMessage(): string {
    return this.company?.messages[this.company?.messages?.length-1] || '';
  }

  getPastMessages(): string[] {
    return [];
  }
}
