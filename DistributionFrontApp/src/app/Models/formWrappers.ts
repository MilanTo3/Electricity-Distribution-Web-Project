import { HistoryStateChange } from '../Models/HistoryStateChange.model';
import { pictureModel } from '../Models/pictureModel.model';

export class WorkRequestWrapper{

    infoForm: any;
    historyForm: HistoryStateChange[] = [];
    mediaForm: pictureModel[] = [];

}
export class WorkPlanWrapper{

    basicInformationForm: any;
    historyForm: HistoryStateChange[] = [];
    mediaForm: pictureModel[] = [];
    switchingInstructionsForm: any;
}
export class MyIncidentWrapper{

    infoForm: any;
    teamId: number;
    devicesIds: number[];
    mediaForm: pictureModel[] = [];
    resolutionForm: any;

}

export class MySafetyDocsWrapper{

    infoForm: any;
    checkListForm: any;
    historyForm: HistoryStateChange[] = [];
    mediaForm: pictureModel[] = [];

}

export class AddNewDeviceWrapper {
    infoForm: any;
}