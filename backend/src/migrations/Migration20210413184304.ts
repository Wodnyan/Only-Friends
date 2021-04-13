import { Migration } from '@mikro-orm/migrations';

export class Migration20210413184304 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
