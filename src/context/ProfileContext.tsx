'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import type { Profile, ProfileRegistry } from '@/lib/types';
import {
  loadState,
  saveState,
  GLOBAL_KEYS,
  STORAGE_KEYS,
  getProfileKeys,
  clearProfileData,
  type ProfileKeys,
} from '@/lib/storage';

const DEFAULT_ZOE_PROFILE: Profile = {
  id: 'zoe',
  name: 'Zoe',
  emoji: '🦄',
  createdAt: new Date().toISOString(),
};

const DEFAULT_DAD_PROFILE: Profile = {
  id: 'dad',
  name: 'Dad',
  emoji: '🧔',
  createdAt: new Date().toISOString(),
};

interface ProfileContextValue {
  profiles: Profile[];
  activeProfile: Profile;
  switchProfile: (id: string) => void;
  createProfile: (name: string, emoji: string) => void;
  deleteProfile: (id: string) => void;
  profileKeys: ProfileKeys;
  isLoaded: boolean;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

/**
 * Migrate legacy single-player data to Zoe's profile-namespaced keys.
 */
async function migrateToProfiles(): Promise<ProfileRegistry> {
  const legacySuffixes = ['player', 'sessions', 'mastery', 'decorations', 'current_session'];

  for (const suffix of legacySuffixes) {
    const oldKey = `zw_${suffix}`;
    const newKey = `zw_zoe_${suffix}`;
    const value = await loadState(oldKey, null);
    if (value !== null) {
      saveState(newKey, value);
    }
  }

  const registry: ProfileRegistry = {
    profiles: [DEFAULT_ZOE_PROFILE, DEFAULT_DAD_PROFILE],
    activeProfileId: 'zoe',
  };
  saveState(GLOBAL_KEYS.PROFILES, registry);
  return registry;
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [registry, setRegistry] = useState<ProfileRegistry | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load or migrate on mount
  useEffect(() => {
    async function init() {
      let reg = await loadState<ProfileRegistry | null>(GLOBAL_KEYS.PROFILES, null);

      if (!reg) {
        // First time: migrate existing data to Zoe's profile
        reg = await migrateToProfiles();
      }

      // Ensure active profile exists
      const activeExists = reg.profiles.some((p) => p.id === reg!.activeProfileId);
      if (!activeExists && reg.profiles.length > 0) {
        reg = { ...reg, activeProfileId: reg.profiles[0].id };
        saveState(GLOBAL_KEYS.PROFILES, reg);
      }

      setRegistry(reg);
      setIsLoaded(true);
    }
    init();
  }, []);

  // Persist registry changes
  useEffect(() => {
    if (!isLoaded || !registry) return;
    saveState(GLOBAL_KEYS.PROFILES, registry);
  }, [registry, isLoaded]);

  const switchProfile = useCallback((id: string) => {
    setRegistry((prev) => {
      if (!prev) return prev;
      const exists = prev.profiles.some((p) => p.id === id);
      if (!exists) return prev;
      return { ...prev, activeProfileId: id };
    });
  }, []);

  const createProfile = useCallback((name: string, emoji: string) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '') || Date.now().toString();
    const newProfile: Profile = {
      id,
      name,
      emoji,
      createdAt: new Date().toISOString(),
    };
    setRegistry((prev) => {
      if (!prev) return prev;
      // Don't create duplicate IDs
      if (prev.profiles.some((p) => p.id === id)) return prev;
      return {
        ...prev,
        profiles: [...prev.profiles, newProfile],
      };
    });
  }, []);

  const deleteProfile = useCallback((id: string) => {
    setRegistry((prev) => {
      if (!prev) return prev;
      // Don't delete the last profile
      if (prev.profiles.length <= 1) return prev;

      const remaining = prev.profiles.filter((p) => p.id !== id);
      const newActiveId = prev.activeProfileId === id
        ? remaining[0].id
        : prev.activeProfileId;

      // Clear the deleted profile's data
      clearProfileData(id);

      return {
        profiles: remaining,
        activeProfileId: newActiveId,
      };
    });
  }, []);

  const activeProfile = useMemo(() => {
    if (!registry) return DEFAULT_ZOE_PROFILE;
    return registry.profiles.find((p) => p.id === registry.activeProfileId) ?? registry.profiles[0];
  }, [registry]);

  const profileKeys = useMemo(() => getProfileKeys(activeProfile.id), [activeProfile.id]);

  const value: ProfileContextValue = useMemo(
    () => ({
      profiles: registry?.profiles ?? [],
      activeProfile,
      switchProfile,
      createProfile,
      deleteProfile,
      profileKeys,
      isLoaded,
    }),
    [registry?.profiles, activeProfile, switchProfile, createProfile, deleteProfile, profileKeys, isLoaded]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}
