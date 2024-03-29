import { config } from 'dotenv';
import AuthHelper from "../helpers/auth.helper";
import { start } from './server';

config();

const baseUrl = process.env.BASE_URL
const port = process.env.PORT

if (baseUrl.includes('localhost') && baseUrl.includes(port)) {
    console.log("GOPA on", port)
    start(port);
} else {
    console.log("KAPUT")
}

before(async function() {
    const authHelper = new AuthHelper();
    await authHelper.get(process.env.LOGIN, process.env.PASSWORD);
    process.env.TOKEN = authHelper.response.body.token;
});