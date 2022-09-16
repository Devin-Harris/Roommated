import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApplicationChatEvents } from '@rmtd/common/enums';
import { ApplicationConnectDto } from '@rmtd/common/dtos';

@Injectable()
export class ApplicationChatService {
  connected$: Observable<any>;

  constructor(private socket: Socket) {
    this.connected$ = this.socket
      .fromEvent(ApplicationChatEvents.Connected)
      .pipe(map((data) => data));
  }

  connect(data: ApplicationConnectDto) {
    this.socket.emit(ApplicationChatEvents.Connect, data);
  }
}
