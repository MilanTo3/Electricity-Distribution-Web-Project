import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Call } from 'src/app/Models/Call.model';
import { CallService } from 'src/app/Services/call.service';
import { LocationService } from 'src/app/Services/location.service';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css']
})
export class CallsComponent implements OnInit {

  editMode = false;
  readOnlyMode = false;
  availableCalls: Call[] = [];
  incidentCalls: Call[] = [];
  callIds: number[] = [];

  constructor(private router: Router, private calls: CallService, private locationServ: LocationService) { }

  async ngOnInit(): Promise<void> {

    if(sessionStorage.getItem("idDoc") !== null){
      let readDocId = sessionStorage.getItem("idDocReadOnly");
      if (readDocId!==null && readDocId.substring(0,2)=="IN")
      {
        await this.getAndFill(sessionStorage.getItem("idDocReadOnly"));
        this.readOnlyMode = true;
      }
      else{
        await this.getAndFill(sessionStorage.getItem("idDoc"));
        this.editMode = true;
      }

    }



    let calls: any = await this.calls.GetCalls().toPromise();
    
    if(calls){
      let i;
      for(i = 0; i < calls.length; i++){
        let loc = await this.locationServ.GetLocation(calls[i]["locationId"]).toPromise();
        this.availableCalls.push(new Call(calls[i]["id"], calls[i]["reason"], calls[i]["hazzard"], calls[i]["comment"], loc["street"], loc["priority"]));
      }
    }

    if(sessionStorage.getItem('calls') !== null){
      this.callIds = JSON.parse(sessionStorage.getItem('calls'));
      let i
      for(i = 0; i < this.callIds.length; i++){
        if(this.availableCalls.find(x => x.id === this.callIds[i]) !== null){
          this.incidentCalls.push(this.availableCalls.find(x => x.id === this.callIds[i]));
          this.availableCalls = this.availableCalls.filter(item => item != this.availableCalls.find(x => x.id === this.callIds[i]));
        }
      }
    }

  }

  CreateNewCall() {
    this.router.navigate(['/new-call']);
  }

  drop(event: CdkDragDrop<Call[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        this.callIds = this.incidentCalls.map(a => a.id);
                        sessionStorage.setItem('calls', JSON.stringify(this.callIds));
    }
  }

  async getAndFill(id) {
    
    let res = await this.calls.GetConnectedCalls(id).toPromise();
    sessionStorage.setItem('calls', JSON.stringify(res));
    console.log(res);
    
  }

}
