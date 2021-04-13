import { Migration } from '@mikro-orm/migrations';

export class Migration20210413182612 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "password" varchar(255) null, add column "avatar" varchar(255) null, add column "banner" varchar(255) null;');
  }

}
