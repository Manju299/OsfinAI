import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";
import MessagePage from "./../pages/MessagePage";

test("Login to the instagram", async ({ page }) => {
  const login = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const profilePage = new ProfilePage(page);
  const messagePage = new MessagePage(page);
  await login.goto();
  await login.login(
    process.env.INSTAGRAM_USERNAME!,
    process.env.INSTAGRAM_PASSWORD!
  );
  await searchPage.searchForAccount("manjunathsh2020");
  await profilePage.openMessage();
  await messagePage.sendMessage("Hello");
});
