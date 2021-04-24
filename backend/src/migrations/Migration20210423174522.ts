import { Migration } from '@mikro-orm/migrations';

export class Migration20210423174522 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_activation_code" ("id" serial primary key, "code" varchar(255) not null, "user_id" int4 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('alter table "user_activation_code" add constraint "user_activation_code_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
