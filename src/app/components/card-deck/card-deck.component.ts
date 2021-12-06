import { Component, OnInit, Input } from '@angular/core';
import { Nutriologo } from 'src/app/models/nutriologo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.css']
})
export class CardDeckComponent implements OnInit {
  @Input() clientes:any[]=[];

  constructor(
    private authService: AuthService
  ) { }
  

  ngOnInit(): void {

    
  }

}
