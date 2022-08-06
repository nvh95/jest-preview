import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import preview from "jest-preview";

import { AppComponent } from "./app.component";

describe(AppComponent.name, () => {
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
  });

  let fixture: ComponentFixture<AppComponent>;

  it("should render title", () => {
    // Open http://localhost:3336 to see preview
    // Require to run `jest-preview` server before
    preview.debug();

    const title = fixture.debugElement.query(By.css(".content span"))
      .nativeElement as HTMLElement;
    expect(title.textContent).toContain("angular-jest-preview app is running!");
  });
});
