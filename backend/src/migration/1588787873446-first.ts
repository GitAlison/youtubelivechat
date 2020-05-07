import {MigrationInterface, QueryRunner} from "typeorm";

export class first1588787873446 implements MigrationInterface {
    name = 'first1588787873446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "video" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_3f3204ad797a11d7145e7ac6ebc" UNIQUE ("video"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`, undefined);
        await queryRunner.query(`CREATE TABLE "message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "roomId" integer, "userId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "roomId" integer, "userId" integer, CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_message"("id", "text", "created", "updated", "roomId", "userId") SELECT "id", "text", "created", "updated", "roomId", "userId" FROM "message"`, undefined);
        await queryRunner.query(`DROP TABLE "message"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_message" RENAME TO "message"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" RENAME TO "temporary_message"`, undefined);
        await queryRunner.query(`CREATE TABLE "message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "roomId" integer, "userId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "message"("id", "text", "created", "updated", "roomId", "userId") SELECT "id", "text", "created", "updated", "roomId", "userId" FROM "temporary_message"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_message"`, undefined);
        await queryRunner.query(`DROP TABLE "message"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "room"`, undefined);
    }

}
