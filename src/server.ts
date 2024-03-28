import app from './app';
import { API_PORT } from './config/env/env-config';

app.server.listen(API_PORT, () => {
  console.info(`🚀🚀 Ozmap API running at port ${API_PORT} 🚀🚀`);
});
