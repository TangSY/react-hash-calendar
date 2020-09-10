#!/bin/bash
ls
npm install
npm run build
cd build
tar -zcvf calendar.tar.gz *
mv calendar.tar.gz /usr/share/nginx/hxkj/dist/demo/react-calendar/
cd /usr/share/nginx/hxkj/dist/demo/react-calendar/
tar -zxvf calendar.tar.gz
rm -f calendar.tar.gz