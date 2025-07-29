    import { test, expect } from '@playwright/test';
import DashboardPage from './pages/Dashboard.page.js'; 
import LoginPage from './pages/Login.page.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.creds.env'});

test.describe('Menu Navigation Tests', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await login.doLogin(process.env.username, process.env.password);
        await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });

    test('should navigate through the first section of the menu', async ({ page }) => {
        const menuNavigation = new DashboardPage(page);
        
        // Test Admin navigation
        await menuNavigation.adminOption.click();
        await expect(page).toHaveURL(/.*admin.*/);
        
        // Test PIM navigation  
        await menuNavigation.pimOption.click();
        await expect(page).toHaveURL(/.*pim.*/);
        
        // Test Leave navigation
        await menuNavigation.leaveOption.click();
        await expect(page).toHaveURL(/.*leave.*/);
        
        // Test Time navigation
        await menuNavigation.timeOption.click();
        await expect(page).toHaveURL(/.*time.*/);
        
        // Test Recruitment navigation
        await menuNavigation.recruitmentOption.click();
        await expect(page).toHaveURL(/.*recruitment.*/);
        
        // Test My Info navigation
        await menuNavigation.myInfoOption.click();
        await expect(page).toHaveURL(/.*pim.*viewPersonalDetails.*/);

        // Test Performance navigation
        await menuNavigation.performanceOption.click();
        await expect(page).toHaveURL(/.*performance.*/);

        // Return to Dashboard to end the test
        await menuNavigation.dashboardOption.click();
        await expect(page).toHaveURL(/.*dashboard.*/);
        
        // Test Directory navigation
        await menuNavigation.directoryOption.click();
        await expect(page).toHaveURL(/.*directory.*/);

        // Test Maintenance navigation - This has been commented out because it redirects to a different page
        // await menuNavigation.maintenanceOption.click();
        // await expect(page).toHaveURL(/.*maintenance.*/);

        // Test Claim navigation
        await menuNavigation.claimOption.click();
        await expect(page).toHaveURL(/.*claim.*/);

        // Test Buzz navigation
        await menuNavigation.buzzOption.click();
        await expect(page).toHaveURL(/.*buzz.*/);

    });

});