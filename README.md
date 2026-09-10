# Plaintext HTTPS service

Only `GET /` is served, as `text/plain`.

**Navigation:** [architecture](docs/architecture.md) · [operations](docs/operations.md) · [change log](CHANGELOG.md) · [repository guide](AGENTS.md)

```powershell
Copy-Item .env.example .env
# Place the Cloudflare Origin CA certificate at certs/tls.crt and private key at certs/tls.key.
docker compose up --build -d
```

It publishes HTTPS only on `127.0.0.1:19283`. Use a Cloudflare Tunnel pointed at `https://127.0.0.1:19283` and configure its origin certificate validation and hostname. The container is unprivileged, read-only, capability-free, and limited to 0.25 CPU, 64 MiB memory, 32 PIDs, and 10 requests/minute per source address.

TLS 1.2+, host/method/path/body validation, `nosniff`, HSTS, short timeouts, capped headers/connections, and local rate limiting remain enabled. Cloudflare Access does not protect a directly reachable origin.
