# URL Checker

A lightweight React and TypeScript app that validates URLs in real-time. 

**What it does:**
* **Instant Validation:** Checks URL formatting (protocol, domain) instantly as you type.
* **Debounced Checks:** Waits 500ms after you stop typing to prevent server spam.
* **Mock Verification:** Queries a simulated backend that adds a **random artificial delay (between 0 and 1.5 seconds)** and determines if the URL "exists" as a file or path. It simulates a non-existent URL failure if the path contains any of these specific test words: `not-here`, `inexistent`, `santa-claus`, or `easter-bunny`.

**Data Flow:**
1. User types input -> Component State updates.
2. Synchronous validation evaluates the raw string.
3. If structurally valid, the debouncer starts a 500ms timer.
4. On timeout, an asynchronous request fires to the Mock Service.
5. Service resolves after 0–1.5s -> Component State updates with the final result.

## 💻 Installation & Setup

### 1. Install dependencies:

Make sure you have Node.js installed, then run:

```bash
npm install
```

### 2. Start the development server:

```bash
npm run dev
```
This will spin up a local development server. Check your terminal for the exact local URL (usually `http://localhost:5173`).