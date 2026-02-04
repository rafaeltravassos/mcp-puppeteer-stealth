import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// Ativa o plugin de invisibilidade
puppeteer.use(StealthPlugin());

const app = express();
const BROWSER_WS_ENDPOINT = process.env.BROWSER_WS_ENDPOINT || "ws://browserless-agencia:3000";

const server = new Server({
    name: "zzapp-puppeteer-stealth",
    version: "1.0.0",
}, {
    capabilities: { tools: {} },
});

let transport = null;

app.get("/sse", async (req, res) => {
    console.log("🚀 Minerador de Dados (Puppeteer) Conectado!");
    transport = new SSEServerTransport("/messages", res);
    await server.connect(transport);
});

app.post("/messages", async (req, res) => {
    if (transport) {
        await transport.handlePostMessage(req, res);
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Puppeteer Stealth rodando na porta ${PORT}`);
});
