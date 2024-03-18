import {Field, InputType} from "@nestjs/graphql"
import {IsOptional, Length, MaxLength} from "class-validator"

@InputType()
export class BookInput {
    @Field()
    @MaxLength(20)
    title: string;

    @Field()
    @MaxLength(30)
    author: string;

    @Field()
    @Length(30, 256)
    description: string;

    @Field({nullable: true})
    @IsOptional()
    publishedOn?: Date

}