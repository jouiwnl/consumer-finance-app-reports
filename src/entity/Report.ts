import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("reports")
export class Report {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    path: string

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    observation: string;

    @Column({ nullable: true })
    presigned_url: string;

    @Column({ nullable: true })
    created_at: Date
}
