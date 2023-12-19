import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm"
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    id: string = uuidv4() 

    @Column()
    name!: string

    @Column()
    lastname!: string

    @Column({ default : true})
    status!: boolean

    @Column()
    age!: number

    @Column({ unique : true})
    email!: string

    @Column()
    password!: string
}