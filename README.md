# @mogeko/aes-gcm

[![Test](https://github.com/mogeko/aes-gcm/actions/workflows/test.yaml/badge.svg)](https://github.com/mogeko/aes-gcm/actions/workflows/test.yaml)
[![Codecov](https://codecov.io/gh/mogeko/aes-gcm/graph/badge.svg?token=TxIJDlUwIc)](https://codecov.io/gh/mogeko/aes-gcm)
[![JSR](https://jsr.io/badges/@mogeko/aes-gcm)](https://jsr.io/@mogeko/aes-gcm)

A library that implements AES-GCM algorithm encryption and decryption for
TypeScript/JavaScript.

Galois/Counter Mode (GCM) uses a block cipher with block size 128 bits (commonly
AES-128) operated in counter mode for encryption, and uses arithmetic in the
Galois field GF(2128) to compute the authentication tag; hence the name.

## Installation

```sh
deno add @mogeko/aes-gcm
```

For Node.js users:

```sh
npx jsr add @mogeko/aes-gcm
```

## Usage

```ts
import { decrypt, encrypt } from "jsr:@mogeko/aes-gcm";
import { assertEquals } from "jsr:@std/assert/equals";

const cipher = await encrypt("Hello, world!", "pa$$w0rd");

assertEquals(await decrypt(cipher, "pa$$w0rd"), "Hello, world!");
```

## LICENSE

The code in this project is released under the [MIT License](./LICENSE).
