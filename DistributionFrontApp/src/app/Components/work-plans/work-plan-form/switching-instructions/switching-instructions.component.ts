import { WorkPlanServiceService } from 'src/app/Services/work-plan-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
import { customFormValidators } from '../../../../Models/customValidators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-switching-instructions',
  templateUrl: './switching-instructions.component.html',
  styleUrls: ['./switching-instructions.component.css']
})
export class SwitchingInstructionsComponent implements OnInit {
  instructionText: string;
  instructionElement: string;
  editMode = false;
  instructionsForm : FormArray;
  instructions =  [
  ];
  index = this.instructions.length +1;
  response :any;
  WPSwitchingInstuctionsForm = this.formBuilder.group({
    items: this.formBuilder.array([]) //this.createInstruction()
  });

  constructor(private formBuilder: FormBuilder, private wp: WorkPlanServiceService, private toastr: ToastrService ) {
    this.instructionText="";
    this.instructionElement="";
   }
 

  ngOnInit(): void {
    if(sessionStorage.getItem("idDoc") !== null){
      this.getAndFill(sessionStorage.getItem("idDoc"));
      this.editMode = true;
    }
    
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

  getAndFill(id){

     this.wp.getSwitchingInstructionsWP(id).subscribe(
      res => {       
        this.createMockInstructions(res); // moraju se ponovo praviti kontrole i popuniti sa unetim isto kao kad bi popunjavali sa mokovanim vrednostima
        this.updateInstructionsArray(res);
      }
    ); 
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
      deviceId: instruction.deviceId,
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
      id: '0', // kad se salje mora biti popunjen, svakako tamo dobija pravi id
      deviceId: '',//id izabranog device-a
      name: '', // opis instrukcije
      status: '' 
    });
  }
  //1. on click add new instruction 
  // ubacuju se tri kontrole, prva ima id izabranog device-a, druga tekst instrukcije, treca ima status
  createNewInstruction(){
    let newInstruction = {deviceId: this.instructionElement, name: this.instructionText, status: "UNEXECUTED"}; // novi objekat sa tim poljima
    this.instructions.push(newInstruction); // sacuvana instrukcija u obicnom nizu
    this.instructionsForm = this.WPSwitchingInstuctionsForm.get('items') as FormArray;
    this.instructionsForm.push(this.createInstruction()); // ubacuje u WPSwitchingInstuctionsForm -> items -> novi niz tj grupa kontrola

    this.instructionsForm.controls[this.instructions.length-1].patchValue({ 
      deviceId: this.instructions[this.instructions.length-1].deviceId, name: this.instructions[this.instructions.length-1].name, status: this.instructions[this.instructions.length-1].status
    }); // popunjavaju se prethodno ubacene kontrole sa onim sto smo uneli u niz
    this.resetModal();
  }

  executeInstruction(selectedIndex){
   let item = this.instructions[selectedIndex]; 
    if(item){
      item.status = "EXECUTED";
      this.instructionsForm.controls[selectedIndex].patchValue({ 
        deviceId: item.deviceId, name: item.name, status: item.status
      });
    }
  }
  deleteInstruction(selectedIndex){
      this.instructions.splice(selectedIndex,1); 
      this.instructionsForm.removeAt(selectedIndex); //remove from formArray    
  }
  deleteAllInstructions(){
    this.instructions = [];
    this.instructionsForm.clear();
    this.index = 1;
  }

  resetModal(){
    this.instructionElement = "";
    this.instructionText = "";
  }

  saveChanges(){

    let id = sessionStorage.getItem("idDoc");
    //this.instructionsForm.get('documentId').setValue(id);
    this.wp.updateSwitchingInstructions(this.instructionsForm.value, id).subscribe(
      res => {
        this.showToastrSuccess();
      }
    );
  }
  showToastrSuccess(){   
    this.toastr.success('Your changes are successfuly sent.', 'Yay.');
  }

  showToastrWarning(){
    this.toastr.warning('Seems like theres an error with basic information form input. Please check again.', 'Ooops!');
  }

}
