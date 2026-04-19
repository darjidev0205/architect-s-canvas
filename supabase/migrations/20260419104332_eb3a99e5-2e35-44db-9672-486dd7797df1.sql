-- Contact messages
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit contact"
  on public.contact_messages for insert
  to anon, authenticated
  with check (
    length(name) between 1 and 100
    and length(email) between 3 and 255
    and length(message) between 1 and 5000
    and (subject is null or length(subject) <= 200)
  );

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text not null,
  description text not null,
  cover_image text,
  tech_stack text[] not null default '{}',
  live_url text,
  github_url text,
  featured boolean not null default false,
  case_study text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Projects are public"
  on public.projects for select
  to anon, authenticated
  using (true);

-- Blog posts
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image text,
  tags text[] not null default '{}',
  read_minutes int not null default 5,
  published boolean not null default true,
  published_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Published posts are public"
  on public.blog_posts for select
  to anon, authenticated
  using (published = true);

create index idx_projects_order on public.projects (display_order desc, created_at desc);
create index idx_blog_published on public.blog_posts (published_at desc) where published = true;