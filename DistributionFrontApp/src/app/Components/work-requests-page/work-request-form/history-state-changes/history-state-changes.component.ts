import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponentComponent } from 'src/app/Components/admin-profile-requests/table-component/table-component.component';
import { HistoryStateChange } from '../../../../Models/HistoryStateChange.model';

@Component({
  selector: 'app-history-state-changes',
  templateUrl: './history-state-changes.component.html',
  styleUrls: ['./history-state-changes.component.css']
})
export class HistoryStateChangesComponent implements OnInit, AfterViewInit {

  @ViewChild(TableComponentComponent, { static: false }) table: TableComponentComponent;
  stateArray: HistoryStateChange[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (sessionStorage.getItem("historyStateForm") !== null) {
      let addedStates = JSON.parse(sessionStorage.getItem("historyStateForm"));
      this.stateArray = this.stateArray.concat(addedStates);
      this.table.dataToPrint = this.stateArray;
      this.table.dataBind.data = this.table.dataToPrint;
    } else if(this.table.dataBind.data.length == 0){
      let item = new HistoryStateChange('Pera', 'Peric', new Date(), 'State changed to canceled.');
      this.table.dataBind = new MatTableDataSource(this.table.dataToPrint);
      this.table.keyNames = Object.getOwnPropertyNames(item);
      this.table.enableView();
    }

  }

  addState(state: number) {

    let item;
    if (state === 0) {
      item = new HistoryStateChange('Pera', 'Peric', new Date(), 'State changed to canceled.');
    } else if (state === 1) {
      item = new HistoryStateChange('Pera', 'Peric', new Date(), 'State changed to denied.');
    } else {
      item = new HistoryStateChange('Pera', 'Peric', new Date(), 'State changed to approved');
    }

    this.stateArray.push(item);
    sessionStorage.setItem("historyStateForm", JSON.stringify(this.stateArray));
    this.table.dataToPrint.push(item);
    this.table.dataBind.data = this.table.dataBind.data;

  }

}
