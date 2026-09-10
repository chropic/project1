# Financial Bias Detector
ESOF423, Fall 2026, Professor Daniel DeFrance | Montana State University 
esof423.csit.help

Project Authors:
Owen Sanford (oogwaysprophecy732)
Charles Smith (chropic)

**Navigation:** [architecture](docs/architecture.md) · [operations](docs/operations.md) · [change log](CHANGELOG.md) · [agent guide](AGENTS.md)

When ran locally, HTTPS published at `127.0.0.1:19283`. 
The container is unprivileged, read-only, capability-free, and limited to 0.25 CPU, 64 MiB memory, 32 PIDs, and 10 requests/minute per source address. TLS 1.2+, host/method/path/body validation, `nosniff`, HSTS, short timeouts, capped headers/connections, and local rate limiting remain enabled. Cloudflare Access does not protect a directly reachable origin.
