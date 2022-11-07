import { UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { MessageConnectDTO } from './DTO/message-connect.dto'
import { MessageCreateDTO } from './DTO/message-create.dto'
import { Message } from './message.model'
import { MessageService } from './message.service'

@ApiTags('Message')
@WebSocketGateway({ cors: true })
export class MessageGateway {
    constructor(
        private readonly messageService: MessageService
    ) { }
    
    @WebSocketServer() private readonly server: Server

    @ApiOperation({summary: 'Sending message'})
    @ApiResponse({status: 200, type: Message})
    @SubscribeMessage('message')
    @UsePipes(ValidationPipe)
    async handleMessage(@MessageBody() dto: MessageCreateDTO) {
        const message = await this.messageService.create(dto)
        this.server.to(dto.chatId.toString()).emit('message', message)
    }

    @ApiOperation({summary: 'Join to chat room'})
    @SubscribeMessage('join-room')
    @UsePipes(ValidationPipe)
    handleRoomJoin(client: Socket, dto: MessageConnectDTO) {
        client.join(dto.chatId.toString())
    }

    @ApiOperation({summary: 'Leave from chat room'})
    @SubscribeMessage('leave-room')
    @UsePipes(ValidationPipe)
    handleRoomLeave(client: Socket, dto: MessageConnectDTO) {
        client.leave(dto.chatId.toString())
    }
}
