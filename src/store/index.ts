import { lobeChat } from '@lobehub/chat-plugin-sdk/client';
import useSWR, { SWRResponse } from 'swr';
import { create } from 'zustand';

interface MJFunction {
  rawInput: string;
}

export interface AppState {
  mjPrompt: string;
  rawInput: string;
}

const initialState: AppState = {
  mjPrompt: '',
  rawInput: '',
};

export interface Store extends AppState {
  createImagineTask: () => Promise<void>;
  updateInput: (input: string) => void;
  useInitApp: () => SWRResponse<string | undefined>;
}

export const useStore = create<Store>((set, get) => ({
  ...initialState,
  createImagineTask: async () => {},
  updateInput: (input) => {
    set({ rawInput: input });
  },
  useInitApp: () =>
    useSWR(
      'init',
      async () => {
        const payload = await lobeChat.getPluginPayload<MJFunction>();

        if (payload.name === 'showMJ') {
          const { rawInput } = payload.arguments!;
          return rawInput;
        }
      },
      {
        onSuccess: (data: string | undefined) => {
          if (data) get().updateInput(data);
        },
      },
    ),
}));
