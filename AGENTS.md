# Repository guide

Read [docs/README.md](docs/README.md) before changing this repository. It is the map for architecture, Docker operations, and release history.

## Required for every change

1. Keep the service intentionally small: one plaintext `GET /` endpoint. Do not add routes, dependencies, state, or external services without explicit approval.
2. Update the relevant file in `docs/` when behavior, security, deployment, configuration, or structure changes.
3. Add a concise entry under `Unreleased` in [CHANGELOG.md](CHANGELOG.md).
4. Before a release, move `Unreleased` entries to a dated version section and increment `package.json` using the policy in [docs/README.md](docs/README.md).
5. Run `npm test` and `git diff --check`. Run `docker compose config` when Docker is available and Compose changed.

Never commit `.env`, `certs/`, private keys, certificates, or generated runtime files.
