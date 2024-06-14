FROM nginx:1.27.0

RUN	apt-get update -y && apt-get upgrade -y
RUN apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - 
RUN apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN cat ./conf/nginx.conf > /etc/nginx/conf.d/default.conf

RUN npm install -g npm@latest
RUN npm install && npm run build

RUN mv /app/dist/*  /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
RUN rm -rf /app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
