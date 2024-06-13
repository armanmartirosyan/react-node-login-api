FROM nginx

RUN	apt-get update -y && apt-get upgrade -y
RUN apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - 
RUN apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm install -g npm@10.8.1
RUN npm install && npm run build

RUN mv /app/dist/*  /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
