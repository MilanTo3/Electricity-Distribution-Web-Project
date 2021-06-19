import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Call } from 'src/app/Models/Call.model';
import { DeviceService } from 'src/app/Services/device.service';
import { Device } from 'src/app/Models/Device.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-devices-component',
  templateUrl: './devices-component.component.html',
  styleUrls: ['./devices-component.component.css']
})
export class DevicesComponentComponent implements OnInit {

  availableDevices: Device[] = [];
  incidentDevices: Device[] = [];
  deviceIds: number[] = [];

  constructor(private router: Router, private devices: DeviceService) { }

  async ngOnInit(): Promise<void> {

    let calls: any = await this.devices.GetDevices().toPromise();
    
    if(calls){
      let i;
      for(i = 0; i < calls.length; i++){
        this.availableDevices.push(new Device(calls[i]["id"], calls[i]["name"], calls[i]["type"], calls[i]["longitude"], calls[i]["latitude"], calls[i]["address"]));
      }
    }

    if(sessionStorage.getItem('devices') !== null){
      this.deviceIds = JSON.parse(sessionStorage.getItem('devices'));
      let i
      for(i = 0; i < this.deviceIds.length; i++){
        if(this.availableDevices.find(x => x.id === this.deviceIds[i]) !== null){
          this.incidentDevices.push(this.availableDevices.find(x => x.id === this.deviceIds[i]));
          this.availableDevices = this.availableDevices.filter(item => item != this.availableDevices.find(x => x.id === this.deviceIds[i]));
        }
      }
    }
  }

  addDevice() {
    this.router.navigate(['/newDevice']);
  }

  drop(event: CdkDragDrop<Device[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        this.deviceIds = this.incidentDevices.map(a => a.id);
                        sessionStorage.setItem('devices', JSON.stringify(this.deviceIds));
    }
  }

  deleteDeviceId(event){    
    this.devices.DeleteDevice(event).subscribe();
  }

}
