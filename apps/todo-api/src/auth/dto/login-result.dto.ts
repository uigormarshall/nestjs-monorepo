import { ApiProperty } from '@nestjs/swagger';
export class LoginResultDto{
    constructor(token: string){
        this.token = token;
    }
    @ApiProperty()
    token: string;
}