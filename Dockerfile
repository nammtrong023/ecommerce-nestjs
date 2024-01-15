FROM nginx:1.25.3-alpine

COPY /var/jenkins_home/workspace/ecommerce_main@tmp/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
