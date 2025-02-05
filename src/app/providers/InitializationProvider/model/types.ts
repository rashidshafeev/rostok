// src/app/providers/InitializationProvider/model/types.ts
export interface InitializationState {
    isAuthInitialized: boolean;
    isDataSynced: boolean;
    error: string | null;
  }