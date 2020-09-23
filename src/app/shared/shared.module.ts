import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        BrowserModule,
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule
    ]
})
export class SharedModule { }