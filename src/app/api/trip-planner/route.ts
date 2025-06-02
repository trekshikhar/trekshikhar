// import { jsonrepair } from "jsonrepair";
// import { NextResponse } from "next/server";

// // Helper: Validate itinerary
// function validateItinerary(itinerary: any, tripDays: number): boolean {
//   for (let i = 1; i <= tripDays; i++) {
//     const day = itinerary[`day_${i}`];
//     if (!day || typeof day.title !== "string" || !Array.isArray(day.activities)) {
//       return false;
//     }
//   }
//   return true;
// }

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { trekId, budget, tripDays, location } = body;

//   const budgetNum = Number(budget);
//   const tripDaysNum = Number(tripDays);
//   const travelMode = ["train", "car"]; // default

//   const prompt = `
// Plan a ${tripDaysNum}-day trek from ${location} for the ${trekId}.

// Budget: ₹${budgetNum}
// Travel mode: ${travelMode.join(", ")}

// Return ONLY valid JSON object with this structure:
// {
//   "trek_name": "string",
//   "location": "string",
//   "short_description": "string",
//   "budget_breakdown": {
//     "total_days": number,
//     "total_budget": number,
//     "sections": [{ "title": "string", "amount": number }],
//     "total_cost": number,
//     "user_budget": number,
//     "within_budget": boolean
//   },
//   "best_hotels": [{ "name": "string", "location": "string", "price": number, "rating": number }],
//   "local_dishes_to_try": ["string"],
//   "recommendations": ["string"],
//   "itinerary": {
//     "day_1": { "title": "string", "activities": ["string"] },
//     ...
//     "day_${tripDaysNum}": { "title": "string", "activities": ["string"] }
//   }
// }

// Rules:
// - No text, explanation, markdown, or comments.
// - Only JSON inside double quotes.
// - No trailing commas.
// - Validate your output.
//   `.trim();

//   try {
//     const key = "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"; // Secure this in env

//     const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${key}`,
//       },
//       body: JSON.stringify({
//         model: "llama3-70b-8192",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are a strict travel planner AI.

// Return ONLY a valid JSON object. No explanations. No markdown. No text.
//             `.trim(),
//           },
//           { role: "user", content: prompt },
//         ],
//         temperature: 0.7,
//       }),
//     });

//     const result = await groqRes.json();
//     console.log("Full Groq response:", JSON.stringify(result, null, 2));

//     const content = result?.choices?.[0]?.message?.content;
//     if (!content) {
//       return NextResponse.json({ error: "Empty response from Groq", result }, { status: 500 });
//     }

//     let parsed: any;

//     // 1. Attempt direct parse
//     try {
//       parsed = JSON.parse(content);
//     } catch (initialErr) {
//       console.warn("Initial JSON.parse failed. Trying cleanup...");

//       // 2. Clean up obvious syntax issues
//       const cleaned = content
//         .replace(/“|”/g, '"') // smart quotes
//         .replace(/,\s*}/g, '}') // trailing commas
//         .replace(/,\s*]/g, ']') // trailing commas
//         .replace(/[\r\n]+/g, ' ') // flatten newlines
//         .trim();

//       try {
//         parsed = JSON.parse(cleaned);
//       } catch (jsonrepairTry) {
//         console.warn("JSON cleanup failed. Trying jsonrepair...");
//         try {
//           const repaired = jsonrepair(content);
//           parsed = JSON.parse(repaired);
//         } catch (finalErr) {
//           console.error("Final JSON repair failed:", finalErr);
//           return NextResponse.json(
//             { error: "Could not parse or repair JSON", originalContent: content },
//             { status: 500 }
//           );
//         }
//       }
//     }

//     if (!parsed?.itinerary || !validateItinerary(parsed.itinerary, tripDaysNum)) {
//       return NextResponse.json(
//         { error: "Parsed but invalid itinerary structure", parsed },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(parsed);

//   } catch (err) {
//     console.error("Groq API Error:", err);
//     return NextResponse.json(
//       {
//         error: "Groq API call failed",
//         details: err instanceof Error ? err.message : String(err),
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { trekId, budget, tripDays, location } = body;

  const budgetNum = Number(budget);
  const tripDaysNum = Number(tripDays);
  const travelMode = ["train", "car"];

  const prompt = `
Plan a ${tripDaysNum}-day trek for the ${trekId} starting from ${location}.
Budget: ₹${budgetNum}
Travel Mode: ${travelMode.join(", ")}

Return the full plan as simple, readable text.

Include:
- Trek name, location, short description
- Budget breakdown (list format)
- Recommended hotels with price and ratings
- Local dishes to try
- Tips or recommendations
- Day-wise itinerary (clearly mention Day 1, Day 2, etc.)

Use clear bullet points or headings. DO NOT return JSON or any code — only plain English text.
`.trim();

  try {
    const key = "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"; 

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: `You are a travel planner AI. Respond with plain text. No JSON. No markdown.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const result = await groqRes.json();
    const content = result?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "No content from Groq", result }, { status: 500 });
    }

    // Return raw text
    return NextResponse.json({ text: content });

  } catch (err) {
    console.error("Groq API error:", err);
    return NextResponse.json(
      {
        error: "Groq API failed",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
