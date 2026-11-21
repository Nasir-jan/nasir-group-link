import { useState } from 'react';
import { Check, Copy, Download, ExternalLink, Share, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'hero' | 'card';
}

export function PWAInstallButton({ variant = 'card' }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, isInIframe, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (isInstalled) {
    if (variant === 'hero') return null;
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 whitespace-nowrap shrink-0">
        <Check className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Installed</span>
      </span>
    );
  }

  const handleClick = async () => {
    if (isInstallable) {
      const result = await install();
      if (result === 'unavailable') {
        setShowGuide(true);
      }
      return;
    }
    setShowGuide(true);
  };

  const appUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopyUrl = async () => {
    if (!appUrl) return;
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 2200);
    } catch {
      // Clipboard blocked in restricted context
    }
  };

  return (
    <>
      {variant === 'hero' ? (
        <button
          type="button"
          onClick={handleClick}
          className="mt-3.5 inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-medium text-sm transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          <span>Download / Install App</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 sm:px-5 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          <span>Install App</span>
        </button>
      )}

      {showGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-guide-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    id="install-guide-title"
                    className="font-display text-lg font-bold text-slate-900"
                  >
                    Install Nasir Group Links
                  </h3>
                  <p className="text-xs text-slate-500">
                    Home screen par app ki tarah install karein
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Close install guide"
                className="min-w-[44px] min-h-[44px] -mt-1 -mr-2 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {isInIframe && (
              <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-3.5">
                <p className="text-xs text-slate-700 leading-relaxed">
                  Preview mode mein browser direct install block kar sakta hai. Phone mein install karne ke liye link browser (Chrome/Safari) mein kholein:
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                        <span>Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy App Link</span>
                      </>
                    )}
                  </button>
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    <span>Open in Browser</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}

            <div className="mt-5 space-y-4 text-sm text-slate-700">
              {isIOS ? (
                <div className="space-y-2.5">
                  <p className="font-semibold text-slate-900">iPhone / iPad (Safari):</p>
                  <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                    <li>
                      Safari mein neeche{' '}
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                        <Share className="w-3.5 h-3.5 inline" aria-hidden="true" /> Share
                      </span>{' '}
                      button par tap karein.
                    </li>
                    <li>
                      Neeche scroll karke{' '}
                      <strong className="text-slate-900">Add to Home Screen</strong> select karein.
                    </li>
                    <li>
                      Top right par <strong className="text-slate-900">Add</strong> dabakar install complete karein.
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-slate-900">Android (Chrome):</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Chrome ke top-right menu (<strong className="text-slate-900">⋮</strong>) par tap karein aur{' '}
                      <strong className="text-slate-900">Install app</strong> ya{' '}
                      <strong className="text-slate-900">Add to Home screen</strong> par click karein.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="font-semibold text-slate-900">iPhone (Safari):</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Safari mein <strong className="text-slate-900">Share</strong> button dabakar{' '}
                      <strong className="text-slate-900">Add to Home Screen</strong> chunein.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-6 w-full min-h-[46px] rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Samajh Gaya
            </button>
          </div>
        </div>
      )}
    </>
  );
}
