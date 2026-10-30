// Sound effects disabled per user request
class SoundEffects {
  public enabled: boolean = false;

  public playClick(_pitch?: number, _duration?: number) {
    // Click sound removed
  }

  public playPop() {
    // Pop sound removed
  }

  public playSuccess() {
    // Success sound removed
  }
}

export const sound = new SoundEffects();
