import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = "";
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  @Input() required: boolean = false;
  @Input() minlength: number | string = "";
  @Input() maxlength: number | string = "";

  field: string | number | boolean | any = '';
  isDisabled: boolean = false;

  onChangeFn = (_?: any) => { };
  onTouchedFn = () => { };

  constructor() { }
  ngOnInit(): void { }

  writeValue(value: any): void {
    this.field = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


}
