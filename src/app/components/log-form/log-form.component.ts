import { Component, OnInit } from '@angular/core';
import { Log } from '../../modules/Log';
import { LogService } from '../../services/log.service'
@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id: string;
  text: string;
  date: any;
  isNew: boolean = true;
  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.selectedLog.subscribe(arg => {
      if (arg == null || arg.id == null)
        return;
      this.isNew = false;
      this.id = arg.id;
      this.date = arg.date;
      this.text = arg.text;
    }
    );
  }
  onSubmit() {
    if (this.isNew) {
      const newLog = {
        id: this.uuidv4(),
        text: this.text,
        date: new Date
      }
      this.logService.addLog(newLog);
    } else {
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date
      }
      this.logService.updateLog(updLog);
    }
    this.clearState();
  }
  clearState() {
    this.isNew = true;
    this.id = null;
    this.text = null;
    this.date = null;
    this.logService.clearState();
  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
