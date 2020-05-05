import {MigrationInterface, QueryRunner} from "typeorm";

export class second1588708664924 implements MigrationInterface {
    name = 'second1588708664924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'), "usernameddd" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "createdAt") SELECT "id", "username", "password", "createdAt" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_room" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "video" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:45 GMT-0300 (Brasilia Standard Time)'), CONSTRAINT "UQ_3f3204ad797a11d7145e7ac6ebc" UNIQUE ("video"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_room"("id", "video", "createdAt") SELECT "id", "video", "createdAt" FROM "room"`, undefined);
        await queryRunner.query(`DROP TABLE "room"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_room" RENAME TO "room"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:45 GMT-0300 (Brasilia Standard Time)'), "roomId" integer, CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_message"("id", "text", "createdAt", "roomId") SELECT "id", "text", "createdAt", "roomId" FROM "message"`, undefined);
        await queryRunner.query(`DROP TABLE "message"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_message" RENAME TO "message"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:45 GMT-0300 (Brasilia Standard Time)'), "usernameddd" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "createdAt", "usernameddd") SELECT "id", "username", "password", "createdAt", "usernameddd" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'), "usernameddd" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "createdAt", "usernameddd") SELECT "id", "username", "password", "createdAt", "usernameddd" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
        await queryRunner.query(`ALTER TABLE "message" RENAME TO "temporary_message"`, undefined);
        await queryRunner.query(`CREATE TABLE "message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'), "roomId" integer, CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "message"("id", "text", "createdAt", "roomId") SELECT "id", "text", "createdAt", "roomId" FROM "temporary_message"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_message"`, undefined);
        await queryRunner.query(`ALTER TABLE "room" RENAME TO "temporary_room"`, undefined);
        await queryRunner.query(`CREATE TABLE "room" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "video" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'), CONSTRAINT "UQ_3f3204ad797a11d7145e7ac6ebc" UNIQUE ("video"))`, undefined);
        await queryRunner.query(`INSERT INTO "room"("id", "video", "createdAt") SELECT "id", "video", "createdAt" FROM "temporary_room"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_room"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT ('Tue May 05 2020 16:57:03 GMT-0300 (Brasilia Standard Time)'))`, undefined);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "createdAt") SELECT "id", "username", "password", "createdAt" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
    }

}
