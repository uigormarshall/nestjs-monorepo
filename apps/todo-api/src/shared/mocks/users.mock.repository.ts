import { UsersRepositoryInterface } from "../../users/contracts/users.repository.interface";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { UpdateUserDto } from "../../users/dto/update-user.dto";
import { User } from "../../users/entities/user.entity";

export class UsersMockRepository implements UsersRepositoryInterface{
    insert(createUserDto: CreateUserDto): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(id: any, updateUserDto: UpdateUserDto): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findOneByEmail(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    hasRegisterWithThisEmail(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}