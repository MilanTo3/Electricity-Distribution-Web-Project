import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { TableComponentComponent } from 'src/app/Components/admin-profile-requests/table-component/table-component.component';
import { HistoryStateChange } from '../../../../Models/HistoryStateChange.model';

@Component({
  selector: 'app-history-state-changes',
  templateUrl: './history-state-changes.component.html',
  styleUrls: ['./history-state-changes.component.css']
})
export class HistoryStateChangesComponent implements OnInit, AfterViewInit {

  @ViewChild(TableComponentComponent, {static: false}) table: TableComponentComponent;
  stateArray: HistoryStateChange[] = [];

  constructor() { }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(){
    if(sessionStorage.getItem("historyStateForm") !== null){
      let addedStates = JSON.parse(sessionStorage.getItem("historyStateForm"));
      this.stateArray = this.stateArray.concat(addedStates);
      this.table.dataBind.data = this.table.dataBind.data.concat(this.stateArray);
    }
  }

  addState(state: number){
  
    let item;
    if(state === 0){
      item = new HistoryStateChange('Pera', 'Peric', new Date(2003, 12, 21, 23, 22, 24), 'State changed to canceled.');
    }else if(state === 1){
      item = new HistoryStateChange('Pera', 'Peric', new Date(2003, 12, 21, 23, 22, 24), 'State changed to denied.');
    }else{
      item = new HistoryStateChange('Pera', 'Peric', new Date(2003, 12, 21, 23, 22, 24), 'State changed to approved');
    }

    this.stateArray.push(item);
    sessionStorage.setItem("historyStateForm", JSON.stringify(this.stateArray));
    this.table.dataBind.data.push(item);
    this.table.dataBind.data = this.table.dataBind.data; // Why does this work, i mean like wut. Just wut.

  }

}
