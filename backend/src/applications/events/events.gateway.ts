import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { ApplicationConnectDto } from '@rmtd/common/dtos';
import { ApplicationChatEvents } from '@rmtd/common/enums';
import { Inject } from '@nestjs/common';
import { Server } from 'socket.io';
import { EventsService } from './events.service';

@WebSocketGateway(80, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(EventsService) private eventsService: EventsService) {}

  @SubscribeMessage(ApplicationChatEvents.Connect)
  findAll(@MessageBody() data: ApplicationConnectDto): WsResponse<any> {
    const applicationUser = this.eventsService.findUserInApplicationId(
      data.userId,
      data.applicationId,
    );
    return { event: ApplicationChatEvents.Connected, data: applicationUser };
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
