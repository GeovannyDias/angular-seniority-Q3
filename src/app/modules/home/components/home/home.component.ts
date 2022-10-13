import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerI } from '../../models/player.model';
import { PlayerService } from '../../services/player/player.service';
import { HomeModalComponent } from '../home-modal/home-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('modal', { static: false }) modal!: HomeModalComponent;
  playerList$: PlayerI[] = [];

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  openModal(data?: any, action?: string) {
    this.modal.open({ width: '15px', data: { action: action ? action : 'new', data: data } });
  }

  closeModalEventListener(event: boolean) {
    console.log('Event:', event);
    if (event) {
      this.getPlayers();
    }
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(res => {
      console.log('PLAYERS:', res);
      this.playerList$ = res;
    });
  }


  updatePlayer(data: PlayerI) {
    console.log(data);
    this.openModal(data, 'update');
  }

  deletePlayer(id?: number) {
    console.log(id);
    this.playerService.deletePlayerById(id).subscribe(() => {
      this.getPlayers();
    });
  }

}



// Manipulando el DOM en Angular de forma segura
// http://blog.enriqueoriol.com/2017/08/angular-dom-renderer.html
// https://blog.enriqueoriol.com/