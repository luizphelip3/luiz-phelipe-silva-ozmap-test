import app from './app';
import { API_PORT } from './config/env/env-config';

const port = API_PORT;

app.server.listen(port, () => {
  console.info(`🚀🚀 Ozmap API running at port ${port} 🚀🚀`);
});
