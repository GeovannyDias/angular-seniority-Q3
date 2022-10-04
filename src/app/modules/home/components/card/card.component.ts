import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerI } from '../../models/player.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() dataPlayer!: PlayerI;
  @Output() setUpdateOutput = new EventEmitter<PlayerI>();
  @Output() setDeleteOutput = new EventEmitter<number>();
  // image = 'https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-03/FEW_S4JXEAc37FV%20%281%29.jpg?itok=ik27RAY5';



  constructor() { }
  ngOnInit(): void {
    // console.log('dataPlayer:', this.dataPlayer);

  }

  updatePlayer(data: PlayerI) {
    this.setUpdateOutput.emit(data);
    
    
  }

  deletePlayer(id?: number) {
    this.setDeleteOutput.emit(id);
  }






}
