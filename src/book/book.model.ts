import {Directive, Field, ID, ObjectType} from '@nestjs/graphql'
import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn, ObjectId} from 'typeorm'

@Entity()
@ObjectType({description: "book"})
export class Book {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    description: string;

    @Column({nullable: true})
    publishedOn?: Date

    @Column()
    createdOn: Date

    @BeforeInsert()
    public setCreatedOn() {
        this.createdOn = new Date()
    }

}