import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export interface UsersRepositoryInterface {
    insert(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>
    findOne(id: string): Promise<User>
    remove(id: string): Promise<void>
    hasRegisterWithThisEmail(email: string): Promise<boolean>
}