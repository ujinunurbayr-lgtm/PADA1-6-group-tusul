"use client";
"useState";
"useMemo";
"useEffect";
"onClick";
import { useState, useMemo } from "react";
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

const ISSUES = [
  {
    id: 1,
    title: "Энхтайваны өргөн чөлөөн дээрх том нүх",
    category: "pothole",
    district: "Сүхбаатар",
    address: "Энхтайваны өргөн чөлөө 12",
    status: "pending",
    votes: 47,
    comments: 12,
    time: "2 цагийн өмнө",
    reporter: "Б.Ариунаа",
    description:
      "Их сургуулийн зүүн талд том нүх үүсээд бараг хагас сар болж байна. Машин эвдрэх аюултай.",
    image: "pothole",
  },
  {
    id: 2,
    title: "Нарны зам дагуу гэрэл асахгүй байна",
    category: "light",
    district: "Баянзүрх",
    address: "Нарны зам, 13-р хороо",
    status: "in_progress",
    votes: 89,
    comments: 23,
    time: "1 өдрийн өмнө",
    reporter: "Д.Ган-Эрдэнэ",
    description:
      "Нарны замын 4 гэрэлтүүлэг сар гаран асаагүй. Орой явахад аюултай.",
    image: "streetlight",
  },
  {
    id: 3,
    title: "Хог цуглуулагдаагүй удаж байна",
    category: "trash",
    district: "Баянгол",
    address: "3-р хороолол, 22-р байр",
    status: "resolved",
    votes: 134,
    comments: 41,
    time: "3 өдрийн өмнө",
    reporter: "С.Мөнхзул",
    description:
      "Хогийн машин сүүлийн 2 долоо хоног ирээгүй. Үнэр маш муу болсон.",
    image: "trash",
  },
  {
    id: 4,
    title: "Явган замын чулуу эвдэрсэн",
    category: "sidewalk",
    district: "Чингэлтэй",
    address: "Тээврийн товчоо орчим",
    status: "pending",
    votes: 28,
    comments: 7,
    time: "5 цагийн өмнө",
    reporter: "Т.Билгүүн",
    description:
      "Тээврийн товчооноос их дэлгүүр хүртэлх явган зам бүх чулуу нь товойсон.",
    image: "sidewalk",
  },
];

// =============================================================
// MAIN COMPONENT
// =============================================================

