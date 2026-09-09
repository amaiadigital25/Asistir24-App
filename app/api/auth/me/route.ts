import { clearSessionCookie, getSession } from "../../../../lib/auth";
export async function GET(request:Request){const user=await getSession(request);return user?Response.json({user}):Response.json({user:null},{status:401})}
export async function DELETE(){return new Response(JSON.stringify({ok:true}),{headers:{"content-type":"application/json","set-cookie":clearSessionCookie()}})}
