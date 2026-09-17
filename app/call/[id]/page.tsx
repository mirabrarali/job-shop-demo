import CallLive from "@/app/call/[id]/live";
export default async function CallPage({params}:{params:Promise<{id:string}>}){return <CallLive callId={(await params).id}/>}
