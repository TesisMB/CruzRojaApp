
import { Component, Input, OnInit } from '@angular/core';
import { Volunteer } from 'src/app/models/Volunteer';

@Component({
  selector: 'app-volunteerlayout',
  templateUrl: './volunteerlayout.component.html',
  styleUrls: ['./volunteerlayout.component.css'],
})

export class LayoutComponent implements OnInit {
  @Input() volunteers: Volunteer;
  constructor() { }

  ngOnInit() {}

}
