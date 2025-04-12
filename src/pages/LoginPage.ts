import { expect, Page } from "@playwright/test";
import { fetchOTP } from "../Utils/GmailHelper";
import { decrypt } from "../Utils/CryptojsUtils";

export default class loginPage {
  private readonly userID = "[name='username']";
  private readonly password = "[name='password']";
  private readonly loginButton = "button[type='submit']";
  private readonly landingPage = "svg[aria-label='Instagram']";
  private readonly confirmationPageImage =
    "//h2/span[@class='x1lliihq x1plvlek xryxfnj x1n2onr6 x1ji0vk5 x18bv5gf x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i8mgoa x163i06a x1kwtg5e x188k2y4 xzsf02u x1yc453h x1ill7wo x41vudc']";
  private readonly otpConfirmaitonInput = "//input[@type='text']";
  private readonly continueButton = "//span[text()='Continue']";

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("");
  }

  async login(username: string, password: string) {
    const user = decrypt(username);
    const pass = decrypt(password);
    await this.page.locator(this.userID).fill(user);
    await this.page.locator(this.password).fill(pass);
    await this.page.locator(this.loginButton).click();
    const otpPopupVisible = await this.page
      .locator(this.confirmationPageImage)
      .isVisible()
      .catch(() => false);
    if (otpPopupVisible) {
      await this.handleEmailOTP();
    } else {
      console.log("Not found");
    }
    // await this.page.waitForSelector(this.landingPage, { timeout: 10000 });
    // await expect(this.page.locator(this.landingPage)).toBeVisible();
  }

  async handleEmailOTP() {
    try {
      // Fetch OTP from Gmail
      await new Promise((resolve) => {
        fetchOTP(async (otp) => {
          if (otp) {
            console.log("OTP Received:", otp);
            await this.page.fill(this.otpConfirmaitonInput, otp);
            await this.page.click(this.continueButton);
            resolve(null);
          } else {
            console.error("Couldn't fetch OTP.");
          }
        });
      });
    } catch (error) {
      console.error("OTP handling failed:", error);
    }
  }
}