export default function ZasaaraiApp() {
  const [view, setView] = useState("home");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  const stats = useMemo(() => {
    const total = DISTRICTS.reduce((s, d) => s + d.issues, 0);
    const resolved = DISTRICTS.reduce((s, d) => s + d.resolved, 0);
    return { total, resolved, rate: Math.round((resolved / total) * 100) };
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "#F4EFE6",
        color: "#1A1A1A",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800;9..144,900&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; font-feature-settings: "ss01"; letter-spacing: -0.02em; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .grain { background-image: radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px); background-size: 4px 4px; }
        .marker-pulse { animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.15); opacity: 1; } }
        .btn-primary { background: #0F3D5C; color: #F4EFE6; transition: all 0.2s; }
        .btn-primary:hover { background: #1a5580; transform: translateY(-1px); }
        .card-hover { transition: all 0.25s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 32px -8px rgba(15, 61, 92, 0.15); }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #C84B31; transition: width 0.2s; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .ticker { animation: scroll 40s linear infinite; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease-out forwards; }
      `}</style>

      {/* HEADER */}
      <header
        className="border-b sticky top-0 z-50 backdrop-blur-md"
        style={{
          borderColor: "#1A1A1A20",
          background: "rgba(244, 239, 230, 0.92)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setView("home")}
            >
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center relative"
                style={{ background: "#0F3D5C" }}
              >
                <MapPin className="w-5 h-5" style={{ color: "#F4EFE6" }} />
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                  style={{ background: "#C84B31" }}
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
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              <button
                onClick={() => setView("home")}
                className={`nav-link ${view === "home" ? "active" : ""}`}
              >
                Нүүр
              </button>
              <button
                onClick={() => setView("map")}
                className={`nav-link ${view === "map" ? "active" : ""}`}
              >
                Газрын зураг
              </button>
              <button
                onClick={() => setView("feed")}
                className={`nav-link ${view === "feed" ? "active" : ""}`}
              >
                Асуудлууд
              </button>
              <button
                onClick={() => setView("stats")}
                className={`nav-link ${view === "stats" ? "active" : ""}`}
              >
                Статистик
              </button>
              <button
                onClick={() => setView("report")}
                className={`nav-link ${view === "report" ? "active" : ""}`}
              >
                Сарын тайлан
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSubmit(true)}
              className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Асуудал мэдэгдэх
            </button>
            <div
              className="w-9 h-9 rounded-full hidden sm:flex items-center justify-center font-display font-bold text-sm"
              style={{ background: "#1A1A1A", color: "#F4EFE6" }}
            >
              Б
            </div>
          </div>
        </div>
      </header>

      {/* TICKER */}
      <div
        className="border-b py-2 overflow-hidden"
        style={{ borderColor: "#1A1A1A15", background: "#0F3D5C" }}
      >
        <div
          className="ticker flex gap-12 whitespace-nowrap text-xs font-mono"
          style={{ color: "#F4EFE6" }}
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
          setView={setView}
          stats={stats}
          setSelectedIssue={setSelectedIssue}
          setShowSubmit={setShowSubmit}
        />
      )}
      {view === "map" && (
        <MapView
          hoveredDistrict={hoveredDistrict}
          setHoveredDistrict={setHoveredDistrict}
          setSelectedIssue={setSelectedIssue}
        />
      )}
      {view === "feed" && (
        <FeedView
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          setSelectedIssue={setSelectedIssue}
        />
      )}
      {view === "stats" && <StatsView stats={stats} />}
      {view === "report" && <ReportView stats={stats} />}

      {/* MODALS */}
      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
      {showSubmit && <SubmitModal onClose={() => setShowSubmit(false)} />}

      {/* FOOTER */}
      <footer
        className="mt-24 border-t"
        style={{
          borderColor: "#1A1A1A20",
          background: "#1A1A1A",
          color: "#F4EFE6",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="font-display text-4xl font-extrabold mb-4">
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
            className="mt-12 pt-8 border-t flex justify-between items-center text-xs font-mono opacity-50"
            style={{ borderColor: "#F4EFE610" }}
          >
            <div>© 2026 ЗАСААРАЙ — erxes Academy PADA-1</div>
            <div>v0.6.0 · MIT License</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// =============================================================
// HOME VIEW
// =============================================================

function HomeView({ setView, stats, setSelectedIssue, setShowSubmit }) {
  return (
    <div className="fade-up">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-7">
          <div className="text-xs font-mono tracking-[0.25em] mb-6 flex items-center gap-3 opacity-70">
            <div className="w-8 h-px" style={{ background: "#1A1A1A" }}></div>
            EST. 2026 / ULAANBAATAR
          </div>
          <h1
            className="font-display font-extrabold leading-[0.92] mb-8"
            style={{ fontSize: "clamp(48px, 8vw, 112px)" }}
          >
            Хотынхоо
            <br />
            <span style={{ color: "#C84B31", fontStyle: "italic" }}>
              асуудлыг
            </span>
            <br />
            харуулъя.
          </h1>
          <p className="text-lg max-w-xl opacity-75 mb-10">
            Эвдэрсэн зам, гэрэлгүй гудамж, овоорсон хог — эдгээрийг хэн ч
            цэгцлэхгүй учир биш, харин хаана байгааг хэн ч мэдэхгүй учир хэвээр
            байна. Зураг авч, байршлаа оруул, бид газрын зурагт буулгана.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowSubmit(true)}
              className="btn-primary px-7 py-4 rounded-full font-semibold flex items-center gap-2 group"
            >
              Эхлээд мэдэгдье{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setView("map")}
              className="px-7 py-4 rounded-full font-semibold flex items-center gap-2"
              style={{ border: "1.5px solid #1A1A1A30" }}
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
            accent="#0F3D5C"
            big
          />
          <StatCard
            label="ШИЙДЭГДСЭН"
            value={stats.resolved}
            accent="#5C8A3A"
          />
          <StatCard
            label="ШИЙДВЭРЛЭХ ХУВЬ"
            value={`${stats.rate}%`}
            accent="#C84B31"
          />
          <StatCard label="ИДЭВХТЭЙ ХЭРЭГЛЭГЧ" value="2,847" accent="#1A1A1A" />
        </div>
      </section>

      {/* HERO IMAGE STRIP */}
      <section
        className="border-y py-3 overflow-hidden"
        style={{ borderColor: "#1A1A1A15", background: "#1A1A1A" }}
      >
        <div
          className="flex gap-3 px-6 max-w-7xl mx-auto items-center text-xs font-mono tracking-wider"
          style={{ color: "#F4EFE6" }}
        >
          <span className="opacity-50">КАТЕГОРИ:</span>
          {CATEGORIES.map((c) => (
            <span
              key={c.id}
              className="px-3 py-1.5 rounded-full whitespace-nowrap"
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
      </section>

      {/* RECENT ISSUES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
              01 / СҮҮЛИЙН МЭДЭГДЛҮҮД
            </div>
            <h2 className="font-display text-5xl font-extrabold">
              Шинэ асуудлууд.
            </h2>
          </div>
          <button
            onClick={() => setView("feed")}
            className="text-sm font-semibold flex items-center gap-2 opacity-70 hover:opacity-100"
          >
            БҮХ АСУУДАЛ <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ISSUES.map((issue, i) => (
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
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
            02 / ХЭРХЭН АЖИЛЛАХ ВЭ
          </div>
          <h2 className="font-display text-5xl font-extrabold leading-[0.95]">
            Гурван
            <br />
            энгийн
            <br />
            алхам.
          </h2>
        </div>
        <div className="md:col-span-8 grid md:grid-cols-3 gap-5">
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
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div
          onClick={() => setView("report")}
          className="cursor-pointer rounded-3xl p-8 md:p-10 grid md:grid-cols-12 gap-6 items-center transition-all hover:translate-y-[-2px]"
          style={{ background: "#F4EFE6", border: "1px solid #1A1A1A15" }}
        >
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "88px", color: "#5C8A3A" }}
            >
              67<span style={{ fontSize: "40px" }}>%</span>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="text-xs font-mono tracking-[0.25em] mb-2 opacity-60 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> 03 / 4-Р САРЫН ИЛ ТОД БАЙДЛЫН
              ТАЙЛАН
            </div>
            <div className="font-display text-2xl md:text-3xl font-extrabold leading-tight">
              Энэ сард мэдэгдсэн асуудлын{" "}
              <em style={{ color: "#5C8A3A" }}>үнэн зөв тоо</em> — олон нийтэд
              ил.
            </div>
            <div className="text-sm opacity-70 mt-2">
              Төрийн түнш байгууллагуудтай хамтран сар бүр хариуцлагын тайлан
              гаргадаг.
            </div>
          </div>
          <div className="md:col-span-3 flex md:justify-end">
            <div
              className="px-5 py-3 rounded-full font-semibold flex items-center gap-2 text-sm"
              style={{ background: "#0F3D5C", color: "#F4EFE6" }}
            >
              Тайлан үзэх <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div
          className="rounded-3xl p-12 md:p-16 grid md:grid-cols-12 gap-8 items-center"
          style={{ background: "#0F3D5C", color: "#F4EFE6" }}
        >
          <div className="md:col-span-8">
            <div className="text-xs font-mono tracking-[0.25em] mb-4 opacity-70">
              МАНАЙ ҮЗЭЛ БОДОЛ
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.05]">
              "Хариуцлагатай иргэн ={" "}
              <span style={{ fontStyle: "italic", color: "#F4B05C" }}>
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
              style={{ background: "#F4B05C", color: "#0F3D5C" }}
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
      style={{ background: "#FFFFFF", border: "1px solid #1A1A1A10" }}
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
        className={`font-display font-extrabold leading-none ${big ? "text-7xl" : "text-4xl"}`}
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
      className="card-hover p-7 rounded-2xl bg-white"
      style={{ border: "1px solid #1A1A1A10" }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="font-mono text-xs tracking-[0.2em] opacity-50">
          {num}
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "#0F3D5C", color: "#F4EFE6" }}
        >
          {icon}
        </div>
      </div>
      <h3 className="font-display text-2xl font-extrabold mb-2">{title}</h3>
      <p className="text-sm opacity-70 leading-relaxed">{text}</p>
    </div>
  );
}

// =============================================================
// MAP VIEW
// =============================================================

function MapView({ hoveredDistrict, setHoveredDistrict, setSelectedIssue }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 fade-up">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
            УЛААНБААТАР / ЗОВЛОНГИЙН ЗУРАГ
          </div>
          <h2 className="font-display text-5xl font-extrabold">Дүүргүүдээр.</h2>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <button
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{ border: "1px solid #1A1A1A20" }}
          >
            <Filter className="w-4 h-4" /> Шүүлтүүр
          </button>
          <button
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{ border: "1px solid #1A1A1A20" }}
          >
            <Layers className="w-4 h-4" /> Үе
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        {/* MAP */}
        <div
          className="md:col-span-8 rounded-3xl p-8 relative overflow-hidden grain"
          style={{
            background: "#FFFFFF",
            border: "1px solid #1A1A1A10",
            minHeight: 540,
          }}
        >
          <div className="absolute top-6 left-6 z-10">
            <div className="text-xs font-mono opacity-50">
              47.918° N · 106.917° E
            </div>
            <div className="font-display text-2xl font-extrabold mt-1">
              Улаанбаатар хот
            </div>
          </div>
          <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 text-xs">
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
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ minHeight: 480 }}
          >
            {/* Background terrain */}
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
                  fill="#0F3D5C"
                  opacity="0.08"
                />
              </pattern>
              <radialGradient id="cityglow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0F3D5C" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#0F3D5C" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#terrain)" />
            <circle cx="50" cy="50" r="40" fill="url(#cityglow)" />

            {/* Tuul river */}
            <path
              d="M 5 80 Q 30 75 50 78 T 95 70"
              stroke="#0F3D5C"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
              strokeDasharray="1 1"
            />
            <text
              x="20"
              y="85"
              fontSize="2"
              fill="#0F3D5C"
              opacity="0.5"
              className="font-mono"
            >
              Туул гол
            </text>

            {/* District markers */}
            {DISTRICTS.map((d) => {
              const color =
                d.issues > 100
                  ? "#C84B31"
                  : d.issues > 50
                    ? "#E08A2A"
                    : "#5C8A3A";
              const isHovered = hoveredDistrict === d.id;
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
                        rx="1"
                        fill="#1A1A1A"
                      />
                      <text
                        x={d.x}
                        y={d.y - 12}
                        fontSize="2.4"
                        fill="#F4EFE6"
                        textAnchor="middle"
                        className="font-mono font-bold"
                      >
                        {d.name}
                      </text>
                      <text
                        x={d.x}
                        y={d.y - 9}
                        fontSize="2"
                        fill="#F4B05C"
                        textAnchor="middle"
                        className="font-mono"
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
                      fill="#1A1A1A"
                      textAnchor="middle"
                      className="font-mono font-bold"
                    >
                      {d.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono">
            <div className="opacity-50">Дүүргийн дээр гүйлгээд хар</div>
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
                className="card-hover p-4 rounded-xl bg-white flex items-center justify-between cursor-pointer"
                style={{ border: "1px solid #1A1A1A10" }}
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
            style={{ background: "#1A1A1A", color: "#F4EFE6" }}
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
// FEED VIEW
// =============================================================

function FeedView({ filterCategory, setFilterCategory, setSelectedIssue }) {
  const filtered =
    filterCategory === "all"
      ? ISSUES
      : ISSUES.filter((i) => i.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 fade-up">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
            БҮХ МЭДЭГДЭЛ
          </div>
          <h2 className="font-display text-5xl font-extrabold">
            Сүүлийн асуудлууд.
          </h2>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            placeholder="Хайх..."
            className="pl-11 pr-5 py-3 rounded-full text-sm w-72 bg-white"
            style={{ border: "1px solid #1A1A1A20" }}
          />
        </div>
      </div>

      {/* CATEGORY PILLS */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-all ${filterCategory === "all" ? "" : "opacity-60"}`}
          style={{
            background: filterCategory === "all" ? "#1A1A1A" : "transparent",
            color: filterCategory === "all" ? "#F4EFE6" : "#1A1A1A",
            border: filterCategory === "all" ? "none" : "1px solid #1A1A1A20",
          }}
        >
          Бүгд
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterCategory(c.id)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-all ${filterCategory === c.id ? "" : "opacity-60"}`}
            style={{
              background: filterCategory === c.id ? c.color : "transparent",
              color: filterCategory === c.id ? "#FFF" : "#1A1A1A",
              border: filterCategory === c.id ? "none" : "1px solid #1A1A1A20",
            }}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {filtered.map((issue, i) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onClick={() => setSelectedIssue(issue)}
            delay={i * 0.05}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-20 opacity-50">
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
    <div className="max-w-7xl mx-auto px-6 py-12 fade-up">
      <div className="mb-10">
        <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60">
          ӨГӨГДЛИЙН ХАРАГДАЦ
        </div>
        <h2 className="font-display text-5xl font-extrabold">Хотын мэдрэмж.</h2>
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
          accent="#5C8A3A"
        />
        <BigStat
          label="ИДЭВХТЭЙ ИРГЭД"
          value="2,847"
          sub="бүртгэлтэй хэрэглэгч"
          trend="+34%"
          accent="#C84B31"
        />
      </div>

      <div className="grid md:grid-cols-12 gap-5">
        <div
          className="md:col-span-7 p-7 rounded-3xl bg-white"
          style={{ border: "1px solid #1A1A1A10" }}
        >
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-xs font-mono tracking-[0.2em] opacity-60">
                ДҮҮРГИЙН ЗАГВАРААР
              </div>
              <div className="font-display text-2xl font-extrabold mt-1">
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
                      style={{ background: "#1A1A1A08" }}
                    >
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${w}%`, background: "#0F3D5C" }}
                      ></div>
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${rw}%`, background: "#5C8A3A" }}
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
                style={{ background: "#0F3D5C" }}
              ></div>
              Нийт
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#5C8A3A" }}
              ></div>
              Шийдэгдсэн
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-5">
          <div
            className="p-7 rounded-3xl"
            style={{ background: "#0F3D5C", color: "#F4EFE6" }}
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
                        style={{ background: "#F4EFE620" }}
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
            className="p-7 rounded-3xl bg-white"
            style={{ border: "1px solid #1A1A1A10" }}
          >
            <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-3">
              ХАМГИЙН ИДЭВХТЭЙ ИРГЭД
            </div>
            {["Б.Ариунаа", "Д.Ган-Эрдэнэ", "С.Мөнхзул"].map((n, i) => (
              <div
                key={n}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: i < 2 ? "1px solid #1A1A1A10" : "none" }}
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

function BigStat({ label, value, sub, trend, accent = "#0F3D5C" }) {
  return (
    <div
      className="p-7 rounded-3xl bg-white"
      style={{ border: "1px solid #1A1A1A10" }}
    >
      <div className="text-xs font-mono tracking-[0.2em] opacity-60">
        {label}
      </div>
      <div
        className="font-display font-extrabold text-6xl my-3 leading-none"
        style={{ color: accent }}
      >
        {value}
      </div>
      <div className="flex justify-between items-end">
        <div className="text-sm opacity-60">{sub}</div>
        <div
          className="text-xs font-mono font-bold flex items-center gap-1"
          style={{ color: "#5C8A3A" }}
        >
          <TrendingUp className="w-3 h-3" /> {trend}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// MONTHLY TRANSPARENCY REPORT
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

  const partners = [
    {
      name: "УБ хотын Захирагчийн ажлын алба",
      role: "Стратегийн түнш",
      icon: "🏛",
      cases: 89,
    },
    {
      name: "Тохижилт Үйлчилгээ ОНӨААТҮГ",
      role: "Гүйцэтгэгч",
      icon: "🚧",
      cases: 142,
    },
    {
      name: "Замын засвар арчлалтын газар",
      role: "Гүйцэтгэгч",
      icon: "🛣",
      cases: 76,
    },
    { name: "Дүүргийн ИТХ-ууд (9)", role: "Хяналт", icon: "⚖", cases: 247 },
  ];

  const reportedCount = 367;
  const inProgressCount = 84;
  const fixedCount = 247;
  const fixRate = Math.round((fixedCount / reportedCount) * 100);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 fade-up">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <div className="text-xs font-mono tracking-[0.25em] mb-3 opacity-60 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" /> ИЛ ТОД БАЙДЛЫН ТАЙЛАН · 04 /
            2026
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold leading-[0.95]">
            Хариуцлага
            <br />
            тоогоор.
          </h2>
        </div>
        <button
          className="px-5 py-3 rounded-full text-sm font-semibold flex items-center gap-2 bg-white"
          style={{ border: "1.5px solid #1A1A1A20" }}
        >
          <Download className="w-4 h-4" /> PDF татах
        </button>
      </div>

      {/* HERO METRIC */}
      <div
        className="rounded-3xl p-10 md:p-14 mb-8 relative overflow-hidden"
        style={{ background: "#0F3D5C", color: "#F4EFE6" }}
      >
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "#5C8A3A" }}
        ></div>
        <div
          className="absolute -bottom-32 -left-10 w-96 h-96 rounded-full opacity-5"
          style={{ background: "#C84B31" }}
        ></div>
        <div className="relative grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="text-xs font-mono tracking-[0.25em] opacity-60 mb-4">
              ЭНЭ САРЫН ҮР ДҮН
            </div>
            <div
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(80px, 14vw, 200px)", color: "#5C8A3A" }}
            >
              {fixRate}
              <span style={{ fontSize: "0.5em" }}>%</span>
            </div>
            <div className="font-display text-2xl md:text-3xl mt-4 max-w-lg">
              мэдэгдсэн асуудлын{" "}
              <em style={{ color: "#5C8A3A" }}>засагдсан хувь</em>
            </div>
            <div className="text-sm opacity-70 mt-3 max-w-md">
              4-р сард иргэдийн мэдэгдсэн {reportedCount} асуудлаас {fixedCount}{" "}
              нь хариуцлагатай түнш байгууллагуудаар бүрэн шийдэгдэв.
            </div>
          </div>
          <div className="md:col-span-5 space-y-3">
            <ReportTile
              dot="#C84B31"
              label="МЭДЭГДСЭН"
              value={reportedCount}
              sub="Reported"
            />
            <ReportTile
              dot="#E08A2A"
              label="ШИЙДЭГДЭЖ БУЙ"
              value={inProgressCount}
              sub="In progress"
            />
            <ReportTile
              dot="#5C8A3A"
              label="ШИЙДЭГДСЭН"
              value={fixedCount}
              sub="Fixed"
            />
          </div>
        </div>
      </div>

      {/* STATUS FLOW */}
      <div
        className="bg-white rounded-3xl p-8 mb-8"
        style={{ border: "1px solid #1A1A1A10" }}
      >
        <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-2">
          УРСГАЛ
        </div>
        <div className="font-display text-2xl font-extrabold mb-7">
          Асуудал хэрхэн шийдэгдэх вэ
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              c: "#C84B31",
              n: "01",
              t: "Reported",
              m: "Иргэн зураг + байршлаар асуудал нийтэлнэ. Систем дүүрэгтэй автоматаар холбоно.",
              icon: <Camera className="w-5 h-5" />,
            },
            {
              c: "#E08A2A",
              n: "02",
              t: "In progress",
              m: "Хариуцлагатай байгууллага хүлээн авч, гүйцэтгэгч томилогдон ажил эхэлнэ.",
              icon: <Clock className="w-5 h-5" />,
            },
            {
              c: "#5C8A3A",
              n: "03",
              t: "Fixed",
              m: "Засвар дуусна. Нотлох зураг + огноо платформд нийтлэгдэж олон нийт шалгана.",
              icon: <CheckCircle2 className="w-5 h-5" />,
            },
          ].map((s, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl"
              style={{ background: s.c + "10", border: `1px solid ${s.c}30` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="font-mono text-xs font-bold opacity-50">
                  {s.n}
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: s.c, color: "#FFF" }}
                >
                  {s.icon}
                </div>
              </div>
              <div className="font-display font-extrabold text-2xl mb-2">
                {s.t}
              </div>
              <div className="text-sm opacity-75 leading-relaxed">{s.m}</div>
              {i < 2 && (
                <div
                  className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full items-center justify-center z-10"
                  style={{ background: "#F4EFE6" }}
                >
                  <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-5 mb-8">
        {/* MONTHLY TREND */}
        <div
          className="md:col-span-7 bg-white rounded-3xl p-7"
          style={{ border: "1px solid #1A1A1A10" }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-xs font-mono tracking-[0.2em] opacity-60">
                6 САРЫН ХАНДЛАГА
              </div>
              <div className="font-display text-2xl font-extrabold mt-1">
                Мэдэгдэл vs Шийдэгдсэн
              </div>
            </div>
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#C84B31" }}
                ></div>
                Мэдэгдсэн
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#5C8A3A" }}
                ></div>
                Шийдэгдсэн
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-56">
            {monthlyData.map((m, i) => {
              const rh = (m.reported / maxBar) * 100;
              const fh = (m.fixed / maxBar) * 100;
              const rate = Math.round((m.fixed / m.reported) * 100);
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="text-xs font-mono font-bold opacity-70">
                    {rate}%
                  </div>
                  <div
                    className="w-full flex gap-1 items-end"
                    style={{ height: "160px" }}
                  >
                    <div
                      className="flex-1 rounded-t-md transition-all hover:opacity-80"
                      style={{ height: `${rh}%`, background: "#C84B31" }}
                    ></div>
                    <div
                      className="flex-1 rounded-t-md transition-all hover:opacity-80"
                      style={{ height: `${fh}%`, background: "#5C8A3A" }}
                    ></div>
                  </div>
                  <div className="text-[10px] font-mono opacity-60">
                    {m.month}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="mt-6 pt-5 flex items-center gap-3 text-sm"
            style={{ borderTop: "1px solid #1A1A1A10" }}
          >
            <TrendingUp className="w-4 h-4" style={{ color: "#5C8A3A" }} />
            <span className="opacity-75">
              Шийдэгдэх хувь сүүлийн 6 сард{" "}
              <strong style={{ color: "#5C8A3A" }}>+19 пункт</strong>-ээр өсөв.
            </span>
          </div>
        </div>

        {/* DISTRICT BREAKDOWN */}
        <div
          className="md:col-span-5 bg-white rounded-3xl p-7"
          style={{ border: "1px solid #1A1A1A10" }}
        >
          <div className="text-xs font-mono tracking-[0.2em] opacity-60">
            ДҮҮРГЭЭР
          </div>
          <div className="font-display text-2xl font-extrabold mt-1 mb-5">
            Шийдвэрлэлт
          </div>
          <div className="space-y-3.5">
            {[...DISTRICTS]
              .sort((a, b) => b.resolved / b.issues - a.resolved / a.issues)
              .slice(0, 7)
              .map((d) => {
                const rate = Math.round((d.resolved / d.issues) * 100);
                const color =
                  rate >= 40 ? "#5C8A3A" : rate >= 30 ? "#E08A2A" : "#C84B31";
                return (
                  <div key={d.id}>
                    <div className="flex justify-between items-center text-sm mb-1.5">
                      <span className="font-medium">{d.name}</span>
                      <span className="font-mono font-bold" style={{ color }}>
                        {rate}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "#1A1A1A08" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${rate}%`, background: color }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* GOVERNMENT PARTNERS */}
      <div
        className="rounded-3xl p-8 mb-8"
        style={{ background: "#F4EFE6", border: "1px solid #1A1A1A15" }}
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="text-xs font-mono tracking-[0.2em] opacity-60 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" /> ХАМТРАГЧ БАЙГУУЛЛАГУУД
            </div>
            <div className="font-display text-2xl font-extrabold mt-1">
              Төрөөс хамтарсан түнш бүтэц
            </div>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "#5C8A3A20", color: "#3A6A1A" }}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Албан ёсоор баталгаажсан
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {partners.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 flex items-start gap-4"
              style={{ border: "1px solid #1A1A1A10" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: "#0F3D5C15" }}
              >
                {p.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono tracking-wider opacity-50 mb-1">
                  {p.role.toUpperCase()}
                </div>
                <div className="font-display font-bold text-base leading-tight mb-2">
                  {p.name}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="font-mono font-bold text-xl"
                    style={{ color: "#5C8A3A" }}
                  >
                    {p.cases}
                  </span>
                  <span className="text-xs opacity-60">
                    кейс шийдсэн (4-р сар)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION QUOTE */}
      <div
        className="rounded-3xl p-10 mb-8 relative"
        style={{ background: "#1A1A1A", color: "#F4EFE6" }}
      >
        <Quote className="absolute top-7 left-7 w-8 h-8 opacity-20" />
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="font-display text-2xl md:text-3xl leading-snug"
            style={{ fontStyle: "italic" }}
          >
            "Хувийн ашиг сонирхолд биш, нийгмийн төлөө. Иргэн бүр зураг авч
            мэдэгдэхэд — хариуцлагатай засаг бий болно. Энэ нь
            <span style={{ color: "#5C8A3A" }}> ил тод байдлын соёл</span>."
          </div>
          <div className="text-xs font-mono tracking-[0.2em] opacity-50 mt-6">
            — ЗАСААРАЙ-ийн эрхэм зорилго
          </div>
        </div>
      </div>

      {/* OPEN DATA */}
      <div className="grid md:grid-cols-3 gap-4">
        <div
          className="md:col-span-2 bg-white rounded-3xl p-7"
          style={{ border: "1px solid #1A1A1A10" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-2">
                НЭЭЛТТЭЙ ӨГӨГДӨЛ
              </div>
              <div className="font-display text-xl font-extrabold mb-2">
                Бүх тоо ил тод. Бүгд татаж болно.
              </div>
              <div className="text-sm opacity-70 max-w-md">
                Сэтгүүлч, судлаач, оюутан хэн ч хүсвэл сар бүрийн өгөгдлийг
                CSV/JSON форматаар татаж дүн шинжилгээ хийх боломжтой.
              </div>
            </div>
            <BarChart3 className="w-12 h-12 opacity-20 shrink-0" />
          </div>
          <div className="flex gap-2 mt-5">
            <button
              className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{ background: "#0F3D5C", color: "#F4EFE6" }}
            >
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
            <button
              className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{ background: "#1A1A1A10" }}
            >
              <Download className="w-3.5 h-3.5" /> JSON
            </button>
            <button
              className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{ background: "#1A1A1A10" }}
            >
              API хандалт
            </button>
          </div>
        </div>
        <div
          className="rounded-3xl p-7"
          style={{ background: "#5C8A3A", color: "#F4EFE6" }}
        >
          <div className="text-xs font-mono tracking-[0.2em] opacity-70 mb-2">
            5 САРЫН ЗОРИЛТ
          </div>
          <div className="font-display text-4xl font-extrabold leading-none mb-3">
            75%
          </div>
          <div className="text-sm opacity-90">
            Шийдэгдэх хувийг 8 пунктээр өсгөх. Замын засвар, гэрэлтүүлгийн
            ангилалд төвлөрнө.
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportTile({ dot, label, value, sub }) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-2xl"
      style={{ background: "#FFFFFF10", backdropFilter: "blur(10px)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ background: dot, boxShadow: `0 0 12px ${dot}` }}
        ></div>
        <div>
          <div className="text-[10px] font-mono tracking-wider opacity-60">
            {label}
          </div>
          <div className="text-xs opacity-50">{sub}</div>
        </div>
      </div>
      <div
        className="font-display font-extrabold text-3xl"
        style={{ color: dot }}
      >
        {value}
      </div>
    </div>
  );
}

