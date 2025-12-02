---
title: "Podman: A Rootless and Secure Alternative to Docker for Modern Containerization"
slug: 'podman-vs-docker-rootless-container-engine'
description: 'Looking for a secure and daemonless Docker alternative? Discover why developers are switching to Podman'
seoTitle: 'Why Improwised Recommends Podman over Docker?'
seoDescription: 'Discover how Improwised uses Podman for secure, daemonless containerization - offering a rootless alternative to Docker for modern cloud-native teams'
tags: [podman , rootless containers , container security , daemonless containers , podman vs docker]
publishDate: 2025-07-14
author: 'Chintan Viradiya'
image: '$lib/images/blogs/podman-vs-docker-rootless-container-engine-head-light.svg'
darkImage: '$lib/images/blogs/podman-vs-docker-rootless-container-engine-head-dark.svg'
linkTags:
  - title: "What is Podman?"
  - title: "Why Podman?"
  - title: "VM vs Container"
  - title: "Podman Architecture"
  - title: "Installing Podman"
  - title: "Images and Containers"
  - title: "Basic Podman Commands"
  - title: "What is a Containerfile?"
  - title: "Podman Compose"
  - title: "Local Development with Podman"
  - title: "Podman Networking"
  - title: "Podman Volumes"
  - title: "Use Case: One Company Secures Multi-Tenant Environments"
---

## What is Podman?

**Podman** is a tool to build, run, and manage containers. Containers let you package your app along with everything it needs (like libraries and dependencies) so it can run anywhere on your computer, on a server, or in the cloud.

![Podman: A Rootless and Secure Alternative to Docker for Modern Containerization]($lib/images/blogs/podman-vs-docker-rootless-container-engine-secure-daemon-free.png)

## Why Podman?

- **No central daemon:** Docker runs a background service (called a daemon). Podman doesn’t need to run a daemon.

- **Rootless containers:** Podman can run containers without needing admin (root) access.

- **Docker-compatible:** Most Docker commands work the same in Podman

- Lightweight and efficient container management.

## VM vs Container

Let's understand the difference between virtual machines (VMs) and containers:

Virtual Machines emulate entire operating systems, while containers share the host OS kernel and isolate application processes, making them more lightweight and efficient.

| Feature   | VM                     | Container                    |
|-----------|------------------------|------------------------------|
| Boots OS  | Yes (full OS)          | No (shares host OS)          |
| Size      | Large                  | Small                        |
| Start time| Slow                   | Fast                         |
| Isolation | Strong (full system)   | Lightweight (process-level)  |


**Containers** are faster and use fewer resources than VMs, making them perfect for development and microservices.

## Podman Architecture

- **No daemon:** Each command runs independently.

- **Rootless support:** Runs as a normal user without admin rights.

- **Uses runC:** The same container runtime used by Docker.

## Installing Podman

Podman works on **Linux**, **macOS**, and **Windows**. Here's how to install it:

### On Linux:

**Debian/Ubuntu**:

```bash
  sudo apt install podman
```

**Fedora/RHEL**:

```bash
  sudo dnf install podman
```

**Arch Linux**:

```bash
  sudo pacman -S podman
```

