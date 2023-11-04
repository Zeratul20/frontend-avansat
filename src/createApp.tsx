import { engine, producers, pathFn } from "@c11/engine.runtime";
import { render } from "@c11/engine.react";
import { EventNames } from "@c11/engine.types";
import { connectToDashboard } from "@c11/engine.dashboard";
import { App } from "./App";

type AppConfig = any;

const state: State = {
  movies: [],
  movieId: 0,
  userId: 0,
  users: [],
  comments: [],
  isLogoutPressed: false,
};

export const createApp = (config: AppConfig) => {
  const { element } = config;
  let app;

  if (process.env.NODE_ENV === "development") {
    const dashboard = connectToDashboard();
    const receiveUpdates: producer = ({ updatePath = update }) => {
      dashboard.on((event: any) => {
        event.data.text().then((x: any) => {
          const op = JSON.parse(x);
          const result = updatePath(pathFn(...op.path));
          result.set(op.value);
        });
      });
    };

    app = engine({
      onEvents: {
        [EventNames.STATE_UPDATED]: dashboard.send,
        [EventNames.PATCH_APPLIED]: dashboard.send,
      },
      state,
      use: [
        producers([receiveUpdates]),
        render(<App />, element, {
          debug: false,
        }),
      ],
    });
  } else {
    app = engine({
      state,
      use: [render(<App />, "#app")],
    });
  }

  return app;
};
