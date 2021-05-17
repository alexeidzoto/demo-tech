# Demo I+D
## Technology Stack

- [Service Stack](https://servicestack.net/): One framework to power them all. Write your HTTP APIs once and take advantage of end to end typed integrations for all popular Web, Mobile and Desktop platforms.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces
- [Auth0](https://auth0.com/): Auth0 is an easy to implement, adaptable authentication and authorization platform. Secure access for everyone. But not just anyone.
- [Docker](https://www.docker.com/): Docker takes away repetitive, mundane configuration tasks and is used throughout the development lifecycle for fast, easy and portable application development - desktop and cloud. Docker’s comprehensive end to end platform includes UIs, CLIs, APIs and security that are engineered to work together across the entire application delivery lifecycle.
- [Docker Compose](https://docs.docker.com/compose/gettingstarted/): Docker Compose relies on Docker Engine for any meaningful work, so make sure you have Docker Engine installed either locally or remote, depending on your setup.

## Installation

- ### **1-** Clone de project  from Github

```bash
$> git clone https://github.com/alexeidzoto/demo-tech.git
```

- ### 2- Deploy 

```shell
# 1- Execute docker-compose
$> docker-compose up -d --build
# 2- Execute Django migrations
$> docker exec -it cbc-django-server python manage.py migrate --noinput
# 3- Check Api in the next URL
http://localhost:8000
```

## Usage


