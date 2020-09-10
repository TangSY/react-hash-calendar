#!/bin/bash
npm install
npm run build
cd build
tar -zcvf calendar.tar.gz *
mv calendar.tar.gz /