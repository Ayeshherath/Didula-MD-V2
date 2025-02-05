



# WORKFLOW CODE

```
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start
```
 # send error report 


<a href="https://wa.me/+94771820962?text=𝐃𝐢𝐝𝐮𝐥𝐚+𝐌𝐃+𝐕𝟐"><img height= "35" title="Author" src="https://img.shields.io/badge/Send Error Report:-white?style=for-the-badge&logo=whatsapp"></a>
