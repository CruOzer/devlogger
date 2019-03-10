import { Component, OnInit } from '@angular/core';
import { Log } from '../../modules/Log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})

export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;
  constructor(private logService: LogService) { }

  onSelect(log: Log) {
    this.logService.setLogForm(log);
    this.selectedLog = log;
  }

  ngOnInit() {
    this.logService.getLogs().subscribe(arg => {
      this.logs = arg;
      this.loaded = true;
    });
    this.logService.stateClear.subscribe(clear => {
      if (clear)
        this.selectedLog = null;
    });
  }

  onDelete(id: string) {
    this.logService.deleteLog(id);
  }
}
