# .PHONY ensures Make doesn't confuse these commands with actual file names
.PHONY: up down build logs clean dev install clean

# --- Docker Commands ---

# Build and start the containers in the background (detached mode)
up:
	docker compose up --build -d

# Stop and remove the containers
down:
	docker compose down

# Rebuild the images without starting them
build:
	docker compose build

# Follow the logs of both containers in real-time
logs:
	docker compose logs -f

# Stop containers and remove all associated volumes (useful for a hard reset)
clean-docker:
	docker compose down -v --rmi all

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

# Wipe the Nx cache
clean:
	npx nx reset
	rm -rf node_modules
	npm install

# Wipes Nx cache and cleans docker volumes
clean-all: clean clean-docker
