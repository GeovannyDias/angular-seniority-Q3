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
