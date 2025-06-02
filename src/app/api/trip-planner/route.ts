

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
