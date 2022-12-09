import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalConfigI } from '../../models/modal-config.model';
import { PlayerService } from '../../services/player/player.service';
import { environment } from "../../../../../environments/environment";
import { PlayerI } from '../../models/player.model';
import { PositionService } from '../../services/position/position.service';
// import { PositionI } from '../../models/position.model';
import { SelectItemI } from 'src/app/shared/components/select/models/select.model';

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.component.html',
  styleUrls: ['./home-modal.component.scss']
})
export class HomeModalComponent implements OnInit {
  @ViewChild('myModal', { static: true }) modal!: ElementRef;
  @Output() closeOutput = new EventEmitter<boolean>();
  title: string = 'Agregar Jugador';
  formPlayer: FormGroup;
  authorId: number = environment.authorId;
  positionList: SelectItemI[] = [];

  // image: string = 'https://media.canalnet.tv/2020/08/leomessi.jpg';
  // image: string = 'https://files.lafm.com.co/assets/public/2019-06/messi.jpg';
  // image: string = '';


  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private positionService: PositionService,
  ) {
    this.formPlayer = this.initForm();
  }

  ngOnInit(): void {
    console.log('Modal → ngOnInit');
    this.getPositions();
  }

  ngOnDestroy(): void {
    console.log('Modal → ngOnDestroy');
  }

  open(refParams?: ModalConfigI) {
    this.modal.nativeElement.style.display = 'block';
    console.log(refParams);
    if (refParams?.data?.action === 'update') {
      this.loadData(refParams?.data?.data)
    }
  }

  close(ref?: any) {
    this.modal.nativeElement.style.display = 'none';
    this.closeOutput.emit(ref);
    this.formPlayer.reset();
  }

  initForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      image: ['', Validators.required],
      attack: [0, Validators.required],
      defense: [0, Validators.required],
      skills: [0, Validators.required],
      idAuthor: [this.authorId, Validators.required],
      idPosition: ['', Validators.required]
    });
  }

  get firstName() { return this.formPlayer.get('firstName') as FormControl; }
  get lastName() { return this.formPlayer.get('lastName') as FormControl; }
  get image() { return this.formPlayer.get('image') as FormControl; }
  get attack() { return this.formPlayer.get('attack') as FormControl; }
  get defense() { return this.formPlayer.get('defense') as FormControl; }
  get skills() { return this.formPlayer.get('skills') as FormControl; }
  get idPosition() { return this.formPlayer.get('idPosition') as FormControl; }


  getPositions() {
    this.positionService.getPositions().subscribe(res => {
      console.log(res);
      this.positionList = res.map(position => {
        const { id, description } = position;
        return { value: id, label: description };
      });
      console.log('selectItem:', this.positionList);
    });
  }

  getPositionById(id: number) {
    this.positionService.getPositionById(id).subscribe(res => {
      console.log(res);
    });
  }

  validateForm() {
    console.log(this.formPlayer.value);
    if (this.formPlayer.valid) {
      this.postPlayer();
    }
  }


  postPlayer() {
    this.cleanForm(this.formPlayer);
    const data = this.formPlayer.value;
    this.playerService.postPlayer(data).subscribe(res => {
      console.log('POST:', res);
      this.close(true);
    });
  }

  cleanForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const value = typeof formGroup.get(key)?.value === 'string' ? formGroup.get(key)?.value.trim() : formGroup.get(key)?.value;
      formGroup.get(key)?.setValue(value);
    });
  }

  loadData(data: PlayerI) {
    let _data = { ...data };
    delete _data.id;
    this.formPlayer.patchValue(_data)
  }


}
