import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("should have title", async ({ page }) => {
    await expect(page).toHaveTitle("ShopEase");
    await expect(
      page.getByRole("heading", { name: /products/i })
    ).toBeVisible();
  });

  test("should render the categories", async ({ page }) => {
    const categories = [
      "All",
      "Smartphones",
      "Laptops",
      "Beauty",
      "Groceries",
      "Furniture",
    ];

    categories.forEach(async (category) => {
      const linkToCategory = page.getByTestId(`link-${category}`);
      await expect(linkToCategory).toBeVisible();
    });
  });

  test("should render product with id 1", async ({ page }) => {
    await expect(page.getByTestId("product-1")).toBeVisible();
  });

  test("should have login button", async ({ page }) => {
    const loginBtn = page.getByRole("link", { name: "Login" });
    await expect(loginBtn).toBeVisible();
  });

  test("login button should work", async ({ page }) => {
    const loginBtn = page.getByRole("link", { name: "Login" });
    await loginBtn.click();

    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole("heading", { name: "Log in" })).toBeVisible();
  });

  test("should navigate to '/category/Smartphones' when clicked on 'phones' link", async ({
    page,
  }) => {
    const phonesLink = page.getByRole("link", { name: /phones/i });
    await phonesLink.click();
    await expect(page).toHaveURL(/smartphones/i);
    await expect(
      page.getByRole("heading", { name: /smartphones/i })
    ).toBeVisible();
  });
});
