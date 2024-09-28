# winreg-promise

A promise-based wrapper around the [winreg](https://www.npmjs.com/package/winreg) package.

This package omits the callback-based API of the original package in favor of promises.

The values returned by the promise-based API is the same as the callback-based API except that the error is thrown instead of being passed to the callback.

## Installation

```bash
npm install winreg-promise
```

## Usage

```javascript
const Registry = require('winreg-promise');

const regKey = new Registry({
  hive: winreg.HKCU,
  key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
});

async function get() {
  try {
    const value = await regKey.get('MyApp');
    console.log(value);
  } catch (err) {
    console.error(err);
  }
}

async function set() {
  try {
    await regKey.set('MyApp', winreg.REG_SZ, 'C:\\path\\to\\myapp.exe');
  } catch (err) {
    console.error(err);
  }
}
```
