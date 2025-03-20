import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1742414406636 implements MigrationInterface {
  name = 'InitMigration1742414406636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "daytime" character varying NOT NULL, "hall" integer NOT NULL, "rows" integer NOT NULL, "seats" integer NOT NULL, "price" integer NOT NULL, "taken" text array NOT NULL DEFAULT '{}', "filmId" uuid, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "films" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "director" character varying NOT NULL, "tags" text array NOT NULL, "title" character varying NOT NULL, "about" text NOT NULL, "description" text NOT NULL, "image" character varying NOT NULL, "cover" character varying NOT NULL, CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "row" integer NOT NULL, "seat" integer NOT NULL, "filmId" uuid, "sessionId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_7876c96cecc19ed1e6bd2a76d24" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_339fb31d500247871ae9280b8f9" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_40b0c0cbe0fb4da7f497e2a1e9e" FOREIGN KEY ("sessionId") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_40b0c0cbe0fb4da7f497e2a1e9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_339fb31d500247871ae9280b8f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_7876c96cecc19ed1e6bd2a76d24"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "films"`);
    await queryRunner.query(`DROP TABLE "schedule"`);
  }
}
