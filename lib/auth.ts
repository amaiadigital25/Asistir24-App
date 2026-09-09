import { env } from "cloudflare:workers";
import { and, eq, gt } from "drizzle-orm";
import { getDb } from "../db";
import { accessUsers, sessions } from "../db/schema";

export type AppRole = "admin" | "operator" | "provider";
export function normalizePhone(value:string){const digits=value.replace(/\D/g,"");if(digits.startsWith("54"))return `+${digits}`;if(digits.startsWith("0"))return `+54${digits.slice(1)}`;return `+54${digits}`}
function cookie(request:Request,name:string){return request.headers.get("cookie")?.split(";").map(v=>v.trim()).find(v=>v.startsWith(`${name}=`))?.slice(name.length+1)}
async function hash(value:string){const bytes=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value));return [...new Uint8Array(bytes)].map(b=>b.toString(16).padStart(2,"0")).join("")}
export async function getSession(request:Request){const token=cookie(request,"a24_session");if(!token)return null;const tokenHash=await hash(token);const rows=await getDb().select({id:accessUsers.id,phone:accessUsers.phone,name:accessUsers.displayName,role:accessUsers.role}).from(sessions).innerJoin(accessUsers,eq(sessions.userId,accessUsers.id)).where(and(eq(sessions.tokenHash,tokenHash),gt(sessions.expiresAt,new Date().toISOString()),eq(accessUsers.active,true))).limit(1);return rows[0]||null}
export async function requireRole(request:Request,roles:AppRole[]){const user=await getSession(request);return user&&roles.includes(user.role)?user:null}
export async function createSession(userId:number){const token=crypto.randomUUID()+crypto.randomUUID();const tokenHash=await hash(token),expires=new Date(Date.now()+30*86400000);await getDb().insert(sessions).values({userId,tokenHash,expiresAt:expires.toISOString()});return {token,expires}}
export function sessionCookie(token:string,expires:Date){return `a24_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${expires.toUTCString()}`}
export function clearSessionCookie(){return "a24_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"}
export function twilioConfig(){if(!env.TWILIO_ACCOUNT_SID||!env.TWILIO_AUTH_TOKEN||!env.TWILIO_VERIFY_SERVICE_SID)throw new Error("WhatsApp todavía no está configurado");return {accountSid:env.TWILIO_ACCOUNT_SID,authToken:env.TWILIO_AUTH_TOKEN,serviceSid:env.TWILIO_VERIFY_SERVICE_SID}}
