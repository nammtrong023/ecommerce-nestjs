FROM nginx:1.25.3-alpine

RUN rm /etc/nginx/conf.d/*

COPY ./nginx.conf /etc/nginx/conf.d/
RUN chown -R nginx:nginx /etc/nginx/conf.d/nginx.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]