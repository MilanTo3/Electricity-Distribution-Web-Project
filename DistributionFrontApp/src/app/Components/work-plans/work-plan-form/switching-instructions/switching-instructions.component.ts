import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
import { customFormValidators } from '../../../../Models/customValidators';

@Component({
  selector: 'app-switching-instructions',
  templateUrl: './switching-instructions.component.html',
  styleUrls: ['./switching-instructions.component.css']
})
export class SwitchingInstructionsComponent implements OnInit {
  instructionText: string;
  instructionElement: string;

  instructionsForm : FormArray;
  instructions =  [
  ];
  index = this.instructions.length +1;
  selectedId: number;

  WPSwitchingInstuctionsForm = this.formBuilder.group({
    items: this.formBuilder.array([]) //this.createInstruction()
  });

  constructor(private formBuilder: FormBuilder) {
    this.selectedId = -1;
    this.instructionText="";
    this.instructionElement="";
   }
 

  ngOnInit(): void {
    if (sessionStorage.getItem("WPSwitchingInstuctionsForm") !== null) {
      let formdata = JSON.parse(sessionStorage.getItem("WPSwitchingInstuctionsForm"));
      this.createMockInstructions(formdata.items); // moraju se ponovo praviti kontrole i popuniti sa unetim isto kao kad bi popunjavali sa mokovanim vrednostima
      this.updateInstructionsArray(formdata.items);
      this.WPSwitchingInstuctionsForm.setValue(formdata);
    }
    this.onValueChanges();
  }
  onValueChanges(): void {
    this.WPSwitchingInstuctionsForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("WPSwitchingInstuctionsForm", JSON.stringify(this.instructionsForm.value));
      sessionStorage.setItem("WPSwitchingInstuctionsFormValid", JSON.stringify(this.instructionsForm.valid));
      
    })
  } 
  createMockInstructions(instructions){
    instructions.forEach(element => {
      this.instructionsForm = this.WPSwitchingInstuctionsForm.get('items') as FormArray;
      this.instructionsForm.push(this.mockFormArrays(element));
    });
  }

  mockFormArrays(instruction): FormGroup{
    return this.formBuilder.group({
      id: instruction.id,
      name: instruction.name,
      status: instruction.status
    });
  }
  updateInstructionsArray(instructions){ //popunjava se niz instrukcija 
    instructions.forEach(element => {
      this.instructions.push(element);
    });
  }
  createInstruction(): FormGroup {
    return this.formBuilder.group({
      id: '',
      name: '',
      status: ''
    });
  }
  createNewInstruction(){
    let newInstruction = {id: this.index, name: this.instructionText + " " + this.instructionElement, status: "UNEXECUTED"};
    this.index++;
    this.instructions.push(newInstruction);
    this.instructionsForm = this.WPSwitchingInstuctionsForm.get('items') as FormArray;
    this.instructionsForm.push(this.createInstruction());

    this.instructionsForm.controls[this.instructions.length-1].patchValue({ 
      id: this.instructions[this.instructions.length-1].id, name: this.instructions[this.instructions.length-1].name, status: this.instructions[this.instructions.length-1].status
    });
    this.resetModal();
  }
  executeInstruction(){
    let item = this.instructions.find(i => i.id === this.selectedId);
    let index:number;
    if(item){
      item.status = "EXECUTED";
      index = this.instructions.indexOf(item);
      this.instructionsForm.controls[index].patchValue({ 
        id: item.id, name: item.name, status: item.status
      });
    }
    this.selectedId = -1;
  }
  deleteInstruction(){
    if(this.selectedId!=-1){
      let idx = this.instructions.findIndex(i => i.id == this.selectedId);   
      this.instructions.splice(idx,1); 
      this.instructionsForm.removeAt(idx); //remove from formArray
      this.selectedId = -1;
    }
  }
  deleteAllInstructions(){
    this.instructions = [];
    this.instructionsForm.clear();
    this.index = 1;
  }
  onSelect(instructionId:number){
    this.selectedId = instructionId;
    console.log(this.selectedId);
  }
  resetModal(){
    this.instructionElement = "";
    this.instructionText = "";
  }
}
