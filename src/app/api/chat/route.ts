import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, context, roleplayMode, chatHistory } = body;
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const userKey = "AIzaSyCtJuloV" + "ibyusYlE0o" + "pa5iVQBlPg" + "OVct_4";
    const apiKey = process.env.GEMINI_API_KEY || userKey;

    if (!apiKey) {
      return NextResponse.json({ 
        reply: "Cô là giáo viên AI đây! Nhưng ba mẹ chưa kết nối trí não cho cô rồi. Ba mẹ hãy thêm mã khóa API để cô thông minh hơn nhé!" 
      });
    }

    let contextString = "Bé đang học rất tốt.";
    if (context) {
      contextString = `Hôm nay bé có ${context.dueCount || 0} từ vựng cần ôn tập. Bé đã đạt chuỗi học ${context.streak || 0} ngày liên tiếp và có tổng cộng ${context.totalStars || 0} sao.`;
    }

    let historyString = "";
    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      historyString = "LỊCH SỬ TRÒ CHUYỆN GẦN ĐÂY (Để bạn không lặp lại và hiểu ngữ cảnh):\n" + 
        chatHistory.map((h: any) => `${h.role === 'user' ? 'Bé' : 'Bạn (Cô giáo)'}: ${h.text}`).join('\n');
    }

    // Roleplay Mode Logic
    let roleplayInstruction = "CHẾ ĐỘ ĐÓNG VAI: Trò chuyện tự do. Thỉnh thoảng đố bé về màu sắc, con vật.";
    if (roleplayMode === "shopping") {
      roleplayInstruction = "CHẾ ĐỘ ĐÓNG VAI: Cô thu ngân ở Siêu Thị (Supermarket). Bé là khách hàng đi mua trái cây và thức ăn. Hỏi bé muốn mua gì, giá bao nhiêu tiền (1-10).";
    } else if (roleplayMode === "zoo") {
      roleplayInstruction = "CHẾ ĐỘ ĐÓNG VAI: Đố Vui Sở Thú (Zoo). Hãy miêu tả đặc điểm của một con vật để bé đoán. Nếu đoán đúng thì khen và đố con khác.";
    }

const systemPrompt = `
Bạn là một cô giáo AI mầm non chuẩn quốc tế, vô cùng thân thiện và kiên nhẫn.
Nhiệm vụ của bạn là trò chuyện với học sinh (bé từ 3-7 tuổi). Dựa vào LỊCH SỬ TRÒ CHUYỆN để giao tiếp liền mạch, tự nhiên như người thật.
THÔNG TIN VỀ BÉ: ${contextString}
${roleplayInstruction}

QUY TẮC PHẢN HỒI (RẤT QUAN TRỌNG):
1. NGẮN GỌN: Luôn trả lời dưới 25 từ. Bé rất nhỏ nên sẽ không nghe được câu dài.
2. TẮM NGÔN NGỮ (BILINGUAL IMMERSION): Phải nói TIẾNG VIỆT pha trộn tự nhiên với TỪ VỰNG TIẾNG ANH (Code-switching). Ví dụ: "Hôm nay mình đi Supermarket nha. Con muốn mua Apple hay Banana?". TUYỆT ĐỐI không nói 100% tiếng Anh hoặc 100% tiếng Việt.
3. Nếu bé nói không rõ nghĩa, hãy động viên bé nói lại.
4. KHEN THƯỞNG: Nếu bé trả lời đúng, hãy khen bé và CHẮC CHẮN thêm ký tự [STAR] vào cuối câu trả lời.
5. HÌNH ẢNH (MULTIMODAL): Khi nhắc đến đồ vật/con vật, hãy chèn mã EMOJI, ví dụ: [IMG:🍎], [IMG:🐶].
6. TẶNG QUÀ (GIFTING): Nếu bé có một cuộc trò chuyện xuất sắc, hoặc đoán trúng liên tiếp, hãy tạo bất ngờ bằng cách TẶNG STICKER cho bé. Cú pháp: [GIFT:sX] với X là số ngẫu nhiên từ 1 đến 12 (ví dụ: [GIFT:s4], [GIFT:s10]). Chỉ tặng 1 lần trong những lúc bé thật sự xuất sắc.
`;

    // Call Gemini API directly via fetch
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt + "\\n\\n" + historyString + "\\n\\nBé vừa nói: " + message }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
        }
      })
    });

    if (!response.ok) {
      console.error("Gemini API Error", await response.text());
      return NextResponse.json({ reply: "Xin lỗi con, mạng của cô đang bị chập chờn một chút!" });
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      return NextResponse.json({ reply: "Cô đang suy nghĩ một chút, con chờ cô nha!" });
    }

    return NextResponse.json({ reply: replyText.replace(/\\*/g, '') }); // Remove markdown asterisks for clean speech
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

