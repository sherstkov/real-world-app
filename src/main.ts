import { createApp } from 'vue';
import { router } from '@/router/router';
import store from '@/store';
import App from '@/App.vue';
import setAuthorizationToken from '@/plugins/set-authorization-token';

const app = createApp(App);

app.use(store);
app.use(router);

setAuthorizationToken();

app.mount('#app');
