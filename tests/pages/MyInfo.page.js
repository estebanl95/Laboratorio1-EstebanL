class MyInfo {
    /** @type {import('@playwright/test').Page} */
    page;

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.firstName = this.page.locator('input[placeholder="First Name"]');
        this.middleName = this.page.locator('input[placeholder="Middle Name"]');
        this.lastName = this.page.locator('input[placeholder="Last Name"]');
        this.saveButton = this.page.locator('button[type="submit"]').first();
    }

    async fillPersonalInfo(firstName, middleName, lastName) {
        if (firstName) await this.firstName.fill(firstName);
        if (middleName) await this.middleName.fill(middleName);
        if (lastName) await this.lastName.fill(lastName);
    }

}

export default MyInfo;
