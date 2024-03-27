import 'dotenv/config';
import 'newrelic';
import app from './app';

const port = process.env.PORT || 3000;

app.server.listen(port, () => {
  console.info(`🚀🚀 Ozmap API executando na porta ${port} 🚀🚀`);
});
