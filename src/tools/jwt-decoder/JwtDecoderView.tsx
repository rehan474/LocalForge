'use client';

import React, { useState, useMemo } from 'react';
import { KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxvY2FsRm9yZ2UgRGV2IiwiaWF0IjoxNzMwMDAwMDAwLCJleHAiOjE5OTk5OTk5OTl9.signature_placeholder';

export default function JwtDecoderView() {
  const [token, setToken] = useState(SAMPLE_JWT);

  const decoded = useMemo(() => {
    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) return { error: 'JWT must have 3 dot-separated parts (Header.Payload.Signature)' };
      const decodePart = (str: string) =>
        JSON.parse(decodeURIComponent(atob(str.replace(/-/g, '+').replace(/_/g, '/')).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
      const header = decodePart(parts[0]);
      const payload = decodePart(parts[1]);
      const isExpired = payload.exp ? Date.now() >= payload.exp * 1000 : false;
      return { header, payload, isExpired, error: null };
    } catch {
      return { error: 'Invalid Base64URL encoding or malformed JSON inside token.' };
    }
  }, [token]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Paste Encoded JWT Token (Never leaves your browser)
        </label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full h-28 p-4 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-mono text-xs focus:outline-none focus:border-indigo-500"
        />
      </div>

      {decoded.error ? (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" /> {decoded.error}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 block mb-2">
              Header (Algorithm & Type)
            </span>
            <pre className="text-xs font-mono text-slate-200 overflow-x-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Payload (Claims & Data)
              </span>
              {decoded.payload?.exp && (
                <span className={`text-[11px] px-2 py-0.5 rounded flex items-center gap-1 ${decoded.isExpired ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  {decoded.isExpired ? 'Token Expired' : 'Active Token'}
                </span>
              )}
            </div>
            <pre className="text-xs font-mono text-emerald-400 overflow-x-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
