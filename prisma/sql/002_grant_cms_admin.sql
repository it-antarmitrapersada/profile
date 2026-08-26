-- Beri role CMS Admin. Tanpa ini /admin terkunci untuk semua orang:
-- pg_users.role bertipe text[] dengan default '{}'.
--
-- 'cms_admin' adalah role khusus website, sengaja terpisah dari role ERP —
-- menambah admin di sistem internal tidak otomatis menambah editor website.

update public.pg_users
set role = array_append(role, 'cms_admin')
where email = 'rozaq924@gmail.com'
  and not ('cms_admin' = any(role));

-- Cek: select email, role from public.pg_users where 'cms_admin' = any(role);
