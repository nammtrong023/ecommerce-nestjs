FROM nginx:1.25.3-alpine

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/*

COPY ./nginx.conf /etc/nginx/nginx.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
