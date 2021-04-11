import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switching-instructions',
  templateUrl: './switching-instructions.component.html',
  styleUrls: ['./switching-instructions.component.css']
})
export class SwitchingInstructionsComponent implements OnInit {
  instructionText: string;
  instructionElement: string;
  
  instructions =  [
    { id: 11, name: 'ADD', status: "UNEXECUTED" },
    { id: 12, name: 'OPEN', status: "UNEXECUTED" },
    { id: 13, name: 'CLOSE' , status: "UNEXECUTED"},
    { id: 14, name: 'OPEN', status: "UNEXECUTED" },
    { id: 16, name: 'CLOSE', status: "UNEXECUTED" },
    { id: 17, name: 'CLOSE', status: "UNEXECUTED" },
    { id: 20, name: 'REMOVE', status: "UNEXECUTED" }
  ];
  selectedId: number;

  constructor() {
    this.selectedId = -1;
    this.instructionText="";
    this.instructionElement="";
   }

  ngOnInit(): void {

  }
  createNewInstruction(){
    this.instructions.push({id: 26, name: this.instructionText + " " + this.instructionElement, status: "UNEXECUTED"});
    this.resetModal();
  }
  executeInstruction(){
    let item = this.instructions.find(i => i.id === this.selectedId);
    if(item){
      item.status = "EXECUTED";
    }
    this.selectedId = -1;
  }
  deleteInstruction(){
    if(this.selectedId!=-1){
      let idx = this.instructions.findIndex(i => i.id == this.selectedId);   
      this.instructions.splice(idx,1); 
      this.selectedId = -1;
    }
  }
  deleteAllInstructions(){
    this.instructions = [];
  }
  onSelect(instructionId:number){
    this.selectedId = instructionId;
  }
  resetModal(){
    this.instructionElement = "";
    this.instructionText = "";
  }
}
