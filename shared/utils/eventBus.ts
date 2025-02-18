// eventBus.ts
import mitt from "mitt";

type Events = {
  gameEnabled: boolean;
  playAttempts: number;
  gameOver: boolean;
};

export const eventBus = mitt<Events>();
