#!/bin/bash
npm install
npm run build
cd ./dist
tar -zcvf calendar.tar.gz *
rm -rf /usr/share/nginx/hxkj/dist/demo/react-calendar/*
mv calendar.tar.gz /usr/share/nginx/hxkj/dist/demo/react-calendar/
cd /usr/share/nginx/hxkj/dist/demo/react-calendar/
tar -zxvf calendar.tar.gz
rm -f calendar.tar.gz