import { MigrationInterface, QueryRunner } from "typeorm";

export class restService1677364706114 implements MigrationInterface {
    name = 'restService1677364706114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_artist" DROP CONSTRAINT "FK_c180f6299cca784da231265d0fd"`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" ADD CONSTRAINT "UQ_c180f6299cca784da231265d0fd" UNIQUE ("artist_id")`);
        await queryRunner.query(`ALTER TABLE "favorite_album" DROP CONSTRAINT "FK_de49c98d95ee64924736b32e666"`);
        await queryRunner.query(`ALTER TABLE "favorite_album" ADD CONSTRAINT "UQ_de49c98d95ee64924736b32e666" UNIQUE ("album_id")`);
        await queryRunner.query(`ALTER TABLE "favorite_track" DROP CONSTRAINT "FK_742ce9682c4da13bba6baec6493"`);
        await queryRunner.query(`ALTER TABLE "favorite_track" ADD CONSTRAINT "UQ_742ce9682c4da13bba6baec6493" UNIQUE ("track_id")`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" ADD CONSTRAINT "FK_c180f6299cca784da231265d0fd" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_album" ADD CONSTRAINT "FK_de49c98d95ee64924736b32e666" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_track" ADD CONSTRAINT "FK_742ce9682c4da13bba6baec6493" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_track" DROP CONSTRAINT "FK_742ce9682c4da13bba6baec6493"`);
        await queryRunner.query(`ALTER TABLE "favorite_album" DROP CONSTRAINT "FK_de49c98d95ee64924736b32e666"`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" DROP CONSTRAINT "FK_c180f6299cca784da231265d0fd"`);
        await queryRunner.query(`ALTER TABLE "favorite_track" DROP CONSTRAINT "UQ_742ce9682c4da13bba6baec6493"`);
        await queryRunner.query(`ALTER TABLE "favorite_track" ADD CONSTRAINT "FK_742ce9682c4da13bba6baec6493" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_album" DROP CONSTRAINT "UQ_de49c98d95ee64924736b32e666"`);
        await queryRunner.query(`ALTER TABLE "favorite_album" ADD CONSTRAINT "FK_de49c98d95ee64924736b32e666" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" DROP CONSTRAINT "UQ_c180f6299cca784da231265d0fd"`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" ADD CONSTRAINT "FK_c180f6299cca784da231265d0fd" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
