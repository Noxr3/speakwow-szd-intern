'use server'

import { kv } from "@vercel/kv"
import { unstable_noStore as noStore } from 'next/cache';
export async function setCurrentTextbook(userId:string,bookId:string) {
    const res = await kv.hset(userId,{textbook:bookId})
    return res
}

export async function setOrgTextbook(orgId:string,bookId:string) {
    const res = await kv.hset('org:'+orgId,{textbook:bookId})
    return res
}

export async function getCurrentTextbook(userId:string) {
    noStore()
    const bookId = await kv.hget(userId,'textbook')
    return bookId
}
