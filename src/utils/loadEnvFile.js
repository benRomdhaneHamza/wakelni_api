import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';


const envFile = path.join(__dirname, '../../.env');
console.log('envFile ===> ', envFile);

if (fs.existsSync(envFile)) {
  console.log('it exists');
}

dotenv.config({ path: envFile });
