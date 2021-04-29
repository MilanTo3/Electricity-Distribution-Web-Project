import { HistoryStateChange } from '../Models/HistoryStateChange.model';
import { pictureModel } from '../Models/pictureModel.model';

export class WorkRequestWrapper{

    infoForm: any;
    historyForm: HistoryStateChange[] = [];
    mediaForm: pictureModel[] = [];

}