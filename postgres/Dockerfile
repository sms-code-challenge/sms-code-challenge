FROM postgres:12
ENV POSTGRES_PASSWORD sms
COPY init.sql /docker-entrypoint-initdb.d
EXPOSE 5432
