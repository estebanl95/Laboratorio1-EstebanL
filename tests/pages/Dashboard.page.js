class DashboardPage {
    /** @type {import('@playwright/test').Page} */
    page;

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // Use simple, reliable selectors based on text content
        this.dashboardOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Dashboard' });
        this.adminOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Admin' });
        this.pimOption = this.page.locator('.oxd-main-menu-item', { hasText: 'PIM' });
        this.leaveOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Leave' });
        this.timeOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Time' });
        this.recruitmentOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Recruitment' });
        this.myInfoOption = this.page.locator('.oxd-main-menu-item', { hasText: 'My Info' });
        this.performanceOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Performance' });
        this.directoryOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Directory' });
        this.maintenanceOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Maintenance' });
        this.claimOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Claim' });
        this.buzzOption = this.page.locator('.oxd-main-menu-item', { hasText: 'Buzz' });
    }

}

export default DashboardPage;
