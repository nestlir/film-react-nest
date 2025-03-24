import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1742506091392 implements MigrationInterface {
  name = 'InitialMigration1742506091392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_1c2f5e637713a429f4854024a76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "schedules_filmId_fkey"`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "row" integer NOT NULL, "seat" integer NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "filmId" uuid, "sessionId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "tags"`);
    await queryRunner.query(
      `ALTER TABLE "films" ADD "tags" text array NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "about"`);
    await queryRunner.query(`ALTER TABLE "films" ADD "about" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "films" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "hall"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "hall" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "taken"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "taken" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_d8e5ea5174a33f81221028b9a9b" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_d1c3294f3925bb9d31512067e5e" FOREIGN KEY ("sessionId") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_1c2f5e637713a429f4854024a76" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_1c2f5e637713a429f4854024a76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_d1c3294f3925bb9d31512067e5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_d8e5ea5174a33f81221028b9a9b"`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "taken"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "taken" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "price" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "hall"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "hall" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "films" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "about"`);
    await queryRunner.query(
      `ALTER TABLE "films" ADD "about" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "tags"`);
    await queryRunner.query(`ALTER TABLE "films" ADD "tags" text NOT NULL`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "schedules_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_1c2f5e637713a429f4854024a76" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
