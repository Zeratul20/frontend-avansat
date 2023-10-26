// import { engine } from "@c11/engine.runtime";
// import { render } from "@c11/engine.react";
// import { App } from "./App";
// import "./global";

// const app = engine({
//   use: [render(<App />, "#app")],
// });

// app.start();

// // Each renderer can have a state where it stores if it finished rendering/mounting/etc
// // This can be used to hook-up processes for export for example

import { createBrotliCompress } from "zlib";
import { createApp } from "./createApp";

let cors = require("cors");

const app = createApp({
  element: "#app",
  updateLang: (cb:any) => cb('en_EN')
});

app.use(cors());
app.start();

// Each renderer can have a state where it stores if it finished rendering/mounting/etc
// This can be used to hook-up processes for export for example


