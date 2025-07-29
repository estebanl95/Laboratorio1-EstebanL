import { test, expect } from '@playwright/test';   
import DashboardPage from './pages/Dashboard.page.js';
import LoginPage from './pages/Login.page.js';
import MyInfo from './pages/MyInfo.page.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.creds.env' });

test.describe('Info Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await login.doLogin(process.env.username, process.env.password);
        await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });

    test('should navigate to My Info and enter personal details', async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.myInfoOption.click();
        await expect(page).toHaveURL(/.*pim.*viewPersonalDetails.*/);

        const myInfo = new MyInfo(page);
        
        await page.waitForLoadState('networkidle');
        
        await myInfo.fillPersonalInfo(
            process.env.dataFirstName,
            process.env.dataMiddleName,
            process.env.dataLastName,
        );
        await myInfo.saveButton.click();
        
        await page.waitForTimeout(2000);

        await expect(myInfo.firstName).toHaveValue(process.env.dataFirstName);
        await expect(myInfo.middleName).toHaveValue(process.env.dataMiddleName);
        await expect(myInfo.lastName).toHaveValue(process.env.dataLastName);
    });
});