"use client";

import { useState } from "react";

type CopyLinkButtonProps = {
  url: string;
  label?: string;
};

export function CopyLinkButton({ url, label = "Copy link" }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <button
      type="button"
      className="pr-btn-ghost shrink-0 text-xs"
      onClick={() => void copy()}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
