'use client';

import { useState } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { useGame } from '@/context/GameContext';
import { clearProfileData } from '@/lib/storage';

const PRESET_EMOJIS = ['🦄', '🧔', '🐱', '🌟', '🦊', '🐸', '🎈', '🚀'];

export default function ProfileManager() {
  const { profiles, activeProfile, switchProfile, createProfile, deleteProfile } = useProfile();
  const { resetProgress } = useGame();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmoji, setNewEmoji] = useState('🌟');

  const handleCreate = () => {
    if (!newName.trim()) return;
    createProfile(newName.trim(), newEmoji);
    setNewName('');
    setNewEmoji('🌟');
    setShowCreate(false);
  };

  const handleClearStats = (id: string, name: string) => {
    if (!window.confirm(`Clear all stats for "${name}"? Stars, mastery, and decorations will be reset.`)) return;

    if (id === activeProfile.id) {
      // Active profile: reset in-memory state + storage
      resetProgress();
    } else {
      // Non-active profile: just wipe storage
      clearProfileData(id);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete profile "${name}"? This will erase all their progress.`)) {
      deleteProfile(id);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-3">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
              profile.id === activeProfile.id ? 'bg-sky-light' : 'bg-cream'
            }`}
          >
            <span className="text-2xl">{profile.emoji}</span>
            <span className="font-display text-sm font-semibold text-bark">
              {profile.name}
            </span>
            {profile.id === activeProfile.id && (
              <span className="text-xs text-bark/50">Active</span>
            )}
            <div className="ml-auto flex gap-2">
              {profile.id !== activeProfile.id && (
                <button
                  onClick={() => switchProfile(profile.id)}
                  className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-bark shadow-sm transition-colors hover:bg-bark/5"
                >
                  Switch
                </button>
              )}
              <button
                onClick={() => handleClearStats(profile.id, profile.name)}
                className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-amber-600 shadow-sm transition-colors hover:bg-amber-50"
              >
                Clear Stats
              </button>
              {profiles.length > 1 && (
                <button
                  onClick={() => handleDelete(profile.id, profile.name)}
                  className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-red-500 shadow-sm transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCreate ? (
        <div className="mt-4 rounded-xl bg-cream p-4">
          <div className="mb-3">
            <label className="mb-1 block text-xs font-semibold text-bark/70">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter name"
              className="w-full rounded-lg border border-bark/20 bg-white px-3 py-2 text-sm text-bark outline-none focus:border-sky-dark"
              maxLength={20}
            />
          </div>
          <div className="mb-3">
            <label className="mb-1 block text-xs font-semibold text-bark/70">Emoji</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setNewEmoji(emoji)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-transform ${
                    newEmoji === emoji ? 'bg-sky-light ring-2 ring-sky-dark scale-110' : 'bg-white'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={!newName.trim()}
              className="flex-1 rounded-lg bg-sky-light px-3 py-2 text-xs font-semibold text-bark transition-colors hover:bg-sky-dark/20 disabled:opacity-50"
            >
              Create
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="flex-1 rounded-lg bg-bark/10 px-3 py-2 text-xs font-semibold text-bark transition-colors hover:bg-bark/20"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCreate(true)}
          className="mt-3 w-full rounded-xl border-2 border-dashed border-bark/20 px-4 py-3 text-sm font-semibold text-bark/50 transition-colors hover:border-bark/40 hover:text-bark/70"
        >
          + Add Profile
        </button>
      )}
    </div>
  );
}