// =============================================================
// ISSUE CARD
// =============================================================

function IssueCard({ issue, onClick, delay = 0 }) {
  const cat = CATEGORIES.find((c) => c.id === issue.category);
  const status = {
    pending: { label: "ХҮЛЭЭГДЭЖ БУЙ", color: "#C84B31" },
    in_progress: { label: "ЯВЦДАА", color: "#E08A2A" },
    resolved: { label: "ШИЙДЭГДСЭН", color: "#5C8A3A" },
  }[issue.status];

  return (
    <article
      onClick={onClick}
      className="card-hover cursor-pointer rounded-2xl bg-white overflow-hidden fade-up"
      style={{ border: "1px solid #1A1A1A10", animationDelay: `${delay}s` }}
    >
      {/* PHOTO PLACEHOLDER */}
      <div
        className="aspect-[4/3] relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${cat.color}40, ${cat.color}20)`,
        }}
      >
        <div className="absolute inset-0 grain"></div>
        <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-50">
          {cat.icon}
        </div>
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
        <h3 className="font-display text-xl font-extrabold leading-snug mb-2 line-clamp-2">
          {issue.title}
        </h3>
        <div className="text-xs opacity-60 mb-4 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {issue.address}
        </div>
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3 opacity-70">
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> {issue.votes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" /> {issue.comments}
            </span>
          </div>
          <div className="opacity-50">{issue.time}</div>
        </div>
      </div>
    </article>
  );
}

