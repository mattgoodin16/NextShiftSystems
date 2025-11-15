import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { conversation } = await req.json();

  const systemPrompt = `
You are NextShift Assistant, a friendly automation expert.
Company tagline: "Work Smarter. Automate Faster."
`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...conversation.map((m: any) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    })),
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    const data = await response.json();

    // LOG EVERYTHING
    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("OpenAI error:", data.error);
      return NextResponse.json({
        reply: `⚠️ OpenAI error: ${data.error.message}`,
      });
    }

    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "⚠️ No reply content returned.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({
      reply: "⚠️ Server error. Could not contact OpenAI.",
    });
  }
}
