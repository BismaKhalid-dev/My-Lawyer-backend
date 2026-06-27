// Vercel ye file dhoondta hai jab aap "Root Directory: backend" set karte hain.
// Express app ko default export karna hota hai — Vercel khud isay
// serverless function ki tarah wrap kar deta hai, app.listen() ki
// zaroorat nahi.
import app from "../src/app.js";

export default app;