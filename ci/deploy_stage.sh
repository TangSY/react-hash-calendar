#!/bin/bash
ll
rm -rf react-hash-calendar
git clone git@127.0.0.1:HashTang/react-hash-calendar.git
cd react-hash-calendar
cnpm i
npm run build
cd build
ls