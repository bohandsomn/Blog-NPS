import { UsePipes } from '@nestjs/common'
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { MessageConnectDTO } from './DTO/message-connect.dto'
import { MessageCreateDTO } from './DTO/message-create.dto'
import { MessageService } from './message.service'

@WebSocketGateway()
export class MessageGateway {
    constructor(
        private readonly messageService: MessageService
    ) { }
    
    @WebSocketServer() private readonly server: Server

    @SubscribeMessage('message')
    @UsePipes(ValidationPipe)
    async handleMessage(@MessageBody() dto: MessageCreateDTO) {
        const message = await this.messageService.create(dto)
        this.server.to(dto.chatId.toString()).emit('message', message)
    }

    @SubscribeMessage('join-room')
    @UsePipes(ValidationPipe)
    handleRoomJoin(client: Socket, dto: MessageConnectDTO) {
        client.join(dto.chatId.toString())
    }
  
    @SubscribeMessage('leave-room')
    @UsePipes(ValidationPipe)
    handleRoomLeave(client: Socket, dto: MessageConnectDTO) {
        client.leave(dto.chatId.toString())
    }
}
