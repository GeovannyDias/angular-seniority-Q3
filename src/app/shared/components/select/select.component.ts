import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItemI } from "./models/select.model";

const CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = "";
  @Input() placeholder: string = ""; // + required = true
  @Input() required: boolean = false;
  @Input() data: SelectItemI[] = [];
  field: string | any = '';
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
