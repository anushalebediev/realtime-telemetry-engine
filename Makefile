######################################
# --- Native Environment Commands ---
######################################

# Run natively via Nx (Often faster for local development than Docker)
dev:
	npx nx run-many --target=serve --projects=telemetry-gateway,web-dashboard --parallel=2

# Install dependencies
install:
	npm install

# --- Utility Commands ---

# Wipe the Nx cache and remove Docker volumes
clean: down
	npx nx reset
	rm -rf node_modules
	npm install
