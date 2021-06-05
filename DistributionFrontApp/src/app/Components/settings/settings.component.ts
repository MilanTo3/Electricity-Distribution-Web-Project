import { SettingsService } from './../../Services/settings.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/registration-service.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  settingsFormAdmin: FormGroup;
  formdata: FormData;
  defaultCheck: false;

  icons= {
    Call: [
      "data:image/png;base64,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",
      "data:image/png;base64,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",
      "data:image/png;base64,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"
    ],
    Incident: [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEiElEQVR4nO2bX4gVVRzHP/e6mq7ZloZlRYJiuaVkFBShoJVBCxnkg0H1UJiKBokZ1EMJ9VCQQYaGa1gP/aEeUjIoqEBFHxQLqi2EjMLQVvrDair9c3d6+P1mZ/Yy996ZM785s+veDxzYPed7fvM9586dc+acc6FFixYtymEssF/T2JK9lMJaIND0eMlevHMp0EfUAX2aN2p4DWn4J5oCYEupjjwyF+gHzgGdwHX6dz8wp0RfXqgAnyOf+KZY/qua95lqzlvuRRr6BzA5lj9Z8wJgSQm+vHAB8APSyDUJ5Y9p2RHVnnc8iTTwW6AtobwN+E416z368sJlwJ9I4xY30N2lmlPAVA++vPE60rBdKbQfqXZboY48ciMwAPwLzEqhv0a1A8C8An15oQLsRT7RjRnqvax19jDCh8WlSEN+BToy1LsY+E3rLi3AlxfGAz8hjVjhUH+l1v1RY404nkYa8BUwxqH+GOBrjfGUoS8vTAPOIOYX5oizSGOc1pgjhjcR4x8YxNqhsd4wiOWFmxHD/wAz6mg6gZ1Ar6admpfEDI01ANxk6rQAKsgSVwC8UEezCPibaDEkTH9pWRIvqmY/w3xYvB8x2gtMSiifAPysmq3AFZq6Ne+oamqZBJxQzTJz10a0EzXu4Tqa27T8G6Aay69qXqCaJB6hcSeVzrOIwS8Y2rg4y1WzPaFsu5Ytr1O3CnypmmdyOS2Aq4CziLn5DXSriG7/WrZq2aoG9Reo5ixwpZPTgngbMfZeE13eDgB4X3VvZfRYGLcSPcWvbqK16IDpeq1Ar10qVeAgYua5FHqLDgB4XrUHqP+88cJDauQYMDGF3qoDLgSOq/7BVE4LwMWEVQdA9s43x+U2tOyArF8/U+IPolsy1LPsABj6AJ6eoV5uXIci6w6A9EOwGXkmI0V0QNpJmAl5p6NFdACkm4abkPeFJFznS1rz36ZlKx3ipnkRy81F5H8lvYPovb6WcB3hdsfYzV7FcxMuSuzDfVGiAzipcdYht2sVeELzTiId7UKaxRhnZmK3LBVOYMI9wFOx//PO6tIsxzlhvTDZBRwmavhhzbPAckEWGLo0fblVUGWKJkumIV7zLskDI3dzIu+mzCArKGZ7qgPYQHRKbAPZ9g6bMR7xHACPugbpQDY1A+A+G18AXEs0ZsfTUS2zwnVjdpCNGmA3dmvxbcAhjbsXefB1EW2hHyL5+IwLFWR7PQBeylp5FnJIoR+4wcgQyGGJ8NNuj+W3a16A7aGIeWQ7nDHILjXTbWgGZJwPgHcSyt7VsgeMrxlOsT9MW2ExxR1UarQx0kPjjRFXphJNtu5sJm5DjrEFyPTUmglEt3o36bfG8rJe49c7ojfIGhV+D4wrwAjIxCpcTardHF1Y0DXHIQcwA2B1PVH8uOo9BRkJ6USm179o2gHMLviaS5C2/Q5ckiTYpIJPGeZb0I5UkMPYAfBKbWEncmT9HHC9X19emYMM7f9Rc8eFP1rYXIIp32xB2vpxmNGlGX3Yv5kNR+I/17kbovF3NKYekLl+2UbKSrtp0aLFqOZ/RfX2FtbCLX8AAAAASUVORK5CYII=",
      "data:image/png;base64,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",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAABACAYAAACtK6/LAAAEoElEQVRoge2bXWhcVRSFTzS2VZCCD/7M7LX2mZtpAx3EQkptHzSIFrTgg4iCYKXWomijtgoKIkWt+NOKij9VrKIWq6JSCzZVKkoEKyhIEI0aU2rFSv19qVpF04wPc1OHk3snd5I5546SDfshT2t9e51Lzj33jDEzNVPeq1KpzCqVSt0icibJ80heSPJcEVlcLBbn9/T0HJe3x1ZVh7V2IYB1JHeQ3EtylGS1QY+SHAGwneSNInK6MaYjb5DMRXIByftJHpgENFOLyH4AG0RkXt5sqSUivSR3twK4wSB2WmuX5M16tEhWSL7rE9ptALtEpJwbdLlcnk1yI8m/Q4LXDeBPkncYYzqDgovIPJKDeUAn9AdRFDEIuKouJ3moDaDr+xdVPccrOMkVeS3zLI+Bql7sBVxVV5Mcyxtykj4C4LJWg1/EyTcobdEA/iK5rCXgABYB+CNvqCb7V5KVaYFHUTQXwL5WmxOR/SKyc7wBfO9hBQwVCoUTpgxP8mVPyVzh6NzqQwfA01MCV9ULfC1LAFfWawG4zaPW2U2BW2vnsPYW5sUQyWuc5Nd71PrMNLMLJHmDRzNVVe1zkr/Ls95VmcArlcoskt/6NANgnTPse33qkRwxxhw7KTyAlZ6NVEne4mhuCqB5aZYl/55vI6p6u6P5UAD4txqCW2stw2xh73SSfyyA5qi19tRGS/6mACaqJO9xkn8yhC6A6xot+f5AJjY5Q38m0NBfS2PvZLj39IedoT8fSPdnk3QazNqpawgDVVXd7CS/LZQ2yWgCfPzaGsrAFmfwrwQc/PKk5L28XKT0c07y20Npuxus8eQfDGhgW722iLwRcPD3JSW/JZQBEXnVGfybobRV9fGk5F8KOP0dzrJ/O+DgtyYl/0JA+H5n8AMBtZ9Ngn8ioIHdTvLvB9R+JAl+YygDqjrgaH8YUPvupGe+L5QBEdnjJP9xwOSvTkp+WUADHzmD/yTg4HsnwBcKBQSEH3SS/zyUdqlUOmUCfJy+1+Or8QYw5Oh+FQh+byK4McaIyNZAJn5T1TXx97/rA34ReioVnrWvsEGWX059SSp8d3f3iSQPt4FJH31IRI5PhTfGGFV9sQ2M+uiJO7uE5763DYy2vDPf4gqw3Rxj7WLietYOMsZ86onIO5nA4/TP9wy/tl6P5OU+9Zq+rwNglw8jAA4aY45x9UiOeAJ/vSnwGL7Lx/9fVR1O0RvyAP/7lK+pqerNntJfVK9jrV3iKfW+NLYs1eHjfA3AQZIrrLULVXUVyZ88wKd+oMhcInISw+29W9Ii8kUURXOnDW+MMapaitPKHSxDHygUCmgJ+HiVSqUzVPXHNoBL7fhW1/SuoKVVsVicD+DrvCFTeoRJn6JaWap6mojsaQPYo62qA11dXSd7Ba+rTtZ+SjKWM/gRABtMlvs2rS4AZ5H8NCfwQVVdGhzaqU6Sa31cIU3p71R1jckj7bSy1s6Jj7+9XF5U1WEA15bL5dl5szYsVV2qqpsBfDMdYAD7ADwqIovzZppSkYxUdVX8CbxfVYdF5Af+e1x2OP77y/gG9gMAVlprbd7efdd/59eSM/U/qn8AASCdde46nFkAAAAASUVORK5CYII="
    ],
    Crew: [
      "data:image/png;base64,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",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFa0lEQVR4nO2bbYhVRRjHf3fNva212lbrC20fSru+7EbR4i5FtWtkqFl9clcRTPCDRi9o9E0Q+iLWB8MMkYqiJEIEP2xQIARLEGIKsdsua4q1ERa7JG51bXPX3D7MHO/cOS93zpm5Lwf8wx8u58zzf55nztwzz8ydCzdRNTQALZINVY6lKhgEZiQHqxxLxdFEIXmPTVWNqExYgBjiOp7C3wGrAtq1SI1UYgUwBlwBXgUyyr3D+DvgsHI/A7wmbcekVqpwLyJwNcF+4E1gBH/yHkdkm37t+hjBI6lm0QZcIzzRuPwPeLCiGTjAPtx1wL4Kx+4E9cAw9skPS61U4gDBSV0EdgNrJXfLa0FtD1Q8akeoA0bxJ/QFwXN+k7ynt/9ZaqUGWeAR4CD+ZH4F5kXYzpNtdLuDUjNbtqgdYC5wCpgm/Pu800BnZ4T9tPQx13HsTtBG6RfaowY6jxnotDqO3QlMOqDdQKfdQKfNcexO0AyMEx34dgOd7SU0xoG7HcfuDHVADugB+vAHP0T0iyxLcO3QJzVzpGhGqMe/HpgBPiC4sKmX9/T2YyHtU4FDBA/jAWAz4onm5OeBkLaHKh61I9QBJ7EvhU9SvJRODV7HPnmPuyocuzXuByZx1wGTUjM1WArkKU7iHHAEuEx4opdlm3Pa9bzUTBW6EIFfB/YDt8rrc4Dj+JM/Lu8h274jbfNSK5VoAzoCrq/F3wFrAtp1UKNVny0W4O+A+VWNyBANwAbgc+Ab4DTwCbCF+MXKLxSSH41pexuwETgq4/gO+BhRT8yOqWWMLoLX6h7PA0/H0GsBuiXj7Pg+A/wWEccIZXhnbEDszJaarqaAZ107V/Ai4sVYKo5/ifcwIpED/jJwGnfOXgI8iXii9xi0bwX+iRFHHke/JXwYw6nHj0K0MsDLwA8BNj8ivsNh+CxBHO/FT7cYWWAigeMp/MveO4ETBrZfBtg2Eu/pq6PAavncmsCpx4cVnQzwVQzbPi3wDos4rCrIbgvHqxWdlxLYb1TsgwonUz5h0wFLLRyrG5ffJ7AfVuwfsohjsU0HzCLZO+BPCsde7rMIvllqZPEvrkz4Bw4Ko/0JHL+r2D9u0QFdik7Y7lIU37ZNHmAh8HsMp5cQ5wM8dFl0wEpFpwXxRE1tx4FFLjoARMFi6nidZhu08DHlQk1rjaHddcQxHKc4beB4yMJW57chWkMGtqcSZxmADNCL2RbXVcTKUC8+eg1sdfZqGrMQa4EpA9tJaW+9mdoFnEkQ/AjFdQDEK2WParargbMJ4jiDxcrwDcxWgFHfw+cVvUai9wM9XkKs9z28gNkKMIzXZC6x8JaFwxnEnL1N05yNWPCUsj0L3KLZbiNZHaDS+JzRVktHE0CnprmO8F9+gjgArNc0OjEbQVHcWir5RYjDiUkdXKF47r6LeIsgnSekhod27EZCHv/UWoT3LcT1Hl4O/GSpNyM1liu6Wyz11BOpRbgDsykmjMcUrfkEH5BKylEK6wIQs0RSrauEHLHZbCE6DTygaPU7TN5jv6K/hOizSKW4KagDjlkIHlF0esqQvMcexc+nFjrqaL2BsIOKJnxOamTw/67nkucpVHfrLXQu6slnSD6k/qawh7eyjMl79GaZrPSdRGMarUxutghILVv3VqAD9ir+bF6GRQetchZC6uGFQQsdU6r/L9ploZNTO8Bm70/dvLQtV02YV/xtstAp2i2eQ/J3QLfUaKxA8h5vlz5XJbSfpnAW4Qb2JBRbJu0XV7ADvJ3eZQnt9+jJe+gEdgCvxGCjtDU5KuuK3qGJxpix7sC/UHOGaoyAmkIdcIHyJ3+BGj4uuwL4GrEnkHfMCamduv8Q3kQt43/K0c4XUSLK9AAAAABJRU5ErkJggg==",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEQklEQVR4nO3bTYhVZRgH8J8Dk2lN0FjmQqxBMqpVi6IPg4lcWKJGX5sKwtCFCQrSRsTaCC2irCwSioI+pEIyDArU0DZJZBEtwr5sYTWQaWKFJXpbvOc2d86cr3s8545T5w/P5vL+7/N//uee97zv+5xLgwa9wCD6uhjfjwtq0tIz9GEtfkQLx/EGZmZw5mEnTuA0vsY99cqsD88LhcfjIAYSxs8VTErirOyB3kpxreRC2vF4Aue9jPF/CLfRpMEjsg3YFxvfJ/3qt2NhL4RXhUdlF/NlbHw//srh3NUL4VXhdtnFvJTA+SRj/GnMqV11hZiC3ZKLOY6hBM6wUGgS55naFdeAGdhmbCHf4MYMzt04bOyVfxJTa1VaMy7DYlwj3Ot5mIYbcBsuqU9WNZiD5diMDYLoblZ83aIvyrEhyrncBM4Nq4Tnc/x+3Stc9TwM4U4swqyC4/cm5PsdD3cn/czxUIKQzjgg/JSTMIQ9CZzXcGEKZ1r0nVk5l51ZScVxEY7liGlhYwL3UvyWwTmA6Qm8jQXyHYu01Y4lBcS0sD+Bu6sA76kE3mcFcy6uoL5crCso5oSwHmhjVkHeL7F8U+SvEtuxrspC0/BAQTHfxniLCvJawq3Sie8K8u6vrMoMzJO+YotPap0YLsBpx4wY9/UCnNO4vKoi8/Bcjpik5e4ATuXwWvg+Id+Q/N3i5qqKK4Lp2JEi5CiWpvCeTeF0xooU7tLou5M4OyQ/PWrHfcJ6/6Cwx38aszPGT8en0ot/Kyff7CjHvijntkjDpEI/HsMPQtGn8JWwuPrfYRDnT7SIKlBkl/dfyPkvrsMWHBIWPC38jO1YUGPeW/EOfjK62DqEF4SD2NpxDrbKn8m3R2OTcIXQL3gF7+NNYa1/L85N4UzFuwXyvqrGX8YAPiwgIm1Gv6oA/zCeML5v8HYXeXfivEoqjqHIMzwe8yLuHfi7C94XRh+nN5fIu6nq4i/GyRJCVgvzxZ8luIeivOtLcE9G3MqwrISIFq7ExyW5LbwonBqV4Va6rlhTQsB+YcIrW3xLWP8PyN8HJMWaiTZgl/BIPBMDWsI5wkhjQGNAY0BjwNliwIPSDyYm0oCjkbbaDSgqKG7AVqNnAFmxDx+UyDdi7MnzWWfAAsX6AptK5msMqNOAzl7gZDGg0l7hII50KWi3sb2AsgbMLGHAETW8VXY9PhJ2WUUE/Sp0e9vGlTHgc6H/X6SfMBJp2xtprRVxA0aMHo11xlrh9bbDujNgtfAm2dXCC1XxMSdSNPQM8eTDknv+JwUTBoRjraIG9AsHIltSxuwxvtV2VhrQacR84w1Yj5eNN2BlxndNSgPS5oBVQk8vaxJsDEiIPRoDGgOGNQY0BjQGaAxoDGgM0BjQewNuEXZ57RgUmqALM2KG4gbMFTrKaTFfeC+487NJ8aeqFUL/vx03CeI7P1syYeoaNPj/4R9PFxMqOc+VewAAAABJRU5ErkJggg=="
    ]
  };


  sources = ["", "", ""]; 
  uploadedCustom = [false,false,false]; 
  offeredIcons = [[false,false,false],[false,false,false],[false,false,false]] ;
  
  
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService, private settingsService: SettingsService) {
   
  }

  ngOnInit(): void {
    this.settingsForm  = this.formBuilder.group({
      Old: ['', Validators.required],
      New: ['', Validators.required],   
    });

    this.settingsFormAdmin  = this.formBuilder.group({
      iconCall: [this.icons.Call[0]],
      iconIncident: [this.icons.Incident[0]],
      iconCrew: [this.icons.Crew[0]], 
      infoCheck : [this.defaultCheck],
      warningCheck:[this.defaultCheck],
      successCheck:[this.defaultCheck],
      errorCheck: [this.defaultCheck],
      resetCheck: [this.defaultCheck],
      mandatoryCheck:[this.defaultCheck]

    });
    this.getSettings();
  }
  

  getSettings()
  {
    this.settingsService.getCurrentSettings().subscribe(
      res => {
        this.settingsFormAdmin.get('infoCheck').setValue(res["infoCheck"]);
        this.settingsFormAdmin.get('warningCheck').setValue(res["warningCheck"]);
        this.settingsFormAdmin.get('successCheck').setValue(res["successCheck"]);
        this.settingsFormAdmin.get('errorCheck').setValue(res["errorCheck"]);
        this.settingsFormAdmin.get('mandatoryCheck').setValue(res["mandatoryCheck"]);
        this.settingsFormAdmin.get('resetCheck').setValue(res["resetCheck"]);
        let callicon = res['iconCall'];               //da bi izgledalo selektovano
        let indexCall = this.icons.Call.indexOf(callicon);
        if(indexCall == -1)  //ubacena je bila custom ikonica
        {
          this.uploadedCustom[0] = true;
          this.sources[0] = callicon;
        }
        else
        {
          this.offeredIcons[0][indexCall] = true;  
        }
      

        let crewicon = res['iconCrew'];               //da bi izgledalo selektovano
        let indexCrew = this.icons.Crew.indexOf(crewicon);
        if(indexCrew == -1)  //ubacena je bila custom ikonica
        {
          this.uploadedCustom[1] = true;
          this.sources[1] = crewicon;
        }
        else
        {
          this.offeredIcons[1][indexCrew] = true;  
        }
        let incidenticon = res['iconIncident'];               //da bi izgledalo selektovano
        let indexIncident = this.icons.Incident.indexOf(incidenticon);
        if(indexIncident == -1)  //ubacena je bila custom ikonica
        {
          this.uploadedCustom[2] = true;
          this.sources[2] = incidenticon;
        }
        else
        {
          this.offeredIcons[2][indexIncident] = true;  
        }

        this.settingsFormAdmin.get('iconCall').setValue(res["iconCall"]);
        this.settingsFormAdmin.get('iconCrew').setValue(res["iconCrew"]);
        this.settingsFormAdmin.get('iconIncident').setValue(res["iconIncident"]);
       // this.settingsFormAdmin.get('id').setValue(res["id"]);

      },
      err => {
        this.toastr.error('Get error.', 'Server Error');

      }
    );
  }
 
  //type == 1 -> call
  //type == 2 -> crew
  //type == 3 -> incident
  onFileChanged(event : any, type){
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        switch (type){
          case "Call":    
            this.sources[0] = reader.result as string;
            this.uploadedCustom[0] = true;
            this.settingsFormAdmin.get('iconCall').setValue(this.sources[0]);
            break;

          case "Crew":
            this.sources[1] = reader.result as string;
            this.uploadedCustom[1] = true;
            this.settingsFormAdmin.get('iconCrew').setValue(this.sources[1]);
            break;

          case "Incident":
            this.sources[2] = reader.result as string;
            this.uploadedCustom[2] = true;
            this.settingsFormAdmin.get('iconIncident').setValue(this.sources[2]);
            break;


        }
      };
    
    }
  }
  iconOnSelect(key, value)
  {
    switch (key){
      case "Call":   
      this.uploadedCustom[0] = false;
      this.settingsFormAdmin.get('iconCall').setValue(value);
      break;
      case "Incident":
        this.uploadedCustom[2] = false;
        this.settingsFormAdmin.get('iconIncident').setValue(value);

        break;
      case "Crew":
        this.uploadedCustom[1] = false;
        this.settingsFormAdmin.get('iconCrew').setValue(value);
        break;

    }
  }
 
  fillFormData(){
    this.formdata = new FormData();
    this.formdata.append('InfoCheck', this.settingsFormAdmin.get('infoCheck').value);
    this.formdata.append('WarningCheck', this.settingsFormAdmin.get('warningCheck').value);
    this.formdata.append('SuccessCheck', this.settingsFormAdmin.get('successCheck').value);
    this.formdata.append('ErrorCheck', this.settingsFormAdmin.get('errorCheck').value);
    this.formdata.append('MandatoryCheck', this.settingsFormAdmin.get('mandatoryCheck').value);
    this.formdata.append('ResetCheck', this.settingsFormAdmin.get('resetCheck').value);
    this.formdata.append('IconCall', this.settingsFormAdmin.get('iconCall').value);
    this.formdata.append('IconCrew', this.settingsFormAdmin.get('iconCrew').value);
    this.formdata.append('IconIncident', this.settingsFormAdmin.get('iconIncident').value);

  }
  onSubmit(){
    // Process checkout data here
    if (this.settingsForm.valid) {
      this.userService.updatePassword(this.settingsForm.value).subscribe(
        (response: any) => {
          this.showToastrSuccess(1);
        },
        (err) => {
          if (err.status == 400)
            this.toastr.error(err.error, 'Password Change Error');
          else
            this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
        }
      );
    } else {
      this.showToastrError();
    }
  }
  onSubmitAdmin(){
    // Process checkout data here
    if (this.settingsFormAdmin.valid) {
      this.fillFormData();
      this.settingsService.updateSettings(this.formdata).subscribe(
        (response: any) => {
          window.location.reload();
          this.showToastrSuccess(2);
        },
        (err) => {
          if (err.status == 400)
            this.toastr.error(err.error, 'Settings change error');
          else
            this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
        }
      );
    } else {
      this.showToastrError();
    }
  }

  showToastrSuccess(i){  
    if(i===1)
    {
      this.toastr.success('Dont forget your new pass gurrl.', 'Password changed!');
    }
    else
    {
      this.toastr.success('New settings have been set.', 'Settings changed!');

    }
  }
  showToastrError(){  
      this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }
}
