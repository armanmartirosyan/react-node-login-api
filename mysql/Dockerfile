FROM mysql:8

COPY ./tools/init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

CMD ["mysqld"]