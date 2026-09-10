# Operations

## Compose deployment

```powershell
Copy-Item .env.example .env
# Put the Cloudflare Origin CA certificate in certs/tls.crt and its private key in certs/tls.key.
docker compose up --build -d
```

`compose.yaml` binds the service only to `127.0.0.1:19283`. A Cloudflare Tunnel should connect to `https://127.0.0.1:19283`, validate the origin certificate, and send the public hostname in `Host`.

## Configuration

| Input | Set in | Required | Notes |
| --- | --- | --- | --- |
| `ALLOWED_HOSTS` | `.env` | Yes | Exact public hostname; comma-separated values are allowed. |
| `certs/tls.crt` | Host filesystem | Yes | Cloudflare Origin CA or publicly trusted certificate. |
| `certs/tls.key` | Host filesystem | Yes | Matching private key; never commit it. |
| `PORT` | Image environment | No | Fixed at `19283` by default. |
| `RATE_LIMIT` | Image environment | No | Defaults to 10 requests/minute per direct source address. |

## Runtime boundary

| Control | Default |
| --- | --- |
| Published address | `127.0.0.1:19283` |
| User | `node` (unprivileged) |
| Linux capabilities | All dropped |
| Filesystem | Read-only; `/tmp` is an 8 MiB restricted tmpfs |
| CPU / memory / PIDs | 0.25 CPU / 64 MiB / 32 |
| Restart | `unless-stopped` |

Do not change the port mapping to `0.0.0.0` unless a firewall limits inbound traffic to Cloudflare IP ranges. Cloudflare Access is an edge control and cannot protect an origin that is independently reachable.
