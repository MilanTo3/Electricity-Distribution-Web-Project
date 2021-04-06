import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {

  @Input('tableType') tableid:number = 0;
  keyNames: string[] = [];
  headerToPrint: string[] = [];
  dataToPrint: Array<any> = [];

  constructor() {
    this.addMockRequests();
  }

  addMockRequests(){

    if(this.tableid === 0){
      this.loadProfileRequests();
    }
    
  }

  loadProfileRequests(){
    let object1 = {
      name: "Erik",
      lastname: "Hoffstad",
      email: "erikhoffstad@squirel.com",
      role: "Administrator"

    };

    let object2 = {
      name: "Rukia",
      lastname: "Kuchiki",
      email: "kuchiki123@gmail.com",
      role: "Employed(Data analyst)"

    }

    let object3 = {
      name: "Saitama",
      lastname: "-",
      email: "capedbaldy123@gmail.com",
      role: "Consumer"

    }
    
    this.dataToPrint.push(object1);
    this.dataToPrint.push(object2);
    this.dataToPrint.push(object3);
    this.keyNames = Object.keys(object3);
  }

  ngOnInit(): void{

  }

}
