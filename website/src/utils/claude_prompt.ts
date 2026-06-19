import Anthropic from "@anthropic-ai/sdk"
import { ANTHROPIC_API_KEY, APPSTORE_ISSUER_ID, APPSTORE_PRIVATE_KEY, APPSTORE_CONNECT_ID } from "astro:env/server";
import type { Language } from "../types/types_global";
import jwt from "jsonwebtoken";


let cache: any = null;

async function getAppStoreReviews() {

    const token = jwt.sign({
        iss: APPSTORE_ISSUER_ID,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 20 * 60, // 20 min max
        aud: "appstoreconnect-v1",
        },
        APPSTORE_PRIVATE_KEY!,
        {
        algorithm: "ES256",
        keyid: APPSTORE_CONNECT_ID,
        }
    )

    const res = await fetch(`https://api.appstoreconnect.apple.com/v1/apps/6670214648/customerReviews`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
                
    const data = await res.json();

    if(!data){
        return
    }

    return data
}

export async function claude_prompt(language:Language){
    if (!cache) {
    
        const appstoreReviews = await getAppStoreReviews()

        const reviews = appstoreReviews.data.map(review => {
            return {
                rating: review.attributes.rating, 
                title: review.attributes.title,
                body: review.attributes.body,
                territory: review.attributes.territory,
                createdDate: review.attributes.createdDate,
                reviewerNickname: review.attributes.reviewerNickname
            }
        })

        const anthropic = new Anthropic({
            apiKey: ANTHROPIC_API_KEY,
        })
        
        const msg = await anthropic.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 20000,
            cache_control: { type: "ephemeral" },
            system: "Context are appstore reviews for a gun collection management app. You receive a stringified review JSON object array. Translate the title and body value string to each (swiss) French, (Swiss) Italian, (american) Englisch and German. Keep the incoming string verbatim for its respective language. return a new JSON object array with schema {rating: number, title: {de: string, fr: string, en: string, it: string}, body: {de: string, fr: string, en: string, it: string}, territory: string, createdDate: string, reviewerNickname: string, originalLanguage: [ISO 2 letter country code of input language]}. Respond with raw JSON only. No markdown, no backticks, no explanation.",
            messages: [
                {
                    "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": JSON.stringify(reviews)
                            }
                        ]
                }
            ],
        })

        const json = msg.content.filter(content => content.type === "text")[0].text
        cache = JSON.parse(json);
    } else {
        console.log("claude_prompt: returning cached response");
    }
    
    return cache
}