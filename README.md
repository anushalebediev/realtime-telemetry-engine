# Real-Time Telemetry Engine

> **Note:** This project is a Proof of Concept (PoC) built primarily as a sandbox to explore and learn modern frontend ecosystems, specifically React, TypeScript, and Nx monorepo management.

A full-stack, real-time telemetry dashboard designed to simulate, stream, and visualize continuous data streams (like CPU usage) with conditional rendering and low-latency updates. 

## 🏗️ Architecture & Tech Stack

This project is structured as an **Nx Monorepo**, maintaining a clear separation of concerns between the API and the client UI while sharing tooling and configurations.

**Frontend: web-dashboard**
* **React 19 & TypeScript 5:** For building a modular, type-safe user interface.
* **Recharts 3:** Used for building responsive, real-time visual charts (e.g., conditional color rendering for CPU thresholds).
* **Vite:** Fast, modern frontend tooling.

**Backend: telemetry-gateway**
* **NestJS 11:** Providing a robust, scalable backend architecture.
* **Socket.io 4:** Managing WebSocket connections for continuous, real-time telemetry data streaming.

**DevOps & Testing:**
* **Vitest & Playwright:** Configured for fast unit testing and end-to-end testing.
* **GitHub Actions / CI/CD:** Automated workflows to ensure code quality.

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v22+)
* [Docker](https://www.docker.com/) & Docker Compose

### Running via Docker (Recommended)

The easiest way to spin up both the telemetry backend and the React dashboard is using Docker Compose.

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/realtime-telemetry-engine.git](https://github.com/yourusername/realtime-telemetry-engine.git)
   cd realtime-telemetry-engine
   ```

2. Build and start the containers via make command
    ```bash
    make up
    ```

3. Access the application:
    - Dashboard: [localhost:4200](http://localhost:4200/)
    ![Screenshot of web-dashboard showing metrics and cpu utilization in a chart](/assets/images/web-dashboard.png)
    - API / WebSocket: [localhost:3000/api](http://localhost:3000/api)
    ![Screenshot of gateway api as seen on Postman](/assets/images/telemetry-gateway-api.png)
    

### Local Development (Nx)

If you wish to run the development servers directly via [Nx](https://nx.dev/) to leverage hot-module reloading:

1. Install dependencies:
    ```bash
    make install
    ```

2. Run frontend and backend via Nx:
    ```bash
    make dev
    ```
