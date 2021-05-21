import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Localbase from 'localbase'
import { ToastrService } from 'ngx-toastr';
import { isObservable } from 'rxjs';
import { WorkRequestServiceService } from 'src/app/Services/work-request-service.service';
import { pictureModel } from '../../../../Models/pictureModel.model';

@Component({
  selector: 'app-multimedia-attachments',
  templateUrl: './multimedia-attachments.component.html',
  styleUrls: ['./multimedia-attachments.component.css']
})
export class MultimediaAttachmentsComponent implements OnInit {

  filePaths: pictureModel[] = [];
  db = new Localbase('db');
  editMode = false;

  constructor(private wr: WorkRequestServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {

    if (sessionStorage.getItem("idDoc") !== null) {
      this.getAndFill(sessionStorage.getItem("idDoc"));
      this.editMode = true;
    }

    this.db.collection('images').get().then(x => {
      let i;
      for (i = 0; i < x.length; i++) {
        this.filePaths.push(x[i]);
      }
    });

  }

  getAndFill(id) {
    this.wr.getAttachments(id).subscribe(
      res => {
        let i;
        let pic;
        for (i = 0; i < res["length"]; i++) {
          pic = new pictureModel(res[i]["name"], res[i]["picture"]);
          this.filePaths.push(pic);
        }
      });
  }

  downloadImage(index){
    alert('here');
    var url = this.filePaths[index].picture.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
    window.open(url);

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
    reader.onload = function (e) {
      let item = new pictureModel(file.name, e.target.result);
      if (this_.filePaths.some(x => x.name === file.name || x.picture === e.target.result) === false) {
        this_.filePaths.push(item);
        this_.db.collection('images').add(item, file.name);
      }
    }

  }

  fileDelete(index: number) {

    let itemName = this.filePaths[index].name;
    this.filePaths.splice(index, 1);
    this.db.collection('images').doc(itemName).delete();

  }

  async updateAttachments() {

    let formdata = await this.makeFormData();
    this.wr.updateAttachments(formdata).subscribe(
      res => {
        this.toastr.success('Yay! Attachment update successfull.', 'Attachments updated.');
      },
      err => {
        this.toastr.error('Ooops, seems like theres an error uploading your files.', 'Attachments error.');
      }
    );

  }

  async makeFormData() {

    let i;
    let formdata: FormData = new FormData();
    for (i = 0; i < this.filePaths.length; i++) {
      formdata.append('currentFileList', this.filePaths[i].name); // making array currentFileList[jpg1, jpg2, jpg3].
    }
    let files = await this.db.collection('images').get();

    // making array files.
    for (i = 0; i < files.length; i++) {
      formdata.append('stringPicModels', JSON.stringify(files[i]));
    }

    formdata.append('id', sessionStorage.getItem('idDoc'));

    return formdata;
  }

}