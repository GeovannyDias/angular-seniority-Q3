import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { PlayerI, SearchI } from '../../models/player.model';
import { PlayerService } from '../../services/player/player.service';
import { HomeModalComponent } from '../home-modal/home-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: false }) modal!: HomeModalComponent;
  playerList$: PlayerI[] = [];
  searchValue: string = '';
  searchChanged: Subject<string> = new Subject<string>();
  searchSubs!: Subscription;
  showModal: boolean = false;

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.initSearch();
  }

  ngOnDestroy(): void {
    this.searchSubs.unsubscribe();
  }

  openModal(data?: any, action?: string) {
    this.showModal = true;
    // setTimeout(() => {
      this.modal.open({ width: '15px', data: { action: action ? action : 'new', data: data } });
    // }, 100);
    
  }

  closeModalEventListener(event: boolean) {
    console.log('Event:', event);
    this.showModal = false;
    if (event) {
      this.getPlayers();
    }
  }

  initSearch() {
    this.searchSubs = this.searchChanged
      .pipe(debounceTime(500))
      .subscribe(value => this.searchByName(value));
  }

  searchByName(value: string) {
    const data: SearchI = { search: value };
    this.playerService.postSearchPlayer(data).subscribe(res => {
      console.log('RES:', res);
      this.playerList$ = res;
    });
  }

  onSearch(value: string) {
    this.searchChanged.next(value.trim());
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