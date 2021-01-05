FROM php:7.3-fpm

RUN apt-get update && apt-get install -y libmcrypt-dev zip unzip git \
    && pecl install mcrypt-1.0.2 \
    && docker-php-ext-enable mcrypt

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo mbstring

WORKDIR /generals
COPY . /generals

RUN composer install
CMD php artisan serve --host=0.0.0.0 --port=3001

EXPOSE 3001
