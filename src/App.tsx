import { useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Laugh,
  Search,
  Trophy,
  Users,
  WifiOff,
  X,
} from 'lucide-react';
import { PWAInstallButton } from './components/PWAInstallButton';
import { useOnlineStatus } from './hooks/usePWAInstall';
import { WHATSAPP_GROUPS, type GroupItem } from './data/groups';

const HERO_IMAGE_PATH = '/src/assets/images/ocean_beach_hero_1795164251173.jpg';

function GroupIcon({ iconKey, className }: { iconKey: GroupItem['iconKey']; className?: string }) {
  switch (iconKey) {
    case 'friends':
      return <Users className={className} aria-hidden="true" />;
    case 'videos':
      return <Laugh className={className} aria-hidden="true" />;
    case 'cricket':
      return <Trophy className={className} aria-hidden="true" />;
    case 'study':
      return <BookOpen className={className} aria-hidden="true" />;
  }
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [heroImageError, setHeroImageError] = useState(false);
  const [activeGroup, setActiveGroup] = useState<GroupItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isOnline = useOnlineStatus();

  const directoryRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const filteredGroups = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return WHATSAPP_GROUPS;
    return WHATSAPP_GROUPS.filter(
      (group) =>
        group.name.toLowerCase().includes(trimmed) ||
        group.category.toLowerCase().includes(trimmed) ||
        group.description.toLowerCase().includes(trimmed)
    );
  }, [searchQuery]);

  const totalMembers = useMemo(
    () => WHATSAPP_GROUPS.reduce((sum, group) => sum + group.members, 0),
    []
  );

  const scrollToGroups = () => {
    directoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      searchInputRef.current?.focus({ preventScroll: true });
    }, 450);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJoinClick = (group: GroupItem) => {
    setActiveGroup(group);
    setCopiedId(null);
  };

  const handleCopyInvite = async (group: GroupItem) => {
    try {
      await navigator.clipboard.writeText(group.whatsappUrl);
      setCopiedId(group.id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === group.id ? null : prev));
      }, 2200);
    } catch {
      // Clipboard access unavailable in restricted frame; direct link remains available
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4F2] text-slate-900">
      {/* First Screen: Full Ocean Beach Hero */}
      <section
        aria-label="Welcome"
        className="relative min-h-[100dvh] w-full flex items-center justify-center px-6 py-12 overflow-hidden bg-gradient-to-br from-sky-700 via-teal-700 to-emerald-900"
      >
        {!heroImageError && (
          <img
            src={HERO_IMAGE_PATH}
            alt="Sunny tropical ocean beach with turquoise water"
            referrerPolicy="no-referrer"
            onError={() => setHeroImageError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Measured contrast scrim for crisp white typography */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/45 to-slate-950/75"
        />

        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center">
          {/* Big green circle icon with people emoji */}
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_18px_40px_rgba(37,211,102,0.45)] ring-4 ring-white/25 select-none mb-7"
            aria-hidden="true"
          >
            <span className="text-5xl sm:text-[3.5rem] leading-none">👥</span>
          </div>

          {/* Big white text */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance drop-shadow-sm">
            Nasir Group Links
          </h1>

          {/* Small subtitle text */}
          <p className="mt-3 text-base sm:text-lg font-medium text-white/90 max-w-md text-balance">
            Apna Favourite Group Join Karo
          </p>

          {/* Green CTA button */}
          <button
            type="button"
            onClick={scrollToGroups}
            className="mt-8 inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.98] text-white font-semibold text-base shadow-[0_12px_28px_rgba(37,211,102,0.38)] transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
          >
            <span>Groups Dekho</span>
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* App Download / Install option */}
          <PWAInstallButton variant="hero" />
        </div>
      </section>

      {/* Second Part: Play Store-Style Group Directory */}
      <main
        id="groups-section"
        ref={directoryRef}
        className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
      >
        <div className="max-w-4xl mx-auto">
          {/* White Directory Card */}
          <section
            aria-label="WhatsApp Groups Directory"
            className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-8"
          >
            {/* Play Store App Header inside card */}
            <div className="flex items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-sm shrink-0 select-none"
                  aria-hidden="true"
                >
                  <span className="text-2xl leading-none">👥</span>
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate">
                    Nasir Group Links
                  </h2>
                  <p className="mt-0.5 text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span>Community Directory</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{WHATSAPP_GROUPS.length} Groups</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {totalMembers.toLocaleString()} Members
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <PWAInstallButton variant="card" />
                <button
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Scroll back to top"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 rounded-full text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                >
                  <ArrowUp className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Top</span>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-6">
              <label htmlFor="group-search" className="sr-only">
                Group Search Karo
              </label>
              <div className="flex items-center gap-3 bg-slate-100/90 focus-within:bg-white border border-slate-200 focus-within:border-[#25D366] focus-within:ring-2 focus-within:ring-[#25D366]/20 rounded-2xl px-4 min-h-[52px] transition-all duration-150">
                <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                <input
                  id="group-search"
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Group Search Karo"
                  className="w-full bg-transparent text-base text-slate-900 placeholder:text-slate-500 focus:outline-none py-2.5"
                />
                {searchQuery.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* List Header */}
            <div className="mt-6 mb-2 flex items-center justify-between gap-4">
              <h3 className="text-sm font-semibold text-slate-800">
                Featured Groups
              </h3>
              <span className="text-xs sm:text-sm text-slate-500 tabular-nums">
                {filteredGroups.length === WHATSAPP_GROUPS.length
                  ? `${WHATSAPP_GROUPS.length} Groups`
                  : `${filteredGroups.length} of ${WHATSAPP_GROUPS.length} Groups`}
              </span>
            </div>

            {/* Groups List (Hairline-separated Play Store rows) */}
            {filteredGroups.length > 0 ? (
              <ul className="divide-y divide-slate-100 md:divide-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-2">
                {filteredGroups.map((group) => (
                  <li
                    key={group.id}
                    className="py-4 md:py-4 md:border-b md:border-slate-100 flex items-center justify-between gap-3.5"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${group.accentClass}`}
                      >
                        <GroupIcon iconKey={group.iconKey} className="w-6 h-6" />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 text-base leading-snug truncate">
                          {group.name}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-500 tabular-nums flex items-center gap-1.5 truncate">
                          <span>{group.members} Members</span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{group.category}</span>
                        </p>
                      </div>
                    </div>

                    <a
                      href={group.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleJoinClick(group)}
                      aria-label={`Join ${group.name} on WhatsApp`}
                      className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.97] text-white font-semibold text-sm tracking-wide shadow-sm shadow-[#25D366]/20 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                    >
                      JOIN
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center border-t border-slate-100 mt-2">
                <p className="text-base font-medium text-slate-800">
                  No groups matched &ldquo;{searchQuery.trim()}&rdquo;
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try searching for Friends, Videos, Cricket, or Study.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="mt-4 inline-flex items-center justify-center min-h-[44px] px-5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Show All Groups
                </button>
              </div>
            )}

            {/* Non-blocking Join Confirmation / Fallback Bar */}
            {activeGroup && (
              <div
                role="status"
                aria-live="polite"
                className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    Opening WhatsApp invite for {activeGroup.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {activeGroup.whatsappUrl}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyInvite(activeGroup)}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedId === activeGroup.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeGroup.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    <span>Open WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveGroup(null)}
                    aria-label="Dismiss notification"
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 text-center">
        <p className="text-sm font-medium text-slate-500">Made by Nasir</p>
      </footer>

      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-40 inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-xs font-medium text-white shadow-lg"
        >
          <WifiOff className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Offline Mode — Cached app ready</span>
        </div>
      )}
    </div>
  );
}
