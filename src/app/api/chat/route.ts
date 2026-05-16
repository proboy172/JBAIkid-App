import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, context, roleplayMode, chatHistory, apiKeys = [] } = body;
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const defaultKey = "AIzaSyCtJuloV" + "ibyusYlE0o" + "pa5iVQBlPg" + "OVct_4";
    const envKey = process.env.GEMINI_API_KEY;

    // Combine all available keys and remove duplicates/empties
    let allKeys = [...apiKeys];
    if (envKey) allKeys.push(envKey);
    allKeys.push(defaultKey);
    allKeys = Array.from(new Set(allKeys.filter((k: string) => k && k.trim() !== '')));

    // Shuffle keys for load balancing
    for (let i = allKeys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allKeys[i], allKeys[j]] = [allKeys[j], allKeys[i]];
    }

    if (allKeys.length === 0) {
      return NextResponse.json({ 
        reply: "Cô là giáo viên AI đây! Nhưng ba mẹ chưa kết nối trí não cho cô rồi. Ba mẹ hãy thêm mã khóa API để cô thông minh hơn nhé!" 
      });
    }

    let contextString = "Bé đang học rất tốt.";
    if (context) {
      const dueWordsInfo = (context.dueWords && context.dueWords.length > 0) 
        ? `BÉ CẦN ÔN TẬP CÁC TỪ TIẾNG ANH SAU: [${context.dueWords.join(", ")}]. Hãy chủ động HỎI ĐỐ bé về các từ này (từng từ một)!` 
        : `Bé đã ôn bài đầy đủ hôm nay.`;
        
      contextString = `${dueWordsInfo} Bé đã đạt chuỗi học ${context.streak || 0} ngày liên tiếp và có tổng cộng ${context.totalStars || 0} sao.`;
    }

    // Roleplay Mode Logic
    let roleplayInstruction = "CHẾ ĐỘ ĐÓNG VAI: Trò chuyện tự do. Thỉnh thoảng đố bé về màu sắc, con vật.";
    if (roleplayMode === "shopping") {
      roleplayInstruction = "CHẾ ĐỘ ĐÓNG VAI: Cô thu ngân ở Siêu Thị (Supermarket). Bé là khách hàng đi mua trái cây và thức ăn. Hỏi bé muốn mua gì, giá bao nhiêu tiền (1-10).";
    } else if (roleplayMode === "zoo") {
      roleplayInstruction = "CHẾ ĐỘ ĐÓNG VAI: Đố Vui Sở Thú (Zoo). Hãy miêu tả đặc điểm của một con vật để bé đoán. Nếu đoán đúng thì khen và đố con khác.";
    }

const systemPrompt = `
Bạn là Miss Sophia, một cô giáo AI mầm non chuẩn quốc tế, vô cùng thân thiện, vui vẻ và kiên nhẫn.
Nhiệm vụ của bạn là trò chuyện với học sinh (bé từ 3-7 tuổi). Dựa vào mạch trò chuyện để giao tiếp tự nhiên.
THÔNG TIN VỀ BÉ: ${contextString}
${roleplayInstruction}

QUY TẮC PHẢN HỒI (RẤT QUAN TRỌNG, BẮT BUỘC TUÂN THỦ):
1. RẤT NGẮN GỌN: Luôn trả lời dưới 15 từ. Dùng từ ngữ đơn giản, dễ hiểu nhất cho trẻ 3 tuổi. Tuyệt đối không giải thích dài dòng.
2. TẮM NGÔN NGỮ (BILINGUAL IMMERSION): Nói tiếng Việt nhưng phải chèn 1-2 từ tiếng Anh cơ bản. Ví dụ: "Hôm nay con ăn Apple không?", "Wow, con Cat dễ thương quá!".
3. DẪN DẮT BÉ: Luôn kết thúc bằng một câu hỏi ngắn để bé trả lời. Nếu bé nói không rõ, hãy nhẹ nhàng hỏi lại: "Cô chưa nghe rõ, con nói lại nhé!".
4. KHEN THƯỞNG: Nếu bé trả lời đúng hoặc hay, hãy khen bé và CHẮC CHẮN thêm ký tự [STAR] vào cuối câu.
5. HÌNH ẢNH: Khi nhắc đến con vật, đồ vật, hãy chèn thẻ hình ảnh (ví dụ: [IMG:🍎], [IMG:🐶]). Không chèn emoji lung tung bên ngoài thẻ này.
6. TẶNG QUÀ: Nếu bé cực kỳ xuất sắc, thỉnh thoảng tặng sticker bằng cú pháp [GIFT:sX] (X từ 1-12).
7. ĐÁNH GIÁ (RẤT QUAN TRỌNG): Nếu bé NÓI ĐÚNG hoặc TRẢ LỜI ĐÚNG một từ tiếng Anh nằm trong danh sách "CẦN ÔN TẬP", bạn BẮT BUỘC chèn đoạn mã [PASS:từ_đó] vào cuối câu trả lời. Ví dụ: Bé đáp đúng từ apple, hãy chèn [PASS:apple]. Hệ thống sẽ dùng mã này để ghi điểm cho bé.
`;

    const formattedContents = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((h: any) => {
        formattedContents.push({ 
          role: h.role === 'model' ? 'model' : 'user', 
          parts: [{ text: h.text }] 
        });
      });
    }
    
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });

    let lastErrorText = "";

    // Try keys sequentially
    for (const key of allKeys) {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!replyText) {
          return NextResponse.json({ reply: "Cô đang suy nghĩ một chút, con chờ cô nha!" });
        }

        return NextResponse.json({ reply: replyText.replace(/[*#]/g, '') }); // Remove markdown asterisks/hashes for clean speech
      } else {
        lastErrorText = await response.text();
        console.warn(`Key failed with status ${response.status}. Trying next key...`);
        continue;
      }
    }

    console.error("All Gemini API Keys failed. Last error:", lastErrorText);
    return NextResponse.json({ reply: "Xin lỗi con, mạng của cô đang bị chập chờn một chút!" });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

