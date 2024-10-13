import { decrypt, encrypt } from "@/mod.ts";
import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";

describe("mod", () => {
  it("Basic usage", async () => {
    expect(
      await decrypt(await encrypt("Hello, World!", "pa$$w0rd"), "pa$$w0rd"),
    ).toStrictEqual("Hello, World!");
  });
});
