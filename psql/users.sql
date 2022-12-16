create table users (id uuid default uuid_generate_v4(),email varchar unique not null,password varchar not null,username varchar unique not null,firstname varchar not null,lastname varchar not null,state varchar not null,city varchar not null,country varchar not null,address1 varchar not null,status boolean,address2 varchar not null,created_at date,updated_at date,PRIMARY KEY(id));

create table celestial_posts(id uuid default uuid_generate_v4(),image varchar not null,title varchar not null,description varchar not null,metaTitle varchar not null,metaDescription varchar not null,status boolean,created_at date,updated_at date,user_id uuid,PRIMARY KEY(id),CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id));
ALTER TABLE celestial_post RENAME TO celestial_posts;
drop table celestial_posts;
create table post_likes(id uuid default uuid_generate_v4(),email varchar not null,description varchar not null,likes boolean,status boolean,created_at date,updated_at date,post_id uuid,PRIMARY KEY(id),CONSTRAINT fk_celestial_posts FOREIGN KEY(post_id) REFERENCES celestial_posts(id));
create table post_comments(id uuid default uuid_generate_v4(),email varchar not null,description varchar not null,comment varchar not null,status boolean,created_at date,updated_at date,post_id uuid,PRIMARY KEY(id),CONSTRAINT fk_celestial_posts_comments FOREIGN KEY(post_id) REFERENCES celestial_posts(id));
create table events(id uuid default uuid_generate_v4(),address varchar not null,image varchar not null,description varchar not null,title varchar not null,city varchar not null,status boolean,country varchar not null,state varchar not null,contact varchar not null,event_date date,event_time time,created_at date,updated_at date,user_id uuid,PRIMARY KEY(id),CONSTRAINT fk_events FOREIGN KEY(user_id) REFERENCES users(id));
create table users_events(id uuid default uuid_generate_v4(),created_at date,updated_at date,is_active boolean,user_id uuid,event_id uuid,PRIMARY KEY(id),CONSTRAINT fk_events_user FOREIGN KEY(user_id) REFERENCES users(id),CONSTRAINT fk_events_event FOREIGN KEY(event_id) REFERENCES events(id));
create table user_roles(id uuid default uuid_generate_v4(),name varchar not null,value_info varchar not null,description varchar not null,status boolean,created_at date,updated_at date,PRIMARY KEY(id) );
alter table users ADD COLUMN user_role_id uuid;
alter table users ADD CONSTRAINT fk_user_role FOREIGN KEY(user_role_id) REFERENCES user_roles(id);
alter table post_comments drop column email;
alter table post_comments add column user_id uuid;
alter table post_comments ADD CONSTRAINT fk_post_comment_user FOREIGN KEY(user_id) REFERENCES users(id);
alter table post_likes drop column email;
alter table post_likes add column user_id uuid;
alter table post_likes ADD CONSTRAINT fk_post_like_user FOREIGN KEY(user_id) REFERENCES users(id);
create table event_types(id uuid default uuid_generate_v4(),name varchar not null,value_info varchar not null,description varchar not null,status boolean,created_at date,updated_at date,PRIMARY KEY(id) );