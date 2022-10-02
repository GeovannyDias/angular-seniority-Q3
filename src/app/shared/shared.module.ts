import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { CrashImageDirective } from './directives/crash-image/crash-image.directive';

const customComponents = [
  SliderComponent,
  InputComponent,
  CrashImageDirective,
]

@NgModule({
  declarations: [
    customComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    customComponents
  ]
})
export class SharedModule { }
