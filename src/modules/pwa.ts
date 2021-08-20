import { ViteSSGContext } from "vite-ssg";

export const install = ({ router, isClient }: ViteSSGContext): void => {
  if (isClient) {
    router.isReady().then(async () => {
      const { registerSW } = await import("virtual:pwa-register");
      registerSW({ immediate: true });
    });
  }
};
