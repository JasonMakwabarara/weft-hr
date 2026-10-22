# Weft HR

Weft HR is the attendance, leave, and payroll application. It signs in through the SpiderNetOS API and keeps the same appearance, settings, and roles.

People, attendance (including Jetson register sync), leave, payroll, and each person's own record live here. SpiderNetOS still opens the same HR pages inside its cockpit, without the Jetson screens.

## Run

The SpiderNetOS API must already be running.

```bash
npm install
npm run dev
```

Open http://127.0.0.1:3010. Set `VITE_API_URL` in `.env` when the API is not on `http://127.0.0.1:8000`.
