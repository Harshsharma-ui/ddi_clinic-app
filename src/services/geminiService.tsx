/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Function to scan prescriptions using Groq API natively
export async function scanPrescription(base64Image: string) {
  const prompt = `
    You are a highly specialized medical OCR system designed to extract medication details from prescriptions.
    The input image may be a handwritten or printed prescription, often with messy handwriting or medical abbreviations.
    
    Your goal is to identify ALL medications mentioned and extract:
    1. Drug Name: The brand name or generic name.
    2. Dosage: The strength (e.g., 500mg, 10ml, 5mcg).
    3. Frequency: How often it is taken (e.g., OD, BID, TID, QID, 1-0-1, 1-1-1, Once daily, every 8 hours).
    4. Duration: How long the medication is prescribed for (e.g., 5 days, 1 month, 1 week).

    Special Instructions:
    - Look for common Indian and Global drug names.
    - Interpret "1-0-1" as "Twice a day (Morning and Night)".
    - Interpret "1-1-1" as "Three times a day".
    - Interpret "1-0-0" as "Once daily (Morning)".
    - Interpret "0-0-1" as "Once daily (Night)".
    - Be extremely careful with drug names; if a name is partially legible, use your medical knowledge to suggest the most likely drug.
    - If multiple drugs are listed, extract each one separately.

    Output Format:
    Return ONLY a JSON array of objects. Each object MUST have these keys: "name", "dosage", "frequency", "duration".
    Example: [{"name": "Augmentin", "dosage": "625mg", "frequency": "BID", "duration": "5 days"}]
    If no medications are found, return [].
    
    CRITICAL: Do not include any preamble, markdown formatting (like \`\`\`json), or post-text. Just the raw JSON array.
  `;

  try {
    // We prioritize VITE_GEMINI_API_KEY since Groq deprecated their vision models
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' && process.env.GEMINI_API_KEY);
    
    if (!apiKey) {
      console.warn("Gemini API key missing. A VITE_GEMINI_API_KEY is required for analysis.");
      throw new Error("API key is missing. Please add VITE_GEMINI_API_KEY to your Vercel Environment Variables.");
    }

    // Extract raw base64 and mime type if prefixed
    const match = base64Image.match(/^data:(image\/[a-zA-Z]*);base64,(.*)$/);
    const mimeType = match ? match[1] : "image/jpeg";
    const rawBase64 = match ? match[2] : base64Image;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: rawBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Call Failed:", errorText);
      
      let errorMessage = "Failed to process image with Gemini.";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorText;
      } catch(e) {}
      
      throw new Error(`Gemini Error: ${errorMessage}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    
    // Clean potential markdown and extract JSON array
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const cleanedText = jsonMatch ? jsonMatch[0] : text.replace(/```json|```/g, "").trim();
    
    try {
      return JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse JSON from AI response:", cleanedText);
      throw new Error("OCR could not confidently read the text. Please try taking a clearer photo or enter manually.");
    }
  } catch (error: any) {
    console.error("OCR Scan Error:", error);
    throw new Error(error.message || "Failed to scan prescription. Please try again or enter manually.");
  }
}
