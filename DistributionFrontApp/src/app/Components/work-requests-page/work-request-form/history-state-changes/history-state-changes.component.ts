import { ToastrService } from 'ngx-toastr';
import { WorkPlanServiceService } from './../../../../Services/work-plan-service.service';
import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponentComponent } from 'src/app/Components/admin-profile-requests/table-component/table-component.component';
import { WorkRequestServiceService } from 'src/app/Services/work-request-service.service';
import { HistoryStateChange } from '../../../../Models/HistoryStateChange.model';

@Component({
  selector: 'app-history-state-changes',
  templateUrl: './history-state-changes.component.html',
  styleUrls: ['./history-state-changes.component.css']
})
export class HistoryStateChangesComponent implements OnInit, AfterViewInit {

  @ViewChild(TableComponentComponent, { static: false }) table: TableComponentComponent;
  stateArray: HistoryStateChange[] = [];
  editMode = false;
  current: string;

  constructor(private wr: WorkRequestServiceService, private wp: WorkPlanServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {

    let id = sessionStorage.getItem('idDoc');
    if (id !== null) {
      this.editMode = true;
      if (id.startsWith('WR')) {
        this.wr.getStatus(id).subscribe(
          res => {
            if (res !== null) {
              this.current = res["status"];
            }
          }
        );
      } else if (id.startsWith('WP')) {
        this.wp.getStatus(id).subscribe(
          res => {
            if (res !== null) {
              this.current = res["status"];
            }
          }
        );
      }

    }
    this.stateArray = this.table.dataToPrint;

  }

  saveChanges() {

    let id = sessionStorage.getItem("idDoc");
    if (id.startsWith('WR')) {
      this.wr.updateHistoryState(this.stateArray, id).subscribe(
        res => {
          this.toastr.success('Updated history of the document', 'Yas!');
          console.log(res);
        }
      );
    }
    else if (id.startsWith('WP')) {
      this.wp.updateHistoryState(this.stateArray, id).subscribe(
        res => {
          this.toastr.success('Updated history of the document', 'Yas!');
        }
      );
    }
  }

  addState(state: number) {

    if (this.current === "Canceled" || this.current === "Approved") {
      this.toastr.warning("The document state cant be changed further.", "Cant change further.");
      return;
    }

    let item;
    let username = JSON.parse(sessionStorage.getItem('loggedUser')).username;
    let id = sessionStorage.getItem("idDoc");
    if (state === 0) {
      item = new HistoryStateChange(id, username, new Date(), 'State changed to canceled.');
      this.current = "Canceled";
    } else if (state === 1) {
      item = new HistoryStateChange(id, username, new Date(), 'State changed to denied.');
      this.current = "Denied";
    } else {
      item = new HistoryStateChange(id, username, new Date(), 'State changed to approved.');
      this.current = "Approved";
    }

    this.stateArray.push(item);
    this.table.keyNames = Object.getOwnPropertyNames(item);
    this.table.dataBind.data = this.stateArray;
    this.table.enableView();
  }

}
