import { Migration } from '@mikro-orm/migrations';

export class Migration20210422190039 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" varchar(100) not null, "full_name" varchar(300) not null, "email" varchar(255) not null, "password" varchar(255) null, "avatar" varchar(255) null, "banner" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "is_activated" bool not null default false);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "post" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "image" varchar(255) null, "author_id" int4 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

}
