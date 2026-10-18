/**
 * VIDEO HEALTH MANAGER (Chống video lỗi & Tự động chữa lành)
 * -------------------------------------------------------------
 * 1. Ghi nhớ các video YouTube bị lỗi (101, 150, 100, private, deleted) vào localStorage.
 * 2. Tự động ẩn các video lỗi khỏi danh sách xem, feed gợi ý và tìm kiếm.
 * 3. Phát sự kiện (CustomEvent) để toàn bộ UI (VideosPage, SafeVideoModal, KaraokePlayer)
 *    lập tức phản ứng mà không cần reload trang.
 * 4. Tự động hết hạn (auto-expire) sau 14 ngày đề phòng lỗi mạng tạm thời hoặc video mở lại.
 */

const STORAGE_KEY = "jbaikid_unplayable_videos";
const CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 ngày

interface UnplayableEntry {
  timestamp: number;
  reason?: string;
}

type UnplayableMap = Record<string, UnplayableEntry>;

// Memory cache for fast synchronous access
let memoryMap: UnplayableMap | null = null;
const listeners = new Set<() => void>();

function loadFromStorage(): UnplayableMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UnplayableMap;
    const now = Date.now();
    const valid: UnplayableMap = {};
    let hasExpired = false;

    for (const [id, entry] of Object.entries(parsed)) {
      if (now - entry.timestamp < CACHE_TTL_MS) {
        valid[id] = entry;
      } else {
        hasExpired = true;
      }
    }

    if (hasExpired) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
    }
    return valid;
  } catch {
    return {};
  }
}

function saveToStorage(map: UnplayableMap): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

function getMap(): UnplayableMap {
  if (!memoryMap) {
    memoryMap = loadFromStorage();
  }
  return memoryMap;
}

/**
 * Đánh dấu một video YouTube là không khả dụng
 */
export function markVideoAsUnplayable(youtubeId?: string, reason = "YouTube embed error"): void {
  if (!youtubeId || typeof youtubeId !== "string") return;
  const cleanId = youtubeId.trim();
  if (!cleanId) return;

  const current = getMap();
  current[cleanId] = {
    timestamp: Date.now(),
    reason,
  };
  memoryMap = current;
  saveToStorage(current);

  // Notify local in-memory listeners
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {}
  });

  // Notify cross-tab / window
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent("jbaikid_video_health_change", { detail: { youtubeId: cleanId } }));
    } catch {}
  }
}

/**
 * Kiểm tra xem video YouTube có bị đánh dấu lỗi không
 */
export function isUnplayableVideo(youtubeId?: string): boolean {
  if (!youtubeId) return false;
  const current = getMap();
  return !!current[youtubeId];
}

/**
 * Lọc danh sách video để loại bỏ các video bị lỗi
 */
export function filterPlayableVideos<T extends { youtubeId?: string }>(items: T[]): T[] {
  if (!items || items.length === 0) return [];
  const current = getMap();
  return items.filter((item) => {
    if (!item.youtubeId) return true;
    return !current[item.youtubeId];
  });
}

/**
 * Đăng ký lắng nghe sự kiện thay đổi trạng thái video lỗi
 */
export function subscribeVideoHealth(listener: () => void): () => void {
  listeners.add(listener);

  let handleCustomEvent: ((e: any) => void) | null = null;
  if (typeof window !== "undefined") {
    handleCustomEvent = () => listener();
    window.addEventListener("jbaikid_video_health_change", handleCustomEvent);
    window.addEventListener("storage", handleCustomEvent);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined" && handleCustomEvent) {
      window.removeEventListener("jbaikid_video_health_change", handleCustomEvent);
      window.removeEventListener("storage", handleCustomEvent);
    }
  };
}

/**
 * Xóa cache video lỗi (dùng khi cần reset)
 */
export function clearUnplayableVideos(): void {
  memoryMap = {};
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent("jbaikid_video_health_change", { detail: { reset: true } }));
    } catch {}
  }
  listeners.forEach((fn) => fn());
}
