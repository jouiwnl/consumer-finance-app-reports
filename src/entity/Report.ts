import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("reports")
export class Report {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    s3Key: string

    @CreateDateColumn()
    created_at: Date
}
