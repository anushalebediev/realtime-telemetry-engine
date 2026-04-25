import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:4200']; // Fallback strictly for local dev

@WebSocketGateway({
  cors: { origin: allowedOrigins },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AppGateway.name);

  constructor(private readonly appService: AppService) {}

  afterInit() {
    this.logger.log('WebSocket Gateway Initialized');
    
    this.appService.streamMetrics().subscribe((metrics) => {
      this.server.emit('telemetry_update', metrics);
    });
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
