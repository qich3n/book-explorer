'use client';

import { useEffect } from 'react';
import { Command, Search, ArrowUp, ArrowDown, Escape } from 'lucide-react';

interface KeyboardShortcutsProps {
  onSearchFocus?: () => void;
  onScrollToTop?: () => void;
  onScrollToBottom?: () => void;
}

export default function KeyboardShortcuts({
  onSearchFocus,
  onScrollToTop,
  onScrollToBottom,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onSearchFocus?.();
      }

      // Escape to blur search
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.tagName === 'INPUT') {
          activeElement.blur();
        }
      }

      // Cmd/Ctrl + Arrow Up to scroll to top
      if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowUp') {
        e.preventDefault();
        onScrollToTop?.();
      }

      // Cmd/Ctrl + Arrow Down to scroll to bottom
      if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowDown') {
        e.preventDefault();
        onScrollToBottom?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSearchFocus, onScrollToTop, onScrollToBottom]);

  return null; // This component doesn't render anything
}

