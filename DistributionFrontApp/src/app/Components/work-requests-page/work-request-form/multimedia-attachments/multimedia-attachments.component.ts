import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Localbase from 'localbase'
import { isObservable } from 'rxjs';
import { pictureModel } from '../../../../Models/pictureModel.model';

@Component({
  selector: 'app-multimedia-attachments',
  templateUrl: './multimedia-attachments.component.html',
  styleUrls: ['./multimedia-attachments.component.css']
})
export class MultimediaAttachmentsComponent implements OnInit {

  filePaths: pictureModel[] = [];
  db = new Localbase('db');

  constructor() { }

  ngOnInit(): void {
    this.db.collection('images').get().then(x => {
      let i;
      for (i = 0; i < x.length; i++) {
        this.filePaths.push(x[i]);
      }
    });

  }

  onFileChanged(event: any) {
    let i;
    for (i = 0; i < event.target.files.length; i++) {
      this.imageReader(event.target.files[i]);
    }

  }

  imageReader(file: File) {

    var reader = new FileReader();
    let this_ = this;

    reader.readAsDataURL(file);
    reader.onload = function(e) {
      let item = new pictureModel(file.name, e.target.result);
      if (this_.filePaths.some(x => x.name === file.name || x.picture === e.target.result) === false) {
        this_.filePaths.push(item);
        this_.db.collection('images').add(item, file.name);
        this_.db.collection('files').add(file, file.name);
      }
    }

  }

  fileDelete(index: number) {

    let itemName = this.filePaths[index].name;
    this.filePaths.splice(index, 1);
    this.db.collection('images').doc(itemName).delete();
    this.db.collection('files').doc(itemName).delete();

  }

}