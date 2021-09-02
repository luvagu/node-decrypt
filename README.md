# node-decrypt

# Usage:

> generate a random secret key for encryption/decryption

```bash
openssl rand -hex 32
```

> to encode a string

```bash
node index.js -e --key=rand_secret_key "string to encode"

# outputs encoded-string-hash:
# 8d1683d960adea7d5883ee943ccba5611bea44974193de23002ff617bf4d5856
```

> to decode a string

```bash
node index.js -d --key=rand_secret_key encoded-string-hash

# outputs original string:
# string to encode
```
