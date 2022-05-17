import { CreateUserDto } from "../../users/dto/create-user.dto";
import { User } from "../../users/entities/user.entity";

export class TestUtils {
    static getAValidCreateUserDto(): CreateUserDto {
        const userDto = new CreateUserDto();
        userDto.name = "Forest Gump";
        userDto.email = "forest@gump.com";
        userDto.password = "bubba";
        return userDto;
    }

    static getAValidUser(userDto: CreateUserDto): User {
        const user = new User();
        user.id = this.getAValidId();
        user.name = userDto.name;
        user.email = userDto.email;
        user.password = userDto.password;
        return user;
    }

    static getAValidId(): string {
        return '9d646267-d9cf-46eb-b412-0ca659ba0ee8';
    }
   
}
