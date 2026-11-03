# MrSEO Classroom

Online classes with voice, screen sharing and chat (no cameras), on our own Jitsi server at `class.mrseo.pk`.
Only people the website lets in can join: the website signs a short-lived pass for each student
(after the access code) and for the teacher (admin login).

## How it runs on the VPS (72.62.193.221)

- Jitsi runs in Docker from `/opt/classroom` (docker-jitsi-meet release), settings in `/opt/classroom/.env`,
  runtime config in `/opt/classroom-cfg` (owned by uid 1000).
- Memory is capped (JVB 640 MB heap, Jicofo 320 MB, container limits in `docker-compose.override.yml`).
- The web container listens on `127.0.0.1:8100`; host nginx serves `class.mrseo.pk`
  (`/etc/nginx/sites-available/class.mrseo.pk`). Audio and screen share use UDP 10000 directly.
- Branding: `custom-config.js` and `custom-interface_config.js` are copied to `/opt/classroom-cfg/web/`,
  the logo is mounted from `branding/`.
- The shared secret is in `/etc/mrseo/classroom.secret` and in `/etc/mrseo/mrseo.env` as `CLASSROOM_APP_SECRET`.

Useful commands (on the server):

```bash
cd /opt/classroom && docker compose ps
cd /opt/classroom && docker compose logs --tail 50 jvb
cd /opt/classroom && docker compose restart
```

After changing `custom-config.js` here: copy it to `/opt/classroom-cfg/web/` and run `docker compose restart web`.

`setup.sh` installs the same thing on a fresh, dedicated server (with its own SSL) if the classroom ever moves.
