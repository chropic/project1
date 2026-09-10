# Financial Bias Detector

> ESOF423, Fall 2026 · Professor Daniel DeFrance · Montana State University

[Course website](https://esof423.csit.help)

## Project Authors

- Owen Sanford ([oogwaysprophecy732](https://github.com/oogwaysprophecy732))
- Charles Smith ([chropic](https://github.com/chropic))

## Navigation

[Architecture](docs/architecture.md) · [Operations](docs/operations.md) · [Change Log](CHANGELOG.md) · [Agent Guide](AGENTS.md)

## Local Deployment & Security

When run locally, HTTPS is published at `127.0.0.1:19283`.

The container is unprivileged, read-only, and capability-free. Its defaults are limited to 0.25 CPU, 64 MiB memory, 32 PIDs, and 10 requests per minute per source address.

TLS 1.2+, host/method/path/body validation, `nosniff`, HSTS, short timeouts, capped headers/connections, and local rate limiting remain enabled. Cloudflare Access does not protect a directly reachable origin.
