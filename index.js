#!/usr/bin/env node

const crypto = require('crypto')
const argv = require('yargs').argv
// const argv = process.argv
const resizedIV = Buffer.allocUnsafe(16)
const iv = crypto.createHash('sha256').update('myHashedIV').digest()

// console.log(argv)

iv.copy(resizedIV)

if (argv.e && argv.key) {
	const key = crypto.createHash('sha256').update(argv.key).digest()
	const cipher = crypto.createCipheriv('aes256', key, resizedIV)
	const msg = []

	argv._.forEach(phrase => {
		msg.push(cipher.update(phrase, 'binary', 'hex'))
	})

	msg.push(cipher.final('hex'))
	console.log(msg.join(''))
} else if (argv.d && argv.key) {
	const key = crypto.createHash('sha256').update(argv.key).digest()
	const decipher = crypto.createDecipheriv('aes256', key, resizedIV)
	const msg = []

	argv._.forEach(phrase => {
		msg.push(decipher.update(phrase, 'hex', 'binary'))
	})

	msg.push(decipher.final('binary'))
	console.log(msg.join(''))
}

// usage to encode/decode:
// node index.js -e --key=key "string to encode"
// node index.js -d --key=key encoded-string-hash
