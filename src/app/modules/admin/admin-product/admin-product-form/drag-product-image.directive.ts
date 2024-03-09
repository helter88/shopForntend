import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragProductImageDirective {

  @Output() files: EventEmitter<FileList> = new EventEmitter();

  @HostBinding("style.background") private bg = "rgb(233 213 255)";

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.bg = "rgb(192 132 252)";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.bg = "rgb(233 213 255)";
  }
  
  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.bg = "rgb(233 213 255)";

    const fileList = evt.dataTransfer?.files ;
    this.files.emit(fileList);
  }

}
