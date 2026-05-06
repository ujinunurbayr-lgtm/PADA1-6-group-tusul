"use client";
"useState";
"useMemo";
"useEffect";
"onClick";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  MapPin,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Eye,
  MessageCircle,
  ThumbsUp,
  X,
  Upload,
  Navigation,
  Layers,
  Activity,
  Users,
  Award,
  Zap,
  Send,
  ArrowRight,
  Menu,
  Building2,
  BarChart3,
  Download,
  FileText,
  Quote,
  ShieldCheck,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  Lock,
  Mail,
  ChevronDown,
  Heart,
  CheckCircle,
  Trash2,
  ImageIcon,
} from "lucide-react";

// =============================================================
// DATA
// =============================================================

const DISTRICTS = [
  {
    id: "sh",
    name: "Сүхбаатар",
    issues: 47,
    resolved: 18,
    x: 52,
    y: 38,
    size: 14,
  },
  {
    id: "ch",
    name: "Чингэлтэй",
    issues: 62,
    resolved: 21,
    x: 48,
    y: 26,
    size: 18,
  },
  {
    id: "bg",
    name: "Баянгол",
    issues: 89,
    resolved: 34,
    x: 36,
    y: 48,
    size: 22,
  },
  {
    id: "bz",
    name: "Баянзүрх",
    issues: 134,
    resolved: 41,
    x: 68,
    y: 50,
    size: 28,
  },
  {
    id: "so",
    name: "Сонгинохайрхан",
    issues: 73,
    resolved: 22,
    x: 18,
    y: 56,
    size: 20,
  },
  {
    id: "hu",
    name: "Хан-Уул",
    issues: 58,
    resolved: 24,
    x: 42,
    y: 70,
    size: 17,
  },
  { id: "na", name: "Налайх", issues: 12, resolved: 7, x: 86, y: 76, size: 9 },
];

// Rough polygon shapes for each district (approximate borders for visual)
const DISTRICT_SHAPES = {
  sh: "M 46,32 L 58,30 L 62,38 L 58,46 L 48,46 L 44,40 Z",
  ch: "M 38,16 L 58,14 L 60,24 L 56,30 L 46,30 L 40,26 Z",
  bg: "M 26,40 L 44,40 L 46,52 L 38,58 L 28,56 L 24,48 Z",
  bz: "M 60,40 L 78,42 L 82,52 L 76,60 L 64,58 L 60,50 Z",
  so: "M 4,46 L 24,48 L 26,60 L 18,68 L 8,64 L 2,54 Z",
  hu: "M 32,60 L 52,60 L 54,76 L 44,80 L 34,78 L 28,68 Z",
  na: "M 80,68 L 92,70 L 94,80 L 86,84 L 78,80 L 78,72 Z",
};

const KHOROOS_BY_DISTRICT = {
  sh: [
    "1-р хороо",
    "2-р хороо",
    "3-р хороо",
    "5-р хороо",
    "6-р хороо",
    "8-р хороо",
  ],
  ch: [
    "4-р хороо",
    "5-р хороо",
    "11-р хороо",
    "13-р хороо",
    "16-р хороо",
    "18-р хороо",
  ],
  bg: [
    "7-р хороо",
    "10-р хороо",
    "12-р хороо",
    "15-р хороо",
    "20-р хороо",
    "23-р хороо",
  ],
  bz: [
    "8-р хороо",
    "13-р хороо",
    "14-р хороо",
    "17-р хороо",
    "23-р хороо",
    "26-р хороо",
    "28-р хороо",
  ],
  so: [
    "3-р хороо",
    "9-р хороо",
    "21-р хороо",
    "27-р хороо",
    "29-р хороо",
    "32-р хороо",
  ],
  hu: ["1-р хороо", "5-р хороо", "11-р хороо", "13-р хороо", "16-р хороо"],
  na: ["1-р хороо", "2-р хороо", "3-р хороо"],
};

const CATEGORIES = [
  { id: "road", label: "Эвдэрсэн зам", icon: "🛣", color: "#C84B31" },
  { id: "light", label: "Гэрэлгүй гудамж", icon: "💡", color: "#E08A2A" },
  { id: "trash", label: "Хог хаягдал", icon: "🗑", color: "#5C8A3A" },
  { id: "pothole", label: "Нүх, цөмөрхий", icon: "⚠", color: "#7A3E9D" },
  {
    id: "sidewalk",
    label: "Явган замын асуудал",
    icon: "🚶",
    color: "#2D6A8E",
  },
  { id: "park", label: "Цэцэрлэг, талбай", icon: "🌳", color: "#3A8A5C" },
];

const INITIAL_ISSUES = [
  {
    id: 1,
    title: "Энхтайваны өргөн чөлөөн дээрх том нүх",
    category: "pothole",
    district: "Сүхбаатар",
    districtId: "sh",
    address: "Энхтайваны өргөн чөлөө 12",
    status: "pending",
    votes: 47,
    liked: false,
    time: "2 цагийн өмнө",
    reporter: "Б.Ариунаа",
    description:
      "Их сургуулийн зүүн талд том нүх үүсээд бараг хагас сар болж байна. Машин эвдрэх аюултай.",
    image: "pothole",
    comments: [
      {
        user: "Т.Энх",
        text: "Энэ замаар өдөр болгон явдаг, үнэхээр аюултай.",
        time: "1 цагийн өмнө",
      },
      {
        user: "Г.Сараа",
        text: "Манай машины дугуй цоорсон энд.",
        time: "30 минутын өмнө",
      },
    ],
  },
  {
    id: 2,
    title: "Нарны зам дагуу гэрэл асахгүй байна",
    category: "light",
    district: "Баянзүрх",
    districtId: "bz",
    address: "Нарны зам, 13-р хороо",
    status: "in_progress",
    votes: 89,
    liked: false,
    time: "1 өдрийн өмнө",
    reporter: "Д.Ган-Эрдэнэ",
    description:
      "Нарны замын 4 гэрэлтүүлэг сар гаран асаагүй. Орой явахад аюултай.",
    image: "streetlight",
    comments: [
      {
        user: "О.Бат",
        text: "Энэ хэсэгт орой алхах нь айдастай болсон.",
        time: "5 цагийн өмнө",
      },
    ],
  },
  {
    id: 3,
    title: "Хог цуглуулагдаагүй удаж байна",
    category: "trash",
    district: "Баянгол",
    districtId: "bg",
    address: "3-р хороолол, 22-р байр",
    status: "resolved",
    votes: 134,
    liked: false,
    time: "3 өдрийн өмнө",
    reporter: "С.Мөнхзул",
    description:
      "Хогийн машин сүүлийн 2 долоо хоног ирээгүй. Үнэр маш муу болсон.",
    image: "trash",
    comments: [],
  },
  {
    id: 4,
    title: "Явган замын чулуу эвдэрсэн",
    category: "sidewalk",
    district: "Чингэлтэй",
    districtId: "ch",
    address: "Тээврийн товчоо орчим",
    status: "pending",
    votes: 28,
    liked: false,
    time: "5 цагийн өмнө",
    reporter: "Т.Билгүүн",
    description:
      "Тээврийн товчооноос их дэлгүүр хүртэлх явган зам бүх чулуу нь товойсон.",
    image: "sidewalk",
    comments: [],
  },
];

// =============================================================
// EXIF GPS PARSER (inline, no external library)
// Reads GPS coordinates from JPEG EXIF metadata
// =============================================================

async function parseExifGPS(file) {
  try {
    const buffer = await file.arrayBuffer();
    const view = new DataView(buffer);

    if (view.byteLength < 4) return null;
    if (view.getUint16(0, false) !== 0xffd8) return null; // not JPEG

    let offset = 2;
    while (offset < view.byteLength - 4) {
      const marker = view.getUint16(offset, false);
      offset += 2;

      if (marker === 0xffe1) {
        // APP1 - EXIF
        const size = view.getUint16(offset, false);
        offset += 2;

        if (view.getUint32(offset, false) !== 0x45786966) {
          offset += size - 2;
          continue;
        }
        offset += 6; // skip "Exif\0\0"

        const tiffStart = offset;
        const byteOrder = view.getUint16(tiffStart, false);
        const little = byteOrder === 0x4949;
        const get16 = (o) => view.getUint16(o, little);
        const get32 = (o) => view.getUint32(o, little);

        if (get16(tiffStart + 2) !== 0x002a) return null;
        const ifd0Offset = get32(tiffStart + 4);
        const ifd0 = tiffStart + ifd0Offset;
        const numEntries = get16(ifd0);

        let gpsIfdOffset = null;
        for (let i = 0; i < numEntries; i++) {
          const entry = ifd0 + 2 + i * 12;
          if (get16(entry) === 0x8825) {
            gpsIfdOffset = get32(entry + 8);
            break;
          }
        }
        if (!gpsIfdOffset) return null;

        const gpsIfd = tiffStart + gpsIfdOffset;
        const numGps = get16(gpsIfd);
        let latRef = null,
          lat = null,
          lonRef = null,
          lon = null;

        for (let i = 0; i < numGps; i++) {
          const entry = gpsIfd + 2 + i * 12;
          const tag = get16(entry);
          const valOff = get32(entry + 8);

          if (tag === 0x0001) {
            latRef = String.fromCharCode(view.getUint8(entry + 8));
          } else if (tag === 0x0002) {
            const o = tiffStart + valOff;
            const d = get32(o) / get32(o + 4);
            const m = get32(o + 8) / get32(o + 12);
            const s = get32(o + 16) / get32(o + 20);
            lat = d + m / 60 + s / 3600;
          } else if (tag === 0x0003) {
            lonRef = String.fromCharCode(view.getUint8(entry + 8));
          } else if (tag === 0x0004) {
            const o = tiffStart + valOff;
            const d = get32(o) / get32(o + 4);
            const m = get32(o + 8) / get32(o + 12);
            const s = get32(o + 16) / get32(o + 20);
            lon = d + m / 60 + s / 3600;
          }
        }

        if (lat !== null && lon !== null) {
          return {
            lat: latRef === "S" ? -lat : lat,
            lon: lonRef === "W" ? -lon : lon,
            source: "exif",
          };
        }
        return null;
      }

      const segSize = view.getUint16(offset, false);
      offset += segSize;
    }
    return null;
  } catch (e) {
    return null;
  }
}

// Get current location via browser geolocation (fallback)
function getBrowserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          source: "browser",
        });
      },
      () => resolve(null),
      { timeout: 5000, enableHighAccuracy: true },
    );
  });
}

