#FROM nginx:1.15.2-alpine
FROM nginx:1.16.0-alpine
COPY .next/ /usr/share/nginx/html
# COPY docker/nginx_test.conf /etc/nginx/nginx_test.conf
# COPY docker/nginx_prod.conf /etc/nginx/nginx_prod.conf
# COPY docker/yun-ti.com_server.key /etc/nginx/yun-ti.com_server.key
# COPY docker/yun-ti.com_with_chain.crt /etc/nginx/yun-ti.com_with_chain.crt

# CMD exec nginx -c  /etc/nginx/nginx_$RUN_ENV.conf -g "daemon off;"
