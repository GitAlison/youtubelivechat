import {MigrationInterface, QueryRunner} from "typeorm";

export class first1588708622594 implements MigrationInterface {
    name = 'first1588708622594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "video" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'), CONSTRAINT "UQ_3f3204ad797a11d7145e7ac6ebc" UNIQUE ("video"))`, undefined);
        await queryRunner.query(`CREATE TABLE "message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'), "roomId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'))`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'), "roomId" integer, CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_message"("id", "text", "createdAt", "roomId") SELECT "id", "text", "createdAt", "roomId" FROM "message"`, undefined);
        await queryRunner.query(`DROP TABLE "message"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_message" RENAME TO "message"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" RENAME TO "temporary_message"`, undefined);
        await queryRunner.query(`CREATE TABLE "message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'), "roomId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "message"("id", "text", "createdAt", "roomId") SELECT "id", "text", "createdAt", "roomId" FROM "temporary_message"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_message"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "message"`, undefined);
        await queryRunner.query(`DROP TABLE "room"`, undefined);
    }

}