// Approximate UB district from coordinates (very rough)
function guessDistrict(lat, lon) {
  if (!lat || !lon) return "Сүхбаатар";
  // Very rough mapping based on rough lat/lon ranges
  if (lon > 107.0) return "Налайх";
  if (lat > 47.95) return "Чингэлтэй";
  if (lat < 47.88) return "Хан-Уул";
  if (lon < 106.83) return "Сонгинохайрхан";
  if (lon < 106.89) return "Баянгол";
  if (lon > 106.95) return "Баянзүрх";
  return "Сүхбаатар";
}

// =============================================================
// MAIN COMPONENT
// =============================================================

export default function ZasaaraiApp() {
  // Routing via URL hash (enables browser back button)
  const [view, setViewState] = useState("home");
  const navigate = useCallback((v) => {
    if (typeof window !== "undefined") {
      window.location.hash = v;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      const h = window.location.hash.replace("#", "") || "home";
      setViewState(h);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handler);
    handler();
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  // Theme
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("zasaarai-theme");
    if (saved) setTheme(saved);
  }, []);
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("zasaarai-theme", next);
    }
  };

  // Profile
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Болдоо",
    fullName: "Б.Болдоо",
    email: "boldoo@example.com",
    phone: "+976 9911-2233",
    avatar: "Б",
    district: "Сүхбаатар",
    reportsCount: 12,
    resolvedCount: 5,
    tokens: 340,
    joinedDate: "2026-03-15",
    bio: "УБ хотыг сайжруулахад хувь нэмрээ оруулдаг иргэн.",
  });

  // Issues state (likes & comments are mutable)
  const [issues, setIssues] = useState(INITIAL_ISSUES);

  // Modal/UI state
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Filter state for map
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedKhoroos, setSelectedKhoroos] = useState({});
  const [mapLayer, setMapLayer] = useState("default"); // default | satellite | minimal | heat

  const stats = useMemo(() => {
    const total = DISTRICTS.reduce((s, d) => s + d.issues, 0);
    const resolved = DISTRICTS.reduce((s, d) => s + d.resolved, 0);
    return { total, resolved, rate: Math.round((resolved / total) * 100) };
  }, []);

  // Toast helper
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Like toggle
  const toggleLike = useCallback((issueId) => {
    setIssues((prev) =>
      prev.map((i) =>
        i.id === issueId
          ? {
              ...i,
              liked: !i.liked,
              votes: i.liked ? i.votes - 1 : i.votes + 1,
            }
          : i,
      ),
    );
  }, []);

  // Add comment
  const addComment = useCallback((issueId, text) => {
    setIssues((prev) =>
      prev.map((i) =>
        i.id === issueId
          ? {
              ...i,
              comments: [...i.comments, { user: "Та", text, time: "сая" }],
            }
          : i,
      ),
    );
  }, []);

  // Selected issue with fresh data
  const liveSelectedIssue = useMemo(() => {
    if (!selectedIssue) return null;
    return issues.find((i) => i.id === selectedIssue.id) || selectedIssue;
  }, [selectedIssue, issues]);

  // Add new issue from submit
  const addNewIssue = useCallback(
    (newIssue) => {
      const issue = {
        id: Date.now(),
        title: newIssue.title,
        category: newIssue.category,
        district: newIssue.district || "Сүхбаатар",
        districtId:
          DISTRICTS.find((d) => d.name === newIssue.district)?.id || "sh",
        address: newIssue.address || "",
        status: "pending",
        votes: 0,
        liked: false,
        time: "сая",
        reporter: profile.fullName,
        description: newIssue.description,
        image: newIssue.imageUrl || newIssue.category,
        imageUrl: newIssue.imageUrl,
        coords: newIssue.coords,
        comments: [],
      };
      setIssues((prev) => [issue, ...prev]);
      setProfile((p) => ({
        ...p,
        reportsCount: p.reportsCount + 1,
        tokens: p.tokens + 10,
      }));
      showToast("Амжилттай илгээгдлээ! +10 token", "success");
    },
    [profile.fullName, showToast],
  );

  // Theme variables
  const t = theme === "dark" ? darkTheme : lightTheme;

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300"
      style={{
        ...themeVars(t),
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800;9..144,900&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; font-feature-settings: "ss01"; letter-spacing: -0.02em; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .grain { background-image: radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px); background-size: 4px 4px; }
        .marker-pulse { animation: pulse 2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.15); opacity: 1; } }
        .btn-primary { background: var(--primary); color: var(--primary-text); transition: all 0.2s; }
        .btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
        .card-hover { transition: all 0.25s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 32px -8px rgba(15, 61, 92, 0.15); }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--accent); transition: width 0.2s; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .ticker { animation: scroll 40s linear infinite; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.25s ease-out forwards; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .slide-down { animation: slideDown 0.2s ease-out forwards; }
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .slide-up-fade { animation: slideUpFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .heart-bounce { animation: heartBounce 0.4s ease-out; }
        @keyframes heartBounce { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }
        body { transition: background-color 0.3s; }
      `}</style>

      {/* HEADER */}
      <header
        className="border-b sticky top-0 z-40 backdrop-blur-md"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg-translucent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-6 lg:gap-10">
            <div
              className="flex items-center gap-2 cursor-pointer shrink-0"
              onClick={() => navigate("home")}
            >
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center relative"
                style={{ background: "var(--primary)" }}
              >
                <MapPin
                  className="w-5 h-5"
                  style={{ color: "var(--primary-text)" }}
                />
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                  style={{ background: "var(--accent)" }}
                ></div>
              </div>
              <div>
                <div className="font-display text-xl font-extrabold leading-none">
                  ЗАСААРАЙ
                </div>
                <div className="text-[10px] tracking-[0.2em] opacity-60 mt-0.5">
                  UB CIVIC REPAIR MAP
                </div>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              <button
                onClick={() => navigate("home")}
                className={`nav-link ${view === "home" ? "active" : ""}`}
              >
                Нүүр
              </button>
              <button
                onClick={() => navigate("map")}
                className={`nav-link ${view === "map" ? "active" : ""}`}
              >
                Газрын зураг
              </button>
              <button
                onClick={() => navigate("feed")}
                className={`nav-link ${view === "feed" ? "active" : ""}`}
              >
                Асуудлууд
              </button>
              <button
                onClick={() => navigate("stats")}
                className={`nav-link ${view === "stats" ? "active" : ""}`}
              >
                Статистик
              </button>
              <button
                onClick={() => navigate("report")}
                className={`nav-link ${view === "report" ? "active" : ""}`}
              >
                Сарын тайлан
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowSubmit(true)}
              className="btn-primary px-3 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Асуудал мэдэгдэх</span>
              <span className="sm:hidden">Мэдэгдэх</span>
            </button>

            {/* Mobile nav button */}
            <button
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "var(--surface-soft)" }}
              onClick={() => setNavOpen(!navOpen)}
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Profile button + dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm transition-transform hover:scale-105"
                style={{
                  background: "var(--text)",
                  color: "var(--bg)",
                  outline: profileOpen ? `2px solid var(--accent)` : "none",
                  outlineOffset: 2,
                }}
              >
                {profile.avatar}
              </button>

              {profileOpen && (
                <ProfileDropdown
                  profile={profile}
                  theme={theme}
                  toggleTheme={toggleTheme}
                  onClose={() => setProfileOpen(false)}
                  onOpenProfile={() => {
                    setProfileOpen(false);
                    navigate("profile");
                  }}
                  onLogout={() => {
                    setProfileOpen(false);
                    showToast("Системээс гарлаа", "info");
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile nav menu */}
        {navOpen && (
          <div
            className="lg:hidden border-t slide-down"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {[
                ["home", "Нүүр"],
                ["map", "Газрын зураг"],
                ["feed", "Асуудлууд"],
                ["stats", "Статистик"],
                ["report", "Сарын тайлан"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => {
                    navigate(id);
                    setNavOpen(false);
                  }}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    view === id ? "" : "opacity-70"
                  }`}
                  style={{
                    background:
                      view === id ? "var(--surface-soft)" : "transparent",
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* TICKER */}
      <div
        className="border-b py-2 overflow-hidden"
        style={{ borderColor: "var(--border)", background: "var(--primary)" }}
      >
        <div
          className="ticker flex gap-12 whitespace-nowrap text-xs font-mono"
          style={{ color: "var(--primary-text)" }}
        >
          {Array(2)
            .fill(0)
            .map((_, k) => (
              <div key={k} className="flex gap-12 shrink-0">
                <span>● ШУУД ХАРАГДАЦ</span>
                <span>{stats.total} нийт мэдэгдэл</span>
                <span>{stats.resolved} шийдэгдсэн</span>
                <span>Хариуцлагатай засаг = бидний эрх</span>
                <span>● {stats.rate}% шийдвэрлэгдэх хувь</span>
                <span>Баянзүрх хамгийн их мэдэгдэлтэй</span>
                <span>UB.MN/ZASAARAI</span>
              </div>
            ))}
        </div>
      </div>

      {/* MAIN VIEWS */}
      {view === "home" && (
        <HomeView
          navigate={navigate}
          stats={stats}
          issues={issues}
          setSelectedIssue={setSelectedIssue}
          setShowSubmit={setShowSubmit}
        />
      )}
      {view === "map" && (
        <MapView
          hoveredDistrict={hoveredDistrict}
          setHoveredDistrict={setHoveredDistrict}
          setSelectedIssue={setSelectedIssue}
          selectedDistricts={selectedDistricts}
          setSelectedDistricts={setSelectedDistricts}
          selectedKhoroos={selectedKhoroos}
          setSelectedKhoroos={setSelectedKhoroos}
          mapLayer={mapLayer}
          setMapLayer={setMapLayer}
          issues={issues}
        />
      )}
      {view === "feed" && (
        <FeedView
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          setSelectedIssue={setSelectedIssue}
          issues={issues}
        />
      )}
      {view === "stats" && <StatsView stats={stats} />}
      {view === "report" && <ReportView stats={stats} />}
      {view === "profile" && (
        <ProfileView
          profile={profile}
          setProfile={setProfile}
          issues={issues}
          navigate={navigate}
          theme={theme}
          toggleTheme={toggleTheme}
          showToast={showToast}
        />
      )}

      {/* MODALS */}
      {liveSelectedIssue && (
        <IssueDetailModal
          issue={liveSelectedIssue}
          onClose={() => setSelectedIssue(null)}
          onLike={() => toggleLike(liveSelectedIssue.id)}
          onComment={(text) => addComment(liveSelectedIssue.id, text)}
        />
      )}
      {showSubmit && (
        <SubmitModal
          onClose={() => setShowSubmit(false)}
          onSubmit={(data) => {
            addNewIssue(data);
            setShowSubmit(false);
          }}
        />
      )}

      {/* TOAST */}
      {toast && <Toast {...toast} />}

      {/* FOOTER */}
      <footer
        className="mt-24 border-t"
        style={{
          borderColor: "var(--border)",
          background: "var(--inverse)",
          color: "var(--inverse-text)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="font-display text-3xl md:text-4xl font-extrabold mb-4">
                Хотоо засахад
                <br />
                чи нэг товчлуурын зайд.
              </div>
              <p className="opacity-60 text-sm max-w-md">
                Иргэдийн чадавхид түшиглэсэн хотын асуудлын мэдээллийн систем.
                2026, Улаанбаатар.
              </p>
            </div>
            <div>
              <div className="text-xs tracking-[0.2em] opacity-50 mb-4">
                ХОЛБОО
              </div>
              <div className="space-y-2 text-sm">
                <div>info@zasaarai.mn</div>
                <div>+976 7777-1234</div>
                <div>UB Hub, 1-р давхар</div>
              </div>
            </div>
            <div>
              <div className="text-xs tracking-[0.2em] opacity-50 mb-4">
                ТӨСӨЛ
              </div>
              <div className="space-y-2 text-sm">
                <div>API баримт бичиг</div>
                <div>Open data</div>
                <div>GitHub</div>
              </div>
            </div>
          </div>
          <div
            className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-mono opacity-50"
            style={{ borderColor: "var(--inverse-border)" }}
          >
            <div>© 2026 ЗАСААРАЙ — erxes Academy PADA-1</div>
            <div>v0.7.0 · MIT License</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// =============================================================
// THEMES
// =============================================================

const lightTheme = {
  bg: "#F4EFE6",
  bgTranslucent: "rgba(244, 239, 230, 0.92)",
  text: "#1A1A1A",
  card: "#FFFFFF",
  surfaceSoft: "#EFE8DA",
  border: "#1A1A1A20",
  borderStrong: "#1A1A1A30",
  primary: "#0F3D5C",
  primaryText: "#F4EFE6",
  accent: "#C84B31",
  accentWarm: "#F4B05C",
  success: "#5C8A3A",
  warning: "#E08A2A",
  inverse: "#1A1A1A",
  inverseText: "#F4EFE6",
  inverseBorder: "#F4EFE610",
};

const darkTheme = {
  bg: "#0F141A",
  bgTranslucent: "rgba(15, 20, 26, 0.92)",
  text: "#F4EFE6",
  card: "#1A2128",
  surfaceSoft: "#252D36",
  border: "#F4EFE61A",
  borderStrong: "#F4EFE630",
  primary: "#4A8FB8",
  primaryText: "#F4EFE6",
  accent: "#E36B4F",
  accentWarm: "#F4B05C",
  success: "#7AAD4D",
  warning: "#F0A85C",
  inverse: "#F4EFE6",
  inverseText: "#1A1A1A",
  inverseBorder: "#1A1A1A20",
};

function themeVars(t) {
  return {
    "--bg": t.bg,
    "--bg-translucent": t.bgTranslucent,
    "--text": t.text,
    "--card": t.card,
    "--surface-soft": t.surfaceSoft,
    "--border": t.border,
    "--border-strong": t.borderStrong,
    "--primary": t.primary,
    "--primary-text": t.primaryText,
    "--accent": t.accent,
    "--accent-warm": t.accentWarm,
    "--success": t.success,
    "--warning": t.warning,
    "--inverse": t.inverse,
    "--inverse-text": t.inverseText,
    "--inverse-border": t.inverseBorder,
  };
}

// =============================================================
// PROFILE DROPDOWN
// =============================================================

function ProfileDropdown({
  profile,
  theme,
  toggleTheme,
  onClose,
  onOpenProfile,
  onLogout,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 w-72 rounded-2xl shadow-2xl slide-down z-50 overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border-strong)",
        boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
      }}
    >
      {/* Click header → go to profile */}
      <button
        onClick={onOpenProfile}
        className="w-full p-4 flex items-center gap-3 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg shrink-0"
          style={{ background: "var(--primary)", color: "var(--primary-text)" }}
        >
          {profile.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">
            {profile.fullName}
          </div>
          <div className="text-xs opacity-60 truncate">{profile.email}</div>
        </div>
        <ChevronRight className="w-4 h-4 opacity-40" />
      </button>

      {/* Quick stats */}
      <div
        className="grid grid-cols-3 gap-1 p-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="text-center p-2 rounded-lg"
          style={{ background: "var(--surface-soft)" }}
        >
          <div
            className="font-display font-extrabold text-lg"
            style={{ color: "var(--primary)" }}
          >
            {profile.reportsCount}
          </div>
          <div className="text-[10px] opacity-60 mt-0.5">Мэдэгдэл</div>
        </div>
        <div
          className="text-center p-2 rounded-lg"
          style={{ background: "var(--surface-soft)" }}
        >
          <div
            className="font-display font-extrabold text-lg"
            style={{ color: "var(--success)" }}
          >
            {profile.resolvedCount}
          </div>
          <div className="text-[10px] opacity-60 mt-0.5">Шийдэгдсэн</div>
        </div>
        <div
          className="text-center p-2 rounded-lg"
          style={{ background: "var(--surface-soft)" }}
        >
          <div
            className="font-display font-extrabold text-lg"
            style={{ color: "var(--accent)" }}
          >
            {profile.tokens}
          </div>
          <div className="text-[10px] opacity-60 mt-0.5">Token</div>
        </div>
      </div>

      {/* Menu items */}
      <div className="p-2">
        <DropdownItem
          icon={<User className="w-4 h-4" />}
          label="Хувийн мэдээлэл"
          onClick={onOpenProfile}
        />
        <DropdownItem
          icon={<Settings className="w-4 h-4" />}
          label="Тохиргоо"
          onClick={onOpenProfile}
        />
        <DropdownItem
          icon={<Lock className="w-4 h-4" />}
          label="Нууц үг солих"
          onClick={onOpenProfile}
        />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
        >
          <div className="flex items-center gap-3">
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
            <span>{theme === "light" ? "Шөнийн горим" : "Өдрийн горим"}</span>
          </div>
          <div
            className="w-9 h-5 rounded-full relative transition-colors"
            style={{
              background:
                theme === "dark" ? "var(--primary)" : "var(--border-strong)",
            }}
          >
            <div
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm"
              style={{
                transform:
                  theme === "dark" ? "translateX(18px)" : "translateX(2px)",
              }}
            />
          </div>
        </button>
      </div>

      <div className="p-2 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-red-500/10"
          style={{ color: "var(--accent)" }}
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Гарах</span>
        </button>
      </div>
    </div>
  );
}

function DropdownItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// =============================================================
// PROFILE VIEW
// =============================================================

function ProfileView({
  profile,
  setProfile,
  issues,
  navigate,
  theme,
  toggleTheme,
  showToast,
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [activeTab, setActiveTab] = useState("info"); // info | reports | settings | password

  const myReports = issues.filter((i) => i.reporter === profile.fullName);

  const saveProfile = () => {
    setProfile(form);
    setEditing(false);
    showToast("Мэдээлэл шинэчлэгдлээ", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 fade-up">
      <button
        onClick={() => navigate("home")}
        className="text-sm font-mono opacity-60 hover:opacity-100 mb-6 flex items-center gap-1"
      >
        ← Нүүр
      </button>

      {/* Profile header */}
      <div
        className="rounded-3xl p-6 sm:p-8 mb-6 grid md:grid-cols-3 gap-6 items-center"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-4 md:col-span-2">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center font-display font-bold text-3xl sm:text-4xl shrink-0"
            style={{
              background: "var(--primary)",
              color: "var(--primary-text)",
            }}
          >
            {profile.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-1">
              ХАРИУЦЛАГАТАЙ ИРГЭН
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-1 truncate">
              {profile.fullName}
            </h1>
            <div className="text-sm opacity-70">{profile.bio}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ProfileStat
            label="Мэдэгдэл"
            value={profile.reportsCount}
            color="var(--primary)"
          />
          <ProfileStat
            label="Шийдэгдсэн"
            value={profile.resolvedCount}
            color="var(--success)"
          />
          <ProfileStat
            label="Token"
            value={profile.tokens}
            color="var(--accent)"
          />
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 mb-6 p-1 rounded-full overflow-x-auto scrollbar-hide"
        style={{ background: "var(--surface-soft)" }}
      >
        {[
          ["info", "Мэдээлэл", User],
          ["reports", "Миний мэдэгдлүүд", FileText],
          ["settings", "Тохиргоо", Settings],
          ["password", "Нууц үг", Lock],
        ].map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === id ? "" : "opacity-60 hover:opacity-90"
            }`}
            style={{
              background: activeTab === id ? "var(--card)" : "transparent",
              boxShadow:
                activeTab === id ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "info" && (
        <div
          className="rounded-3xl p-6 sm:p-8 fade-in"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-display text-2xl font-extrabold">
              Хувийн мэдээлэл
            </h3>
            {!editing ? (
              <button
                onClick={() => {
                  setForm(profile);
                  setEditing(true);
                }}
                className="text-xs font-mono px-4 py-2 rounded-full"
                style={{ border: "1px solid var(--border-strong)" }}
              >
                ЗАСВАРЛАХ
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="text-xs font-mono px-4 py-2 rounded-full"
                  style={{ border: "1px solid var(--border)" }}
                >
                  БУЦАХ
                </button>
                <button
                  onClick={saveProfile}
                  className="btn-primary text-xs font-mono px-4 py-2 rounded-full"
                >
                  ХАДГАЛАХ
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <ProfileField
              label="Бүтэн нэр"
              value={editing ? form.fullName : profile.fullName}
              editing={editing}
              onChange={(v) => setForm({ ...form, fullName: v })}
            />
            <ProfileField
              label="Имэйл"
              value={editing ? form.email : profile.email}
              editing={editing}
              onChange={(v) => setForm({ ...form, email: v })}
              type="email"
            />
            <ProfileField
              label="Утас"
              value={editing ? form.phone : profile.phone}
              editing={editing}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
            <ProfileField
              label="Дүүрэг"
              value={editing ? form.district : profile.district}
              editing={editing}
              onChange={(v) => setForm({ ...form, district: v })}
            />
            <div className="md:col-span-2">
              <ProfileField
                label="Танилцуулга"
                value={editing ? form.bio : profile.bio}
                editing={editing}
                onChange={(v) => setForm({ ...form, bio: v })}
                multiline
              />
            </div>
            <ProfileField
              label="Бүртгүүлсэн огноо"
              value={profile.joinedDate}
              editing={false}
            />
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="fade-in">
          <div className="text-xs font-mono tracking-[0.25em] opacity-60 mb-4">
            ӨӨРИЙН МЭДЭГДЭЛҮҮД ({myReports.length})
          </div>
          {myReports.length === 0 ? (
            <div
              className="text-center py-16 rounded-3xl"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <FileText className="w-12 h-12 mx-auto opacity-30 mb-3" />
              <div className="font-display text-xl font-bold mb-1">
                Хоосон байна
              </div>
              <div className="text-sm opacity-60">
                Та одоохондоо мэдэгдэл оруулаагүй байна.
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myReports.map((issue) => (
                <IssueCard key={issue.id} issue={issue} onClick={() => {}} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div
          className="rounded-3xl p-6 sm:p-8 fade-in space-y-5"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <h3 className="font-display text-2xl font-extrabold mb-2">
            Тохиргоо
          </h3>

          <SettingRow
            icon={
              theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )
            }
            title={theme === "light" ? "Шөнийн горим" : "Өдрийн горим"}
            subtitle="Сайтын өнгөний горимыг солино"
          >
            <button
              onClick={toggleTheme}
              className="w-12 h-6 rounded-full relative transition-colors"
              style={{
                background:
                  theme === "dark" ? "var(--primary)" : "var(--border-strong)",
              }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm"
                style={{
                  transform:
                    theme === "dark" ? "translateX(26px)" : "translateX(2px)",
                }}
              />
            </button>
          </SettingRow>

          <SettingRow
            icon={<Mail className="w-5 h-5" />}
            title="Имэйл мэдэгдэл"
            subtitle="Шинэ хариу болон шинэчлэлд"
          >
            <Toggle defaultOn />
          </SettingRow>

          <SettingRow
            icon={<Activity className="w-5 h-5" />}
            title="Идэвхтэй байдал"
            subtitle="Бусдад өөрийн идэвхийг харуулах"
          >
            <Toggle defaultOn />
          </SettingRow>

          <SettingRow
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Хувийн мэдээлэл"
            subtitle="Имэйлийг бусдад харуулахгүй"
          >
            <Toggle defaultOn />
          </SettingRow>
        </div>
      )}

      {activeTab === "password" && (
        <div
          className="rounded-3xl p-6 sm:p-8 fade-in"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <h3 className="font-display text-2xl font-extrabold mb-6">
            Нууц үг солих
          </h3>
          <div className="space-y-4 max-w-md">
            <ProfileField
              label="Хуучин нууц үг"
              value=""
              editing={true}
              onChange={() => {}}
              type="password"
            />
            <ProfileField
              label="Шинэ нууц үг"
              value=""
              editing={true}
              onChange={() => {}}
              type="password"
            />
            <ProfileField
              label="Шинэ нууц үг (давтан)"
              value=""
              editing={true}
              onChange={() => {}}
              type="password"
            />
            <button
              onClick={() => showToast("Нууц үг солигдлоо", "success")}
              className="btn-primary px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2"
            >
              <Lock className="w-4 h-4" /> Шинэчлэх
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileStat({ label, value, color }) {
  return (
    <div
      className="text-center p-3 rounded-2xl"
      style={{ background: "var(--surface-soft)" }}
    >
      <div
        className="font-display font-extrabold text-2xl sm:text-3xl"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-[10px] opacity-60 mt-1">{label}</div>
    </div>
  );
}

function ProfileField({
  label,
  value,
  editing,
  onChange,
  type = "text",
  multiline,
}) {
  return (
    <div>
      <div className="text-xs font-mono tracking-[0.15em] opacity-60 mb-2">
        {label.toUpperCase()}
      </div>
      {editing ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl text-sm resize-none"
            style={{
              background: "var(--surface-soft)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 rounded-xl text-sm"
            style={{
              background: "var(--surface-soft)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
        )
      ) : (
        <div className="text-base font-medium">{value || "—"}</div>
      )}
    </div>
  );
}

function SettingRow({ icon, title, subtitle, children }) {
  return (
    <div
      className="flex items-center justify-between gap-3 p-4 rounded-2xl"
      style={{ background: "var(--surface-soft)" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--card)" }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">{title}</div>
          <div className="text-xs opacity-60 truncate">{subtitle}</div>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className="w-12 h-6 rounded-full relative transition-colors"
      style={{
        background: on ? "var(--success)" : "var(--border-strong)",
      }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm"
        style={{ transform: on ? "translateX(26px)" : "translateX(2px)" }}
      />
    </button>
  );
}

// =============================================================
// HOME VIEW
// =============================================================

function HomeView({
  navigate,
  stats,
  issues,
  setSelectedIssue,
  setShowSubmit,
}) {
  return (
    <div className="fade-up">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24 grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-7">
          <div className="text-xs font-mono tracking-[0.25em] mb-6 flex items-center gap-3 opacity-70">
            <div
              className="w-8 h-px"
              style={{ background: "var(--text)" }}
            ></div>
            EST. 2026 / ULAANBAATAR
          </div>
          <h1
            className="font-display font-extrabold leading-[0.92] mb-8"
            style={{ fontSize: "clamp(40px, 8vw, 112px)" }}
          >
            Хотынхоо
            <br />
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
              асуудлыг
            </span>
            <br />
            харуулъя.
          </h1>
          <p className="text-base sm:text-lg max-w-xl opacity-75 mb-10">
            Эвдэрсэн зам, гэрэлгүй гудамж, овоорсон хог — эдгээрийг хэн ч
            цэгцлэхгүй учир биш, харин хаана байгааг хэн ч мэдэхгүй учир хэвээр
            байна. Зураг авч, байршлаа оруул, бид газрын зурагт буулгана.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowSubmit(true)}
              className="btn-primary px-5 sm:px-7 py-3 sm:py-4 rounded-full font-semibold flex items-center gap-2 group text-sm sm:text-base"
            >
              Эхлээд мэдэгдье{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("map")}
              className="px-5 sm:px-7 py-3 sm:py-4 rounded-full font-semibold flex items-center gap-2 text-sm sm:text-base"
              style={{ border: "1.5px solid var(--border-strong)" }}
            >
              <MapPin className="w-4 h-4" /> Зураг үзэх
            </button>
          </div>
        </div>

        {/* HERO SIDE STATS */}
        <div className="md:col-span-5 grid grid-cols-2 gap-3">
          <StatCard
            label="НИЙТ МЭДЭГДЭЛ"
            value={stats.total}
            accent="var(--primary)"
            big
          />
          <StatCard
            label="ШИЙДЭГДСЭН"
            value={stats.resolved}
            accent="var(--success)"
          />
          <StatCard
            label="ШИЙДВЭРЛЭХ ХУВЬ"
            value={`${stats.rate}%`}
            accent="var(--accent)"
          />
          <StatCard
            label="ИДЭВХТЭЙ ХЭРЭГЛЭГЧ"
            value="2,847"
            accent="var(--text)"
          />
        </div>
      </section>

      {/* CATEGORY STRIP — now horizontally scrollable on mobile */}
      <section
        className="border-y py-3"
        style={{ borderColor: "var(--border)", background: "var(--inverse)" }}
      >
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
          <div
            className="flex gap-3 px-4 sm:px-6 items-center text-xs font-mono tracking-wider min-w-max"
            style={{ color: "var(--inverse-text)" }}
          >
            <span className="opacity-50 shrink-0">КАТЕГОРИ:</span>
            {CATEGORIES.map((c) => (
              <span
                key={c.id}
                className="px-3 py-1.5 rounded-full whitespace-nowrap shrink-0"
                style={{
                  background: c.color + "30",
                  color: c.color,
                  border: `1px solid ${c.color}50`,
                }}
              >
                {c.icon} {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT ISSUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
              01 / СҮҮЛИЙН МЭДЭГДЛҮҮД
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold">
              Шинэ асуудлууд.
            </h2>
          </div>
          <button
            onClick={() => navigate("feed")}
            className="text-xs sm:text-sm font-semibold flex items-center gap-2 opacity-70 hover:opacity-100 whitespace-nowrap"
          >
            БҮХ АСУУДАЛ <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {issues.slice(0, 4).map((issue, i) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onClick={() => setSelectedIssue(issue)}
              delay={i * 0.08}
            />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
            02 / ХЭРХЭН АЖИЛЛАХ ВЭ
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-[0.95]">
            Гурван
            <br />
            энгийн
            <br />
            алхам.
          </h2>
        </div>
        <div className="md:col-span-8 grid sm:grid-cols-3 gap-5">
          <StepCard
            num="01"
            icon={<Camera />}
            title="Зураг авна"
            text="Утсаараа л зураг авч, байршлаа автоматаар нэмнэ."
          />
          <StepCard
            num="02"
            icon={<MapPin />}
            title="Зурагт буулгана"
            text="Бусдад ил харагдах байдлаар газрын зурагт орно."
          />
          <StepCard
            num="03"
            icon={<CheckCircle2 />}
            title="Хариуцлагатан хүлээн авна"
            text="Зохих байгууллагад илгээгдэж, явц нь шинэчлэгдэнэ."
          />
        </div>
      </section>

      {/* TRANSPARENCY TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div
          onClick={() => navigate("report")}
          className="cursor-pointer rounded-3xl p-6 sm:p-10 grid md:grid-cols-12 gap-6 items-center transition-all hover:translate-y-[-2px]"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "88px", color: "var(--success)" }}
            >
              67<span style={{ fontSize: "40px" }}>%</span>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="text-xs font-mono tracking-[0.25em] mb-2 opacity-60 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> 03 / 4-Р САРЫН ИЛ ТОД БАЙДЛЫН
              ТАЙЛАН
            </div>
            <div className="font-display text-xl sm:text-3xl font-extrabold leading-tight">
              Энэ сард мэдэгдсэн асуудлын{" "}
              <em style={{ color: "var(--success)" }}>үнэн зөв тоо</em> — олон
              нийтэд ил.
            </div>
            <div className="text-sm opacity-70 mt-2">
              Төрийн түнш байгууллагуудтай хамтран сар бүр хариуцлагын тайлан
              гаргадаг.
            </div>
          </div>
          <div className="md:col-span-3 flex md:justify-end">
            <div
              className="px-5 py-3 rounded-full font-semibold flex items-center gap-2 text-sm"
              style={{
                background: "var(--primary)",
                color: "var(--primary-text)",
              }}
            >
              Тайлан үзэх <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div
          className="rounded-3xl p-8 sm:p-16 grid md:grid-cols-12 gap-8 items-center"
          style={{ background: "var(--primary)", color: "var(--primary-text)" }}
        >
          <div className="md:col-span-8">
            <div className="text-xs font-mono tracking-[0.25em] mb-4 opacity-70">
              МАНАЙ ҮЗЭЛ БОДОЛ
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-extrabold leading-[1.05]">
              "Хариуцлагатай иргэн ={" "}
              <span
                style={{ fontStyle: "italic", color: "var(--accent-warm)" }}
              >
                хариуцлагатай хот.
              </span>
              "
            </h3>
          </div>
          <div className="md:col-span-4 text-sm opacity-80">
            <p className="mb-6">
              Зүгээр л шүүмжилж бус, баталгаатай мэдээлэл оруулж — бид хамтдаа
              Улаанбаатарыг өөрчилнө.
            </p>
            <button
              onClick={() => setShowSubmit(true)}
              className="px-6 py-3 rounded-full font-semibold flex items-center gap-2"
              style={{
                background: "var(--accent-warm)",
                color: "var(--primary)",
              }}
            >
              Хувь нэмэр оруулах <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, accent, big }) {
  return (
    <div
      className={`p-5 rounded-2xl ${big ? "col-span-2 row-span-2" : ""}`}
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-[10px] font-mono tracking-[0.2em] opacity-60">
          {label}
        </div>
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: accent }}
        ></div>
      </div>
      <div
        className={`font-display font-extrabold leading-none ${big ? "text-6xl sm:text-7xl" : "text-3xl sm:text-4xl"}`}
        style={{ color: accent }}
      >
        {value}
      </div>
      {big && (
        <div className="mt-4 text-xs opacity-60">
          2026 оны 4-р сарын байдлаар
        </div>
      )}
    </div>
  );
}

function StepCard({ num, icon, title, text }) {
  return (
    <div
      className="card-hover p-6 sm:p-7 rounded-2xl"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="font-mono text-xs tracking-[0.2em] opacity-50">
          {num}
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "var(--primary)", color: "var(--primary-text)" }}
        >
          {icon}
        </div>
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-extrabold mb-2">
        {title}
      </h3>
      <p className="text-sm opacity-70 leading-relaxed">{text}</p>
    </div>
  );
}

// =============================================================
// MAP VIEW (improved)
// =============================================================

function MapView({
  hoveredDistrict,
  setHoveredDistrict,
  setSelectedIssue,
  selectedDistricts,
  setSelectedDistricts,
  selectedKhoroos,
  setSelectedKhoroos,
  mapLayer,
  setMapLayer,
  issues,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [layerOpen, setLayerOpen] = useState(false);

  // Compute viewBox to zoom to selected districts
  const viewBox = useMemo(() => {
    if (selectedDistricts.length === 0) return "0 0 100 100";
    const sel = DISTRICTS.filter((d) => selectedDistricts.includes(d.id));
    if (sel.length === 0) return "0 0 100 100";
    const minX = Math.max(0, Math.min(...sel.map((d) => d.x)) - 15);
    const minY = Math.max(0, Math.min(...sel.map((d) => d.y)) - 15);
    const maxX = Math.min(100, Math.max(...sel.map((d) => d.x)) + 15);
    const maxY = Math.min(100, Math.max(...sel.map((d) => d.y)) + 15);
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  }, [selectedDistricts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 fade-up">
      <div className="flex items-end justify-between mb-6 sm:mb-8 gap-3 flex-wrap">
        <div>
          <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
            УЛААНБААТАР / АСУУДЛЫН ЗУРАГ
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold">
            Дүүргүүдээр.
          </h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-sm relative">
          <button
            onClick={() => {
              setFilterOpen(!filterOpen);
              setLayerOpen(false);
            }}
            className="px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-all"
            style={{
              border: "1px solid var(--border-strong)",
              background: filterOpen ? "var(--text)" : "transparent",
              color: filterOpen ? "var(--bg)" : "var(--text)",
            }}
          >
            <Filter className="w-4 h-4" /> Шүүлтүүр
            {selectedDistricts.length > 0 && (
              <span
                className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: "var(--accent)",
                  color: "var(--primary-text)",
                }}
              >
                {selectedDistricts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setLayerOpen(!layerOpen);
              setFilterOpen(false);
            }}
            className="px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-all"
            style={{
              border: "1px solid var(--border-strong)",
              background: layerOpen ? "var(--text)" : "transparent",
              color: layerOpen ? "var(--bg)" : "var(--text)",
            }}
          >
            <Layers className="w-4 h-4" /> Үе
          </button>

          {filterOpen && (
            <FilterPanel
              selectedDistricts={selectedDistricts}
              setSelectedDistricts={setSelectedDistricts}
              selectedKhoroos={selectedKhoroos}
              setSelectedKhoroos={setSelectedKhoroos}
              onClose={() => setFilterOpen(false)}
            />
          )}
          {layerOpen && (
            <LayerPanel
              mapLayer={mapLayer}
              setMapLayer={setMapLayer}
              onClose={() => setLayerOpen(false)}
            />
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-4 sm:gap-6">
        {/* MAP */}
        <div
          className="md:col-span-8 rounded-3xl p-4 sm:p-6 relative overflow-hidden"
          style={{
            background: mapLayer === "satellite" ? "#1a2935" : "var(--card)",
            border: "1px solid var(--border)",
            minHeight: 400,
          }}
        >
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
            <div
              className="text-[10px] sm:text-xs font-mono opacity-60"
              style={{
                color: mapLayer === "satellite" ? "#F4EFE6" : undefined,
              }}
            >
              47.918° N · 106.917° E
            </div>
            <div
              className="font-display text-lg sm:text-2xl font-extrabold mt-1"
              style={{
                color: mapLayer === "satellite" ? "#F4EFE6" : undefined,
              }}
            >
              Улаанбаатар хот
            </div>
          </div>
          <div
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 flex flex-col gap-2 text-xs"
            style={{ color: mapLayer === "satellite" ? "#F4EFE6" : undefined }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#C84B31" }}
              ></div>
              100+ мэдэгдэл
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#E08A2A" }}
              ></div>
              50-100
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#5C8A3A" }}
              ></div>
              50-аас бага
            </div>
          </div>

          <svg
            viewBox={viewBox}
            preserveAspectRatio="xMidYMid meet"
            className="w-full transition-all duration-700 ease-out"
            style={{ minHeight: 400, maxHeight: 600 }}
          >
            <defs>
              <pattern
                id="terrain"
                patternUnits="userSpaceOnUse"
                width="3"
                height="3"
              >
                <circle
                  cx="1.5"
                  cy="1.5"
                  r="0.3"
                  fill="currentColor"
                  opacity="0.08"
                />
              </pattern>
              <pattern
                id="grid"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.15"
                  opacity="0.1"
                />
              </pattern>
              <radialGradient id="cityglow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0F3D5C" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#0F3D5C" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background */}
            {mapLayer === "satellite" ? (
              <>
                <rect width="100" height="100" fill="#1a2935" />
                <rect
                  width="100"
                  height="100"
                  fill="url(#grid)"
                  opacity="0.5"
                />
              </>
            ) : mapLayer === "minimal" ? (
              <rect width="100" height="100" fill="transparent" />
            ) : (
              <>
                <rect width="100" height="100" fill="url(#terrain)" />
                <circle cx="50" cy="50" r="40" fill="url(#cityglow)" />
              </>
            )}

            {/* Major roads */}
            {mapLayer !== "minimal" && (
              <g
                stroke={mapLayer === "satellite" ? "#3a4a5a" : "#0F3D5C"}
                strokeWidth="0.4"
                fill="none"
                opacity="0.4"
              >
                <path d="M 0 50 L 100 50" />
                <path d="M 50 0 L 50 100" />
                <path d="M 10 30 L 90 65" />
                <path d="M 5 70 L 95 30" />
              </g>
            )}

            {/* Tuul river */}
            <path
              d="M 5 80 Q 30 75 50 78 T 95 70"
              stroke={mapLayer === "satellite" ? "#4A8FB8" : "#0F3D5C"}
              strokeWidth="0.7"
              fill="none"
              opacity="0.5"
            />
            <text
              x="20"
              y="85"
              fontSize="2"
              fill={mapLayer === "satellite" ? "#4A8FB8" : "#0F3D5C"}
              opacity="0.7"
              fontFamily="JetBrains Mono"
            >
              Туул гол
            </text>

            {/* District polygons (rough boundaries) */}
            {DISTRICTS.map((d) => {
              const color =
                d.issues > 100
                  ? "#C84B31"
                  : d.issues > 50
                    ? "#E08A2A"
                    : "#5C8A3A";
              const isSelected =
                selectedDistricts.length === 0 ||
                selectedDistricts.includes(d.id);
              const isHovered = hoveredDistrict === d.id;
              const opacity = isSelected
                ? mapLayer === "heat"
                  ? 0.4
                  : 0.15
                : 0.05;
              return (
                <g
                  key={`shape-${d.id}`}
                  onMouseEnter={() => setHoveredDistrict(d.id)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={DISTRICT_SHAPES[d.id]}
                    fill={color}
                    fillOpacity={isHovered ? opacity * 2 : opacity}
                    stroke={color}
                    strokeWidth={isHovered ? "0.4" : "0.2"}
                    strokeOpacity={isSelected ? 0.6 : 0.2}
                    style={{
                      transition: "fill-opacity 0.2s, stroke-opacity 0.2s",
                    }}
                  />
                </g>
              );
            })}

            {/* District markers */}
            {DISTRICTS.map((d) => {
              const color =
                d.issues > 100
                  ? "#C84B31"
                  : d.issues > 50
                    ? "#E08A2A"
                    : "#5C8A3A";
              const isSelected =
                selectedDistricts.length === 0 ||
                selectedDistricts.includes(d.id);
              const isHovered = hoveredDistrict === d.id;
              if (!isSelected) return null;
              return (
                <g
                  key={d.id}
                  onMouseEnter={() => setHoveredDistrict(d.id)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={d.size / 3}
                    fill={color}
                    opacity="0.2"
                    className="marker-pulse"
                  />
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={d.size / 5}
                    fill={color}
                    opacity={isHovered ? 1 : 0.85}
                  />
                  <circle cx={d.x} cy={d.y} r="0.8" fill="#FFFFFF" />
                  {isHovered && (
                    <g>
                      <rect
                        x={d.x - 14}
                        y={d.y - 16}
                        width="28"
                        height="9"
                        rx="1.5"
                        fill="#1A1A1A"
                      />
                      <text
                        x={d.x}
                        y={d.y - 12}
                        fontSize="2.4"
                        fill="#F4EFE6"
                        textAnchor="middle"
                        fontFamily="JetBrains Mono"
                        fontWeight="bold"
                      >
                        {d.name}
                      </text>
                      <text
                        x={d.x}
                        y={d.y - 9}
                        fontSize="2"
                        fill="#F4B05C"
                        textAnchor="middle"
                        fontFamily="JetBrains Mono"
                      >
                        {d.issues} мэдэгдэл
                      </text>
                    </g>
                  )}
                  {!isHovered && (
                    <text
                      x={d.x}
                      y={d.y + d.size / 4 + 3}
                      fontSize="2.2"
                      fill={mapLayer === "satellite" ? "#F4EFE6" : "#1A1A1A"}
                      textAnchor="middle"
                      fontFamily="JetBrains Mono"
                      fontWeight="bold"
                    >
                      {d.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div
            className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[10px] sm:text-xs font-mono"
            style={{ color: mapLayer === "satellite" ? "#F4EFE6" : undefined }}
          >
            <div className="opacity-60">
              {selectedDistricts.length > 0
                ? `Шүүлтүүр идэвхтэй (${selectedDistricts.length} дүүрэг)`
                : "Дүүргийн дээр гүйлгээд хар"}
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#C84B31" }}
              ></div>
              <span className="opacity-70">Бодит цаг</span>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-xs font-mono tracking-[0.25em] opacity-60 mb-2">
            ДЭЭГҮҮР ДҮҮРГҮҮД
          </div>
          {[...DISTRICTS]
            .sort((a, b) => b.issues - a.issues)
            .slice(0, 5)
            .map((d, i) => (
              <div
                key={d.id}
                onClick={() => {
                  if (selectedDistricts.includes(d.id)) {
                    setSelectedDistricts(
                      selectedDistricts.filter((x) => x !== d.id),
                    );
                  } else {
                    setSelectedDistricts([...selectedDistricts, d.id]);
                  }
                }}
                className="card-hover p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                style={{
                  background: "var(--card)",
                  border: `1px solid ${selectedDistricts.includes(d.id) ? "var(--accent)" : "var(--border)"}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="font-display font-extrabold text-2xl opacity-30">
                    0{i + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-xs opacity-60">
                      {d.resolved}/{d.issues} шийдэгдсэн
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-lg">{d.issues}</div>
                  <div className="text-[10px] opacity-50">мэдэгдэл</div>
                </div>
              </div>
            ))}
          <div
            className="p-4 rounded-xl mt-4"
            style={{
              background: "var(--inverse)",
              color: "var(--inverse-text)",
            }}
          >
            <div className="text-xs font-mono opacity-60 mb-2">ШУУД ИДЭВХ</div>
            <div className="font-display text-3xl font-extrabold">
              + 12 шинэ
            </div>
            <div className="text-xs opacity-70 mt-1">сүүлийн 24 цагт</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// FILTER PANEL
// =============================================================

function FilterPanel({
  selectedDistricts,
  setSelectedDistricts,
  selectedKhoroos,
  setSelectedKhoroos,
  onClose,
}) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const toggleDistrict = (id) => {
    if (selectedDistricts.includes(id)) {
      setSelectedDistricts(selectedDistricts.filter((x) => x !== id));
      const newKhoroos = { ...selectedKhoroos };
      delete newKhoroos[id];
      setSelectedKhoroos(newKhoroos);
    } else {
      setSelectedDistricts([...selectedDistricts, id]);
    }
  };

  const toggleKhoroo = (districtId, khoroo) => {
    const current = selectedKhoroos[districtId] || [];
    setSelectedKhoroos({
      ...selectedKhoroos,
      [districtId]: current.includes(khoroo)
        ? current.filter((x) => x !== khoroo)
        : [...current, khoroo],
    });
  };

  const clearAll = () => {
    setSelectedDistricts([]);
    setSelectedKhoroos({});
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 w-80 sm:w-96 max-h-[70vh] overflow-y-auto rounded-2xl shadow-2xl slide-down z-50"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border-strong)",
        boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
      }}
    >
      <div
        className="p-4 flex items-center justify-between sticky top-0"
        style={{
          background: "var(--card)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <div className="font-display font-extrabold text-lg">Шүүлтүүр</div>
          <div className="text-xs opacity-60">Дүүрэг, хороо сонгоно уу</div>
        </div>
        {(selectedDistricts.length > 0 ||
          Object.keys(selectedKhoroos).length > 0) && (
          <button
            onClick={clearAll}
            className="text-xs font-mono px-2.5 py-1 rounded-full"
            style={{ border: "1px solid var(--border-strong)" }}
          >
            ЦЭВЭРЛЭХ
          </button>
        )}
      </div>

      <div className="p-2">
        {DISTRICTS.map((d) => {
          const isSelected = selectedDistricts.includes(d.id);
          const isExpanded = expanded === d.id;
          const khoroos = KHOROOS_BY_DISTRICT[d.id] || [];
          const selectedKh = selectedKhoroos[d.id] || [];

          return (
            <div
              key={d.id}
              className="rounded-xl"
              style={{
                background: isExpanded ? "var(--surface-soft)" : "transparent",
              }}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleDistrict(d.id)}
                  className="flex-1 flex items-center gap-3 p-2.5 rounded-lg transition-colors hover:bg-black/5"
                >
                  <Checkbox checked={isSelected} />
                  <div className="text-left flex-1">
                    <div className="text-sm font-semibold">{d.name} дүүрэг</div>
                    <div className="text-[10px] opacity-60">
                      {d.issues} мэдэгдэл
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setExpanded(isExpanded ? null : d.id)}
                  className="p-2.5 opacity-60 hover:opacity-100"
                >
                  <ChevronDown
                    className="w-4 h-4 transition-transform"
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>
              </div>
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 grid grid-cols-2 gap-1.5 fade-in">
                  {khoroos.map((kh) => (
                    <button
                      key={kh}
                      onClick={() => toggleKhoroo(d.id, kh)}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors hover:bg-black/5"
                    >
                      <Checkbox small checked={selectedKh.includes(kh)} />
                      <span>{kh}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={onClose}
          className="btn-primary w-full py-2.5 rounded-full font-semibold text-sm"
        >
          Хэрэглэх
        </button>
      </div>
    </div>
  );
}

function Checkbox({ checked, small }) {
  const size = small ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div
      className={`${size} rounded shrink-0 flex items-center justify-center transition-all`}
      style={{
        background: checked ? "var(--primary)" : "transparent",
        border: `1.5px solid ${checked ? "var(--primary)" : "var(--border-strong)"}`,
      }}
    >
      {checked && (
        <svg
          viewBox="0 0 12 12"
          className="w-2.5 h-2.5"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <path
            d="M2 6 L 5 9 L 10 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

// =============================================================
// LAYER PANEL
// =============================================================

function LayerPanel({ mapLayer, setMapLayer, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const layers = [
    { id: "default", label: "Үндсэн", icon: "🗺", desc: "Энгийн харагдац" },
    {
      id: "satellite",
      label: "Хиймэл дагуул",
      icon: "🛰",
      desc: "Шөнийн харагдац",
    },
    { id: "minimal", label: "Энгийн", icon: "⚪", desc: "Зөвхөн чухал зүйл" },
    {
      id: "heat",
      label: "Дулаан зураг",
      icon: "🔥",
      desc: "Дүүргүүдийн өнгөтэй",
    },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 w-72 rounded-2xl shadow-2xl slide-down z-50 overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border-strong)",
        boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
      }}
    >
      <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="font-display font-extrabold text-lg">Зургийн үе</div>
        <div className="text-xs opacity-60">Харагдах байдлыг сонго</div>
      </div>
      <div className="p-2">
        {layers.map((l) => (
          <button
            key={l.id}
            onClick={() => {
              setMapLayer(l.id);
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-black/5"
            style={{
              background:
                mapLayer === l.id ? "var(--surface-soft)" : "transparent",
            }}
          >
            <div className="text-2xl">{l.icon}</div>
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold">{l.label}</div>
              <div className="text-xs opacity-60">{l.desc}</div>
            </div>
            {mapLayer === l.id && (
              <CheckCircle2
                className="w-4 h-4"
                style={{ color: "var(--success)" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// =============================================================
// FEED VIEW
// =============================================================

function FeedView({
  filterCategory,
  setFilterCategory,
  setSelectedIssue,
  issues,
}) {
  const filtered =
    filterCategory === "all"
      ? issues
      : issues.filter((i) => i.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 fade-up">
      <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4 flex-wrap">
        <div>
          <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
            БҮХ МЭДЭГДЭЛ
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold">
            Сүүлийн асуудлууд.
          </h2>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            placeholder="Хайх..."
            className="pl-11 pr-5 py-3 rounded-full text-sm w-full sm:w-72"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border-strong)",
              color: "var(--text)",
            }}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-all shrink-0 ${
            filterCategory === "all" ? "" : "opacity-60"
          }`}
          style={{
            background:
              filterCategory === "all" ? "var(--text)" : "transparent",
            color: filterCategory === "all" ? "var(--bg)" : "var(--text)",
            border:
              filterCategory === "all"
                ? "none"
                : "1px solid var(--border-strong)",
          }}
        >
          Бүгд
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterCategory(c.id)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-all shrink-0 ${
              filterCategory === c.id ? "" : "opacity-60"
            }`}
            style={{
              background: filterCategory === c.id ? c.color : "transparent",
              color: filterCategory === c.id ? "#FFF" : "var(--text)",
              border:
                filterCategory === c.id
                  ? "none"
                  : "1px solid var(--border-strong)",
            }}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((issue, i) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onClick={() => setSelectedIssue(issue)}
            delay={i * 0.05}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 opacity-50">
            Энэ ангилалд мэдэгдэл алга байна.
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================
// STATS VIEW
// =============================================================

function StatsView({ stats }) {
  const max = Math.max(...DISTRICTS.map((d) => d.issues));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 fade-up">
      <div className="mb-8 sm:mb-10">
        <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
          ӨГӨГДЛИЙН ХАРАГДАЦ
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold">
          Хотын мэдрэмж.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <BigStat
          label="НИЙТ МЭДЭГДЭЛ"
          value={stats.total}
          sub="2026 оны 4-р сар хүртэл"
          trend="+18%"
        />
        <BigStat
          label="ШИЙДЭГДСЭН"
          value={stats.resolved}
          sub={`${stats.rate}% хувь`}
          trend="+22%"
          accent="var(--success)"
        />
        <BigStat
          label="ИДЭВХТЭЙ ИРГЭД"
          value="2,847"
          sub="бүртгэлтэй хэрэглэгч"
          trend="+34%"
          accent="var(--accent)"
        />
      </div>

      <div className="grid md:grid-cols-12 gap-5">
        <div
          className="md:col-span-7 p-6 sm:p-7 rounded-3xl"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-xs font-mono tracking-[0.2em] opacity-60">
                ДҮҮРГИЙН ЗАГВАРААР
              </div>
              <div className="font-display text-xl sm:text-2xl font-extrabold mt-1">
                Мэдэгдлийн тоо
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {[...DISTRICTS]
              .sort((a, b) => b.issues - a.issues)
              .map((d) => {
                const w = (d.issues / max) * 100;
                const rw = (d.resolved / max) * 100;
                return (
                  <div key={d.id}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">{d.name}</span>
                      <span className="font-mono opacity-70">
                        {d.issues}{" "}
                        <span className="opacity-50">/ {d.resolved} шийд.</span>
                      </span>
                    </div>
                    <div
                      className="h-3 rounded-full relative overflow-hidden"
                      style={{ background: "var(--surface-soft)" }}
                    >
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${w}%`, background: "var(--primary)" }}
                      ></div>
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          width: `${rw}%`,
                          background: "var(--success)",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex gap-4 mt-6 text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "var(--primary)" }}
              ></div>
              Нийт
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "var(--success)" }}
              ></div>
              Шийдэгдсэн
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-5">
          <div
            className="p-6 sm:p-7 rounded-3xl"
            style={{
              background: "var(--primary)",
              color: "var(--primary-text)",
            }}
          >
            <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-3">
              КАТЕГОРИЙН ЗАДАРГАА
            </div>
            <div className="space-y-3">
              {CATEGORIES.slice(0, 5).map((c, i) => {
                const v = [34, 28, 19, 12, 7][i];
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="text-2xl">{c.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-1">{c.label}</div>
                      <div
                        className="h-1.5 rounded-full"
                        style={{ background: "rgba(244,239,230,0.2)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${v * 2.8}%`, background: c.color }}
                        ></div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-sm">{v}%</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="p-6 sm:p-7 rounded-3xl"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-3">
              ХАМГИЙН ИДЭВХТЭЙ ИРГЭД
            </div>
            {["Б.Ариунаа", "Д.Ган-Эрдэнэ", "С.Мөнхзул"].map((n, i) => (
              <div
                key={n}
                className="flex items-center justify-between py-3"
                style={{
                  borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{
                      background: ["#0F3D5C", "#C84B31", "#5C8A3A"][i],
                      color: "#F4EFE6",
                    }}
                  >
                    {n[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{n}</div>
                    <div className="text-xs opacity-60">
                      {[47, 38, 29][i]} мэдэгдэл
                    </div>
                  </div>
                </div>
                <Award className="w-5 h-5 opacity-40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BigStat({ label, value, sub, trend, accent = "var(--primary)" }) {
  return (
    <div
      className="p-6 sm:p-7 rounded-3xl"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="text-xs font-mono tracking-[0.2em] opacity-60">
        {label}
      </div>
      <div
        className="font-display font-extrabold text-5xl sm:text-6xl my-3 leading-none"
        style={{ color: accent }}
      >
        {value}
      </div>
      <div className="flex justify-between items-end">
        <div className="text-sm opacity-60">{sub}</div>
        <div
          className="text-xs font-mono font-bold flex items-center gap-1"
          style={{ color: "var(--success)" }}
        >
          <TrendingUp className="w-3 h-3" /> {trend}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// REPORT VIEW (kept simpler than original to save space - same logic)
// =============================================================

function ReportView({ stats }) {
  const monthlyData = [
    { month: "11-р сар", reported: 187, fixed: 89 },
    { month: "12-р сар", reported: 224, fixed: 124 },
    { month: "1-р сар", reported: 198, fixed: 132 },
    { month: "2-р сар", reported: 246, fixed: 168 },
    { month: "3-р сар", reported: 312, fixed: 224 },
    { month: "4-р сар", reported: 367, fixed: 247 },
  ];
  const maxBar = Math.max(...monthlyData.map((m) => m.reported));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 fade-up">
      <div className="mb-8 sm:mb-10">
        <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
          САРЫН ИЛ ТОД БАЙДАЛ
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold">
          4-р сарын тайлан.
        </h2>
        <p className="text-sm sm:text-base opacity-70 mt-3 max-w-2xl">
          Энэ сарын мэдэгдэл, шийдвэрлэлт, төрийн түншлэлийн тайланг олон нийтэд
          ил болгох үүднээс гаргалаа.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <BigStat label="МЭДЭГДЭГДСЭН" value={367} sub="4-р сар" trend="+18%" />
        <BigStat
          label="ШИЙДЭГДСЭН"
          value={247}
          sub="67% шийдэгдэх"
          trend="+24%"
          accent="var(--success)"
        />
        <BigStat
          label="ХҮЛЭЭГДЭЖ БУЙ"
          value={120}
          sub="33% бус шийдэгдсэн"
          trend="-6%"
          accent="var(--accent)"
        />
      </div>

      <div className="grid md:grid-cols-12 gap-5">
        <div
          className="md:col-span-8 p-6 sm:p-7 rounded-3xl"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-1">
            САР БҮРИЙН ХАРЬЦУУЛАЛТ
          </div>
          <div className="font-display text-xl sm:text-2xl font-extrabold mb-6">
            Мэдэгдэл vs Шийдэгдсэн
          </div>

          <div className="flex items-end gap-3 sm:gap-4 h-48 sm:h-64">
            {monthlyData.map((m, i) => (
              <div
                key={m.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex flex-col gap-1 items-center">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${(m.reported / maxBar) * 180}px`,
                      background: "var(--primary)",
                    }}
                    title={`${m.reported} мэдэгдэл`}
                  ></div>
                  <div
                    className="w-full rounded-b-lg transition-all"
                    style={{
                      height: `${(m.fixed / maxBar) * 180}px`,
                      background: "var(--success)",
                      marginTop: "-4px",
                    }}
                    title={`${m.fixed} шийдэгдсэн`}
                  ></div>
                </div>
                <div className="text-[10px] sm:text-xs font-mono opacity-60 text-center">
                  {m.month}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="md:col-span-4 p-6 sm:p-7 rounded-3xl"
          style={{ background: "var(--inverse)", color: "var(--inverse-text)" }}
        >
          <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-3">
            ТҮНШ БАЙГУУЛЛАГУУД
          </div>
          {[
            { name: "УБ ЗАА", role: "Стратеги", cases: 89, icon: "🏛" },
            {
              name: "Тохижилт ОНӨААТҮГ",
              role: "Гүйцэтгэгч",
              cases: 142,
              icon: "🚧",
            },
            { name: "Замын засвар", role: "Гүйцэтгэгч", cases: 76, icon: "🛣" },
            { name: "Дүүргийн ИТХ", role: "Хяналт", cases: 247, icon: "⚖" },
          ].map((p, i) => (
            <div
              key={p.name}
              className="flex items-center justify-between py-3"
              style={{
                borderBottom:
                  i < 3 ? "1px solid rgba(244,239,230,0.1)" : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{p.icon}</div>
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-[10px] opacity-60">{p.role}</div>
                </div>
              </div>
              <div className="font-mono font-bold text-sm">{p.cases}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-6 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        style={{ background: "var(--success)", color: "white" }}
      >
        <Quote className="w-12 h-12 opacity-50 shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <div className="font-display text-xl sm:text-2xl font-extrabold leading-tight">
            "Иргэдийн мэдээлэл бол хотын засаглалын хамгийн чухал түүхий эд."
          </div>
          <div className="text-sm opacity-80 mt-2">
            — erxes Academy x ЗАА хамтран
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// ISSUE CARD
// =============================================================

function IssueCard({ issue, onClick, delay = 0 }) {
  const cat = CATEGORIES.find((c) => c.id === issue.category) || CATEGORIES[0];
  const status = {
    pending: { label: "ХҮЛЭЭГДЭЖ БУЙ", color: "#C84B31" },
    in_progress: { label: "ЯВЦДАА", color: "#E08A2A" },
    resolved: { label: "ШИЙДЭГДСЭН", color: "#5C8A3A" },
  }[issue.status];

  return (
    <article
      onClick={onClick}
      className="card-hover cursor-pointer rounded-2xl overflow-hidden fade-up"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="aspect-[4/3] relative overflow-hidden"
        style={{
          background: issue.imageUrl
            ? undefined
            : `linear-gradient(135deg, ${cat.color}40, ${cat.color}20)`,
        }}
      >
        {issue.imageUrl ? (
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 grain"></div>
            <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl opacity-50">
              {cat.icon}
            </div>
          </>
        )}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider backdrop-blur-md"
          style={{ background: status.color + "E0", color: "#FFF" }}
        >
          ● {status.label}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div
            className="px-2 py-1 rounded text-[10px] font-mono backdrop-blur-md"
            style={{ background: "#1A1A1ACC", color: "#F4EFE6" }}
          >
            {issue.district}
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="text-[10px] font-mono tracking-[0.15em] opacity-60 mb-2">
          {cat.label.toUpperCase()}
        </div>
        <h3 className="font-display text-lg sm:text-xl font-extrabold leading-snug mb-2 line-clamp-2">
          {issue.title}
        </h3>
        <div className="text-xs opacity-60 mb-4 flex items-center gap-1">
          <MapPin className="w-3 h-3 shrink-0" />{" "}
          <span className="truncate">{issue.address}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3 opacity-70">
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> {issue.votes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />{" "}
              {issue.comments?.length ?? 0}
            </span>
          </div>
          <div className="opacity-50">{issue.time}</div>
        </div>
      </div>
    </article>
  );
}

// =============================================================
// ISSUE DETAIL MODAL (with working like + comments)
// =============================================================

function IssueDetailModal({ issue, onClose, onLike, onComment }) {
  const cat = CATEGORIES.find((c) => c.id === issue.category) || CATEGORIES[0];
  const status = {
    pending: { label: "Хүлээгдэж буй", color: "#C84B31", step: 1 },
    in_progress: { label: "Явцдаа", color: "#E08A2A", step: 2 },
    resolved: { label: "Шийдэгдсэн", color: "#5C8A3A", step: 3 },
  }[issue.status];

  const [commentText, setCommentText] = useState("");
  const [liking, setLiking] = useState(false);

  const handleLike = () => {
    onLike();
    setLiking(true);
    setTimeout(() => setLiking(false), 400);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    onComment(commentText.trim());
    setCommentText("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 fade-in"
      style={{ background: "rgba(26,26,26,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto slide-up-fade"
        style={{ background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="aspect-[16/8] relative"
          style={{
            background: issue.imageUrl
              ? undefined
              : `linear-gradient(135deg, ${cat.color}50, ${cat.color}20)`,
          }}
        >
          {issue.imageUrl ? (
            <img
              src={issue.imageUrl}
              alt={issue.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 grain"></div>
              <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-40">
                {cat.icon}
              </div>
            </>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-lg"
          >
            <X className="w-4 h-4" style={{ color: "#1A1A1A" }} />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[10px] font-mono tracking-[0.2em] opacity-60">
              {cat.label.toUpperCase()}
            </div>
            <div className="w-1 h-1 rounded-full bg-current opacity-30"></div>
            <div className="text-[10px] font-mono opacity-60">{issue.time}</div>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold leading-tight mb-4">
            {issue.title}
          </h2>
          <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="font-medium">{issue.address}</span>
            <span className="opacity-50">·</span>
            <span className="opacity-70">{issue.district} дүүрэг</span>
          </div>

          {/* STATUS PROGRESS */}
          <div
            className="mb-7 p-5 rounded-2xl"
            style={{ background: "var(--surface-soft)" }}
          >
            <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-3">
              ТӨЛӨВ
            </div>
            <div className="flex items-center gap-2">
              {["Илгээгдсэн", "Хүлээн авсан", "Шийдэгдсэн"].map((s, i) => (
                <div key={s} className="flex-1">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      background:
                        i < status.step ? status.color : "var(--border-strong)",
                    }}
                  ></div>
                  <div
                    className={`text-xs mt-2 ${i < status.step ? "font-bold" : "opacity-50"}`}
                  >
                    {s}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-6">
            {issue.description}
          </p>

          <div
            className="flex items-center justify-between p-4 rounded-2xl mb-6"
            style={{ background: "var(--surface-soft)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-text)",
                }}
              >
                {issue.reporter[0]}
              </div>
              <div>
                <div className="text-sm font-semibold">{issue.reporter}</div>
                <div className="text-xs opacity-60">Мэдэгдсэн иргэн</div>
              </div>
            </div>
            <button className="text-xs font-mono opacity-60 hover:opacity-100">
              ПРОФАЙЛ →
            </button>
          </div>

          {/* LIKE + COMMENT BUTTONS */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleLike}
              className={`flex-1 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${
                liking ? "heart-bounce" : ""
              }`}
              style={{
                background: issue.liked ? "var(--accent)" : "var(--primary)",
                color: "var(--primary-text)",
              }}
            >
              <Heart
                className="w-4 h-4"
                fill={issue.liked ? "currentColor" : "none"}
              />
              Дэмжих ({issue.votes})
            </button>
          </div>

          {/* COMMENTS */}
          <div
            className="border-t pt-6"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-4 flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" />
              СЭТГЭГДЭЛ ({issue.comments?.length ?? 0})
            </div>

            {/* Comment list */}
            <div className="space-y-3 mb-4">
              {issue.comments?.length === 0 && (
                <div className="text-sm opacity-50 italic">
                  Анхны сэтгэгдлээ үлдээ.
                </div>
              )}
              {issue.comments?.map((c, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-2xl"
                  style={{ background: "var(--surface-soft)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                    style={{
                      background: "var(--primary)",
                      color: "var(--primary-text)",
                    }}
                  >
                    {c.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold">{c.user}</span>
                      <span className="text-[10px] opacity-50 font-mono">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-sm opacity-80 break-words">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment input */}
            <div className="flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                placeholder="Сэтгэгдэл бичих..."
                className="flex-1 px-4 py-3 rounded-full text-sm"
                style={{
                  background: "var(--surface-soft)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              />
              <button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="btn-primary px-4 sm:px-5 py-3 rounded-full font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// SUBMIT MODAL (with real upload + EXIF GPS)
// =============================================================

function SubmitModal({ onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [coords, setCoords] = useState(null);
  const [coordsSource, setCoordsSource] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Зөвхөн зураг сонгоно уу");
      return;
    }

    setImageFile(file);

    // Use data URL (base64) instead of blob URL so image persists after modal closes.
    // Blob URLs get revoked when the modal unmounts, breaking the image in the issue card.
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    setImageUrl(dataUrl);

    setLoadingLocation(true);
    setCoords(null);
    setCoordsSource(null);

    // Try EXIF first (reads file directly, doesn't depend on URL)
    const exifGps = await parseExifGPS(file);
    if (exifGps) {
      setCoords(exifGps);
      setCoordsSource("Зургийн EXIF мэдээллээс");
      setLoadingLocation(false);
      return;
    }

    // Fallback to browser geolocation
    const browserGps = await getBrowserLocation();
    if (browserGps) {
      setCoords(browserGps);
      setCoordsSource("Browser байршлаас (зургаас олдсонгүй)");
    } else {
      // Default UB center
      setCoords({ lat: 47.918, lon: 106.917, source: "default" });
      setCoordsSource("Анхдагч (УБ төв)");
    }
    setLoadingLocation(false);
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // No cleanup needed for data URLs (unlike blob URLs from URL.createObjectURL).
  // Data URLs are plain strings and get garbage-collected automatically.

  const canProceed = () => {
    if (step === 1) return imageFile !== null;
    if (step === 2) return selectedCat !== null && title.trim().length > 0;
    if (step === 3) return desc.trim().length > 0;
    return false;
  };

  const handleSubmit = () => {
    const districtGuess = coords
      ? guessDistrict(coords.lat, coords.lon)
      : "Сүхбаатар";
    onSubmit({
      title,
      description: desc,
      category: selectedCat,
      district: districtGuess,
      address: `${districtGuess} дүүрэг (${coords?.lat.toFixed(4) || "?"}, ${coords?.lon.toFixed(4) || "?"})`,
      imageUrl,
      coords,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 fade-in"
      style={{ background: "rgba(26,26,26,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto slide-up-fade"
        style={{ background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-2">
                АЛХАМ {step} / 3
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
                {
                  ["Зураг оруулах", "Ангилал & нэр", "Тайлбар & илгээх"][
                    step - 1
                  ]
                }
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "var(--surface-soft)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* PROGRESS */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex-1 h-1 rounded-full transition-all"
                style={{
                  background:
                    s <= step ? "var(--primary)" : "var(--border-strong)",
                }}
              ></div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />

              {!imageUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={onDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="aspect-[4/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/5"
                  style={{ borderColor: "var(--border-strong)" }}
                >
                  <Upload className="w-12 h-12 mb-3 opacity-40" />
                  <div className="font-display text-xl font-bold">
                    Зурагаа оруул
                  </div>
                  <div className="text-sm opacity-60 mt-1">
                    Дарж сонгох эсвэл чирээд тавь
                  </div>
                  <div className="text-[10px] font-mono opacity-50 mt-3">
                    JPG, PNG, HEIC
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <img
                    src={imageUrl}
                    alt="upload preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImageUrl(null);
                      setCoords(null);
                      setCoordsSource(null);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" style={{ color: "#1A1A1A" }} />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold bg-white shadow-lg"
                    style={{ color: "#1A1A1A" }}
                  >
                    Солих
                  </button>
                </div>
              )}

              <div
                className="p-4 rounded-2xl flex items-center gap-3"
                style={{ background: "var(--surface-soft)" }}
              >
                <Navigation
                  className="w-5 h-5 shrink-0"
                  style={{ color: "var(--primary)" }}
                />
                <div className="flex-1 min-w-0">
                  {loadingLocation ? (
                    <div className="text-sm">Байршил тогтоож байна…</div>
                  ) : coords ? (
                    <>
                      <div className="text-sm font-semibold">
                        Байршил олдлоо
                      </div>
                      <div className="text-xs opacity-60 font-mono truncate">
                        {coords.lat.toFixed(4)}° N · {coords.lon.toFixed(4)}° E
                      </div>
                      <div className="text-[10px] opacity-50 mt-0.5">
                        {coordsSource}
                      </div>
                    </>
                  ) : imageFile ? (
                    <>
                      <div className="text-sm font-semibold">
                        Байршил тогтоосонгүй
                      </div>
                      <div className="text-xs opacity-60">
                        Зургийн EXIF болон browser-аас олдсонгүй
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm font-semibold opacity-70">
                        Зураг оруулсны дараа байршил тогтооно
                      </div>
                      <div className="text-xs opacity-50">
                        EXIF болон browser-аас автомат
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-mono tracking-[0.15em] mb-3 opacity-60">
                  КАТЕГОРИ СОНГО
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCat(c.id)}
                      className="p-4 rounded-xl text-left flex items-center gap-3 transition-all"
                      style={{
                        background:
                          selectedCat === c.id
                            ? c.color + "15"
                            : "var(--surface-soft)",
                        border: `2px solid ${selectedCat === c.id ? c.color : "transparent"}`,
                      }}
                    >
                      <div className="text-2xl">{c.icon}</div>
                      <div className="text-sm font-semibold">{c.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono tracking-[0.15em] mb-2 opacity-60">
                  АСУУДЛЫН НЭР
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Жишээ: Энхтайваны зам дээрх том нүх"
                  className="w-full p-4 rounded-xl text-sm"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--text)",
                  }}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-mono tracking-[0.15em] mb-2 opacity-60">
                  ДЭЛГЭРЭНГҮЙ ТАЙЛБАР
                </div>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Асуудлыг дэлгэрэнгүй тайлбарла. Хэр удсан? Ямар нөлөө үзүүлж байна?"
                  rows={5}
                  className="w-full p-4 rounded-xl text-sm resize-none"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--text)",
                  }}
                />
              </div>
              <div
                className="p-4 rounded-2xl"
                style={{ background: "var(--surface-soft)" }}
              >
                <div className="text-xs font-mono tracking-[0.15em] mb-3 opacity-60">
                  ХУРААНГУЙ
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="opacity-60 shrink-0">Категори:</span>
                    <span className="font-semibold text-right">
                      {CATEGORIES.find((c) => c.id === selectedCat)?.label ||
                        "—"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="opacity-60 shrink-0">Нэр:</span>
                    <span className="font-semibold text-right truncate">
                      {title || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="opacity-60 shrink-0">Байршил:</span>
                    <span className="font-mono text-xs text-right">
                      {coords
                        ? `${coords.lat.toFixed(4)}° N · ${coords.lon.toFixed(4)}° E`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="opacity-60 shrink-0">Зураг:</span>
                    <span className="font-semibold">
                      {imageFile?.name?.slice(0, 24) || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-3 rounded-full font-semibold"
                style={{ border: "1px solid var(--border-strong)" }}
              >
                Буцах
              </button>
            )}
            <button
              onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
              disabled={!canProceed()}
              className="btn-primary flex-1 py-3 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step < 3 ? "Үргэлжлүүлэх" : "Илгээх"}{" "}
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// TOAST
// =============================================================

function Toast({ message, type }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] slide-up-fade"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="px-5 py-3.5 rounded-full flex items-center gap-3 shadow-2xl"
        style={{
          background:
            type === "success"
              ? "var(--success)"
              : type === "error"
                ? "var(--accent)"
                : "var(--inverse)",
          color: type === "info" ? "var(--inverse-text)" : "white",
          boxShadow: "0 12px 40px -8px rgba(0,0,0,0.3)",
        }}
      >
        {type === "success" && <CheckCircle className="w-5 h-5" />}
        {type === "error" && <AlertTriangle className="w-5 h-5" />}
        {type === "info" && <ShieldCheck className="w-5 h-5" />}
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
}
