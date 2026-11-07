#!/usr/bin/env bash
# Installs MrSEO Classroom (self-hosted Jitsi, website-only access, MrSEO branding)
# on a fresh Ubuntu 22.04/24.04 server (x86 or ARM). Run as root from this folder:
#   bash setup.sh class.mrseo.pk you@example.com <CLASSROOM_APP_SECRET>
# The secret must match CLASSROOM_APP_SECRET in the website's env file.
set -euo pipefail

DOMAIN="${1:?domain, e.g. class.mrseo.pk}"
EMAIL="${2:?email for the SSL certificate}"
SECRET="${3:?shared secret (same as CLASSROOM_APP_SECRET on the website)}"
HERE="$(cd "$(dirname "$0")" && pwd)"
APP=/opt/classroom
CFG=/opt/classroom-cfg

echo "== Docker"
if ! command -v docker >/dev/null; then curl -fsSL https://get.docker.com | sh; fi
systemctl enable --now docker

echo "== Jitsi (latest stable release)"
if [ ! -f "$APP/docker-compose.yml" ]; then
  TAG=$(curl -fsSL https://api.github.com/repos/jitsi/docker-jitsi-meet/releases/latest | grep -m1 '"tag_name"' | cut -d'"' -f4)
  mkdir -p "$APP"
  curl -fsSL "https://github.com/jitsi/docker-jitsi-meet/archive/refs/tags/${TAG}.tar.gz" | tar xz -C "$APP" --strip-components=1
  cp "$APP/env.example" "$APP/.env"
  (cd "$APP" && ./gen-passwords.sh)
fi

PUBLIC_IP=$(curl -fsS4 https://api.ipify.org || hostname -I | awk '{print $1}')
set_env() { # key value
  if grep -qE "^#?\s*$1=" "$APP/.env"; then sed -i -E "s|^#?\s*$1=.*|$1=$2|" "$APP/.env"; else echo "$1=$2" >> "$APP/.env"; fi
}
set_env CONFIG "$CFG"
set_env HTTP_PORT 80
set_env HTTPS_PORT 443
set_env TZ Asia/Karachi
set_env PUBLIC_URL "https://$DOMAIN"
set_env JVB_ADVERTISE_IPS "$PUBLIC_IP"
set_env ENABLE_LETSENCRYPT 1
set_env LETSENCRYPT_DOMAIN "$DOMAIN"
set_env LETSENCRYPT_EMAIL "$EMAIL"
set_env ENABLE_HTTP_REDIRECT 1
# Only people with a token signed by mrseo.pk can enter.
set_env ENABLE_AUTH 1
set_env AUTH_TYPE jwt
set_env ENABLE_GUESTS 0
set_env JWT_APP_ID mrseo
set_env JWT_APP_SECRET "$SECRET"
set_env JWT_ACCEPTED_ISSUERS mrseo
set_env JWT_ACCEPTED_AUDIENCES jitsi
set_env JWT_ALLOW_EMPTY 0
# The teacher (token with moderator) is the host; students never become host.
set_env ENABLE_AUTO_OWNER 0
set_env XMPP_MUC_MODULES token_affiliation
set_env ENABLE_LOBBY 1
# No "End meeting for all": a host leaving never closes the class for students.
set_env ENABLE_END_CONFERENCE false
set_env ENABLE_BREAKOUT_ROOMS 1
set_env ENABLE_WELCOME_PAGE 0
set_env ENABLE_CLOSE_PAGE 0
set_env DISABLE_DEEP_LINKING 1
set_env ENABLE_PREJOIN_PAGE 1

echo "== Branding"
mkdir -p "$CFG/web"
cp "$HERE/custom-config.js" "$CFG/web/custom-config.js"
cp "$HERE/custom-interface_config.js" "$CFG/web/custom-interface_config.js"
mkdir -p "$APP/branding"
cp "$HERE/branding/"* "$APP/branding/"
cat > "$APP/docker-compose.override.yml" <<'YML'
services:
  web:
    volumes:
      - ./branding/mrseo-logo.png:/usr/share/jitsi-meet/images/mrseo-logo.png:ro
      - ./branding/mrseo-logo.png:/usr/share/jitsi-meet/images/watermark.png:ro
    restart: unless-stopped
  prosody:
    restart: unless-stopped
  jicofo:
    restart: unless-stopped
  jvb:
    restart: unless-stopped
YML

echo "== Firewall (80/443 web, 10000/udp video)"
for rule in "-p tcp --dport 80" "-p tcp --dport 443" "-p udp --dport 10000"; do
  # shellcheck disable=SC2086
  iptables -C INPUT $rule -j ACCEPT 2>/dev/null || iptables -I INPUT $rule -j ACCEPT
done
if command -v netfilter-persistent >/dev/null; then netfilter-persistent save; fi
if command -v ufw >/dev/null && ufw status | grep -q active; then ufw allow 80/tcp; ufw allow 443/tcp; ufw allow 10000/udp; fi

echo "== Start"
cd "$APP"
docker compose pull
docker compose up -d
echo "Done. Open https://$DOMAIN after DNS points to $PUBLIC_IP (DNS only, not proxied)."
