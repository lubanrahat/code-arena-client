"use server";

import axios from "axios";
import fs from "fs";

export const verifyPaymentSession = async (sessionId: string) => {
  try {
    console.log("[SERVER ACTION] verifyPaymentSession called for sessionId:", sessionId);
    
    // Hardcoded to ensure it reaches the backend, bypassing any httpClient configs
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://code-arena-server.vercel.app/api/v1";
    console.log("[SERVER ACTION] Using API URL:", API_BASE);
    
    // We do NOT use tokens/cookies here because the user is returning from Stripe 
    // and SameSite=Strict drops their cookies. The endpoint is open.
    const response = await axios.post(`${API_BASE}/payment/verify`, { sessionId }, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000 
    });
    
    const logPath = process.cwd() + "/server-action-log.txt";
    const logMsg = `[SUCCESS] session=${sessionId}, status=${response.status}\n`;
    fs.appendFileSync(logPath, logMsg);
    console.log("[SERVER ACTION] Got response from backend:", response.status);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const logPath = process.cwd() + "/server-action-log.txt";
    const errorMsg = error.response
      ? `[ERROR] Backend returned: ${error.response.status} ${JSON.stringify(error.response.data)}\n`
      : `[ERROR] ${error.message}\n`;
    fs.appendFileSync(logPath, errorMsg);
    console.error("[SERVER ACTION] Error verifying session:");
    if (error.response) {
      console.error("Backend returned:", error.response.status, error.response.data);
    } else {
      console.error(error.message);
    }
    throw new Error("Failed to verify payment session: " + error.message);
  }
};
