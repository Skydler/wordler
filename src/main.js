import { createApp } from "vue";
import App from "./App.vue";

import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";

const app = createApp(App);

app.use(createVuestic());
app.component("RecycleScroller", RecycleScroller);

app.mount("#app");
