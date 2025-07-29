class LoginPage {
    /** @type {import('@playwright/test').Page} */
    page;

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.username = this.page.locator('input[placeholder="Username"]');
        this.password = this.page.locator('input[placeholder="Password"]');
        this.loginButton = this.page.locator('button[type="submit"]');
        this.errorMessage = this.page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text');
    }

    async doLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    loginError = async () => {
        await this.errorMessage.waitFor({ state: 'visible' });
    }

}

export default LoginPage;