### On macOS:
[Download and install Podman Desktop.](https://podman-desktop.io/)

Or install using Homebrew:

```bash
  brew install podman

```

### On Windows:
[Download and install Podman Desktop.](https://podman-desktop.io/)

Verify podman is installed:

```bash
  podman --version

```

## Images and Containers

- **Image**: A snapshot or blueprint of your app.

- **Container**: A running instance created from an image.

For example, if an image is like a plan of Home/Company, a container is the actual Home/Company.

You can pull an image and run it like this:

```yaml

  # Pull httpd image
  podman pull httpd
  # Run that image
  # -d: Run container in background and print container ID 
  # -t: Allocate a pseudo-TTY for container
  # -p: Publish a container's port, or a range of ports, to the host
  podman run -dt -p 8080:80/tcp docker.io/library/httpd
  # List the running containers
  podman ps


```

## Basic Podman Commands

Here are a few common commands to get you started:

```yaml

  podman images             # List downloaded images
  podman ps                 # List running containers
  podman ps -a              # List all containers
  podman run -it ubuntu     # Run a container interactively
  podman stop <id>          # Stop a container
  podman rm <id>            # Remove a container


```

## What is a Containerfile?

A **Containerfile** (or Dockerfile) is a text file with instructions to build a container image.

Example:

*Containerfile:*

```yaml

  FROM improwised/php-base:8.2-s6
  RUN mkdir -p /app && chown -R nginx:nginx /app
  
  COPY composer.* /app/
  
  WORKDIR /app
  RUN php -d memory_limit=1024M /usr/bin/composer install --no-scripts --no-autoloader
  
  COPY . .
  
  RUN php -d memory_limit=1024M /usr/bin/composer dump-autoload --optimize


```

Build and run it with Podman:

```yaml

  podman build -t laravel-horizon .

  podman run -it --rm -p 9000:9000 --name laravel-horizon --env-file .env laravel-horizon 
  /bin/sh -c "set -e && php artisan serve --host 0.0.0.0 --port 9000"


```

## Podman Compose
If your app has multiple containers (like a frontend + backend + database + redis…), use **Podman Compose**.

Example:

*container-compose.yml*

```yaml

  services:
    db:
      image: mysql:8.0
      cap_add:
        - SYS_NICE
      restart: always
      environment:
        - MYSQL_DATABASE=quotes
        - MYSQL_ROOT_PASSWORD=mauFJcuf5dhRMQrjj
      ports:
        - '3306:3306'
      volumes:
        - db:/var/lib/mysql
    phpmyadmin:
      depends_on:
        - db
      image: phpmyadmin
      restart: always
      ports:
        - "8090:80"
      environment:
        PMA_HOST: db
        MYSQL_ROOT_PASSWORD: mauFJcuf5dhRMQrjj
  
  volumes:
    db:
      driver: local


```

Run it with podman-compose:

```bash
  podman-compose up

```

## Local Development with Podman

Podman is great for local development:

- No root needed

- Create a dev environment that mimics production

- Easy to test apps before deploying to servers


**Example:**  
An e-commerce developer can use Podman to locally run a React frontend, Node.js backend, PostgreSQL, and Redis, all in separate containers. This allows testing the full stack without installing any services on their system. Podman’s rootless mode ensures a secure, clean, and production-like local environment.

## Podman Networking

By default, Podman containers are isolated. But you can expose ports or connect containers:

```bash 
  podman run -p 3000:3000 my-app   # Expose port

```

- Supports bridge, macvlan, slirp4netns (rootless), and more.

- Uses Netavark (default for rootful)

To create a custom network:

```bash 
  podman network create improwised
  
  podman run --network=improwised ...

```

## Podman Volumes

You can use **volumes or bind mounts** to persist data.

- **Volumes:** Managed by Podman. Stored in `~/.local/share/containers/storage`
- **Bind mount:** Link to a folder on your host system.

**Key Difference:** Volumes are more portable and safer; Bind Mounts provide direct access to host paths.

**Example:**

```bash

  # Volume
  podman volume create improwised-data
  podman run -v improwised-data:/data my-app
  # Bind mount
  podman run -v /home/user/data:/data my-app


```

Use volumes when you want Podman to manage storage. Use bind mounts for full control.

## Use Case: One Company Secures Multi-Tenant Environments

### Problem:

A web hosting company runs applications for multiple clients on shared servers. Using Docker means all containers rely on a single root-level daemon. If the Docker daemon is compromised, all containers (across clients) are at risk.


### Solution with Podman:

They switch to Podman, which supports running containers without root privileges. Each client’s applications are now run in rootless containers, isolated under their respective user accounts.


### Benefits:

- Even if one container is compromised, it cannot access other containers or host system files.  
- No central daemon means no single point of failure.  
- The setup aligns better with multi-tenant security best practices.


## Summary

- **Podman is a secure, Docker-compatible container tool** that runs without a central daemon and supports running containers as a non-root user (rootless), making it ideal for local development and scripting.  

- **It supports all core container features**: images, volumes, networking, and multi-container apps via Podman Compose.  

- **You don't need to install anything** on your local machine to run the demo. Just run `podman-compose up`, and you are good to go.

- This keeps your system clean and less resource-intensive.















