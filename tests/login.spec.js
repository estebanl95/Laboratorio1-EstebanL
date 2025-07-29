import { test } from '@playwright/test';
import LoginPage from './pages/Login.page.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.creds.env' });

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); // Replace with actual login URL
    });

    test('should login with valid credentials', async ({ page }) => {
        const login = new LoginPage(page);
        await login.doLogin(process.env.username, process.env.password);
        await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); 
    });

    test('should not login with invalid credentials', async ({ page }) => {
        const login = new LoginPage(page);
        await login.doLogin(process.env.username, process.env.incorrectPassword);
        await login.loginError();
    });


});
