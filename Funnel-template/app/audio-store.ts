// Instancia singleton del audio principal — persiste entre navegaciones
let mainAudio: HTMLAudioElement | null = null;

export function getMainAudio(): HTMLAudioElement {
  if (typeof window === "undefined") throw new Error("SSR");
  if (!mainAudio) {
    mainAudio = new Audio("/ended-audio.mp3");
    mainAudio.loop = true;
  }
  return mainAudio;
}