// =============================================================
// ISSUE DETAIL MODAL
// =============================================================

function IssueDetailModal({ issue, onClose }) {
  const cat = CATEGORIES.find((c) => c.id === issue.category);
  const status = {
    pending: { label: "Хүлээгдэж буй", color: "#C84B31", step: 1 },
    in_progress: { label: "Явцдаа", color: "#E08A2A", step: 2 },
    resolved: { label: "Шийдэгдсэн", color: "#5C8A3A", step: 3 },
  }[issue.status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-up"
      style={{ background: "#1A1A1ABB", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="aspect-[16/8] relative"
          style={{
            background: `linear-gradient(135deg, ${cat.color}50, ${cat.color}20)`,
          }}
        >
          <div className="absolute inset-0 grain"></div>
          <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-40">
            {cat.icon}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[10px] font-mono tracking-[0.2em] opacity-60">
              {cat.label.toUpperCase()}
            </div>
            <div className="w-1 h-1 rounded-full bg-current opacity-30"></div>
            <div className="text-[10px] font-mono opacity-60">{issue.time}</div>
          </div>
          <h2 className="font-display text-4xl font-extrabold leading-tight mb-4">
            {issue.title}
          </h2>
          <div className="flex items-center gap-2 mb-6 text-sm">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{issue.address}</span>
            <span className="opacity-50">·</span>
            <span className="opacity-70">{issue.district} дүүрэг</span>
          </div>

          {/* STATUS PROGRESS */}
          <div
            className="mb-7 p-5 rounded-2xl"
            style={{ background: "#F4EFE6" }}
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
                      background: i < status.step ? status.color : "#1A1A1A15",
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

          <p className="text-base opacity-80 leading-relaxed mb-6">
            {issue.description}
          </p>

          <div
            className="flex items-center justify-between p-4 rounded-2xl mb-6"
            style={{ background: "#F4EFE6" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ background: "#0F3D5C", color: "#F4EFE6" }}
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

          <div className="flex gap-3">
            <button className="btn-primary flex-1 py-3 rounded-full font-semibold flex items-center justify-center gap-2">
              <ThumbsUp className="w-4 h-4" /> Дэмжих ({issue.votes})
            </button>
            <button
              className="flex-1 py-3 rounded-full font-semibold flex items-center justify-center gap-2"
              style={{ border: "1px solid #1A1A1A20" }}
            >
              <MessageCircle className="w-4 h-4" /> Сэтгэгдэл ({issue.comments})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// SUBMIT MODAL
// =============================================================

function SubmitModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-up"
      style={{ background: "#1A1A1ABB", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-xs font-mono tracking-[0.2em] opacity-60 mb-2">
                АЛХАМ {step} / 3
              </div>
              <h2 className="font-display text-3xl font-extrabold">
                {
                  ["Зураг оруулах", "Ангилал & нэр", "Тайлбар & илгээх"][
                    step - 1
                  ]
                }
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#1A1A1A0A" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* PROGRESS */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex-1 h-1 rounded-full"
                style={{ background: s <= step ? "#0F3D5C" : "#1A1A1A15" }}
              ></div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div
                className="aspect-[4/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                style={{ borderColor: "#1A1A1A30" }}
              >
                <Upload className="w-12 h-12 mb-3 opacity-40" />
                <div className="font-display text-xl font-bold">
                  Зурагаа оруул
                </div>
                <div className="text-sm opacity-60 mt-1">Эсвэл чирээд тавь</div>
              </div>
              <div
                className="p-4 rounded-2xl flex items-center gap-3"
                style={{ background: "#F4EFE6" }}
              >
                <Navigation className="w-5 h-5" style={{ color: "#0F3D5C" }} />
                <div className="flex-1">
                  <div className="text-sm font-semibold">
                    Байршил автоматаар олдлоо
                  </div>
                  <div className="text-xs opacity-60 font-mono">
                    47.918° N · 106.917° E · Сүхбаатар дүүрэг
                  </div>
                </div>
                <button className="text-xs font-mono opacity-60">
                  ӨӨРЧЛӨХ
                </button>
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
                      className={`p-4 rounded-xl text-left flex items-center gap-3 transition-all ${selectedCat === c.id ? "ring-2" : ""}`}
                      style={{
                        background:
                          selectedCat === c.id ? c.color + "15" : "#F4EFE6",
                        ringColor: c.color,
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
                  className="w-full p-4 rounded-xl bg-white text-sm"
                  style={{ border: "1px solid #1A1A1A20" }}
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
                  className="w-full p-4 rounded-xl bg-white text-sm resize-none"
                  style={{ border: "1px solid #1A1A1A20" }}
                />
              </div>
              <div
                className="p-4 rounded-2xl"
                style={{ background: "#F4EFE6" }}
              >
                <div className="text-xs font-mono tracking-[0.15em] mb-3 opacity-60">
                  ХУРААНГУЙ
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-60">Категори:</span>
                    <span className="font-semibold">
                      {CATEGORIES.find((c) => c.id === selectedCat)?.label ||
                        "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Нэр:</span>
                    <span className="font-semibold">{title || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Байршил:</span>
                    <span className="font-mono text-xs">
                      47.918° N · 106.917° E
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
                style={{ border: "1px solid #1A1A1A20" }}
              >
                Буцах
              </button>
            )}
            <button
              onClick={() => (step < 3 ? setStep(step + 1) : onClose())}
              className="btn-primary flex-1 py-3 rounded-full font-semibold flex items-center justify-center gap-2"
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
