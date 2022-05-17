import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  @Entity()
  @Unique(['email'])
  export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty()
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @ApiProperty()
    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;

    @ApiProperty()
    @Column({ nullable: false })
    password: string;
  
    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;
  
    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
  }