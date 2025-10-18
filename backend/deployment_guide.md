# Sifiso Bank Deployment Guide

## Full-Stack Banking Application Deployment

This guide provides comprehensive instructions for deploying the Sifiso Bank application, which consists of a Flask backend with PostgreSQL database and a React frontend.

## Architecture Overview

The application follows a modern full-stack architecture where the Flask backend serves both the API endpoints and the static React frontend. All API requests are prefixed with `/api`, while the root path serves the React application.

## Production Deployment Options

### Option 1: Single Server Deployment (Recommended for Demo)

This approach runs both the Flask backend and serves the React frontend from a single server, which is ideal for demonstration purposes or small-scale deployments.

**Requirements:**

- Ubuntu 22.04 or similar Linux distribution
- Python 3.11+
- PostgreSQL 12+
- Nginx (for reverse proxy)
- Gunicorn (WSGI server)

**Step 1: Server Setup**

Install required system packages:

```bash
sudo apt-get update
sudo apt-get install -y python3.11 python3.11-venv postgresql postgresql-contrib nginx
```

**Step 2: Database Configuration**

Create the PostgreSQL database and user:

```bash
sudo -u postgres psql <<EOF
CREATE DATABASE sifiso_bank;
CREATE USER sifiso_user WITH ENCRYPTED PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE sifiso_bank TO sifiso_user;
ALTER DATABASE sifiso_bank OWNER TO sifiso_user;
\q
EOF
```

**Step 3: Application Setup**

Clone or copy the application files to the server:

```bash
sudo mkdir -p /var/www/sifiso_bank
sudo cp -r /home/ubuntu/sifiso_bank_backend/* /var/www/sifiso_bank/
sudo chown -R www-data:www-data /var/www/sifiso_bank
```

Create Python virtual environment:

```bash
cd /var/www/sifiso_bank
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

**Step 4: Environment Configuration**

Create environment file `/var/www/sifiso_bank/.env`:

```env
DATABASE_URL=postgresql://sifiso_user:your_secure_password_here@localhost/sifiso_bank
JWT_SECRET_KEY=your_very_secure_random_secret_key_here
FLASK_ENV=production
```

Update `src/main.py` to use environment variables:

```python
import os
from dotenv import load_dotenv

load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
```

**Step 5: Gunicorn Configuration**

Create Gunicorn configuration file `/var/www/sifiso_bank/gunicorn_config.py`:

```python
bind = "127.0.0.1:8000"
workers = 4
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2
```

**Step 6: Systemd Service**

Create systemd service file `/etc/systemd/system/sifiso_bank.service`:

```ini
[Unit]
Description=Sifiso Bank Flask Application
After=network.target postgresql.service

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/sifiso_bank
Environment="PATH=/var/www/sifiso_bank/venv/bin"
ExecStart=/var/www/sifiso_bank/venv/bin/gunicorn -c gunicorn_config.py src.main:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable sifiso_bank
sudo systemctl start sifiso_bank
sudo systemctl status sifiso_bank
```

**Step 7: Nginx Configuration**

Create Nginx configuration `/etc/nginx/sites-available/sifiso_bank`:

```nginx
server {
    listen 80;
    server_name your_domain.com;  # Replace with your domain or IP

    client_max_body_size 10M;

    # Serve static files
    location /assets {
        alias /var/www/sifiso_bank/src/static/assets;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /favicon.ico {
        alias /var/www/sifiso_bank/src/static/favicon.ico;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API endpoints
    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # React frontend (SPA)
    location / {
        root /var/www/sifiso_bank/src/static;
        try_files $uri $uri/ /index.html;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/sifiso_bank /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Step 8: SSL Configuration (Optional but Recommended)**

Install Certbot for Let's Encrypt SSL:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

### Option 2: Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY . .

EXPOSE 8000

CMD ["gunicorn", "-c", "gunicorn_config.py", "src.main:app"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: sifiso_bank
      POSTGRES_USER: sifiso_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://sifiso_user:secure_password@db/sifiso_bank
      JWT_SECRET_KEY: your_secret_key_here
      FLASK_ENV: production
    depends_on:
      - db
    volumes:
      - ./src:/app/src

volumes:
  postgres_data:
```

Deploy with Docker:

```bash
docker-compose up -d
```

## Testing the Deployment

After deployment, test the following:

1. **Frontend Access:** Navigate to your domain/IP and verify the landing page loads
2. **User Registration:** Create a new account
3. **Login:** Test authentication
4. **Dashboard:** Verify all account data displays correctly
5. **Transfers:** Test money transfer functionality
6. **Loans:** Apply for a loan
7. **Cards:** Request a new card

## Monitoring and Maintenance

**View Application Logs:**

```bash
sudo journalctl -u sifiso_bank -f
```

**View Nginx Logs:**

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

**Database Backup:**

```bash
sudo -u postgres pg_dump sifiso_bank > backup_$(date +%Y%m%d).sql
```

**Database Restore:**

```bash
sudo -u postgres psql sifiso_bank < backup_20251016.sql
```

## Security Checklist

- [ ] Change default database password
- [ ] Generate strong JWT secret key
- [ ] Enable SSL/HTTPS
- [ ] Configure firewall (UFW)
- [ ] Set up regular database backups
- [ ] Enable fail2ban for SSH protection
- [ ] Configure rate limiting in Nginx
- [ ] Set up monitoring (e.g., Prometheus, Grafana)
- [ ] Regular security updates

## Performance Optimization

**Database Indexing:**

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_account_number ON accounts(account_number);
CREATE INDEX idx_transactions_from_account ON transactions(from_account_id);
CREATE INDEX idx_transactions_to_account ON transactions(to_account_id);
CREATE INDEX idx_loans_user_id ON loans(user_id);
CREATE INDEX idx_cards_user_id ON cards(user_id);
```

**Nginx Caching:**
Add to Nginx configuration:

```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m;
proxy_cache_key "$scheme$request_method$host$request_uri";
```

## Troubleshooting

**Issue: Database connection failed**

- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify database credentials in `.env` file
- Test connection: `psql -U sifiso_user -d sifiso_bank -h localhost`

**Issue: 502 Bad Gateway**

- Check Gunicorn is running: `sudo systemctl status sifiso_bank`
- View application logs: `sudo journalctl -u sifiso_bank -n 50`
- Verify Nginx configuration: `sudo nginx -t`

**Issue: Static files not loading**

- Verify file permissions: `ls -la /var/www/sifiso_bank/src/static`
- Check Nginx error log: `sudo tail -f /var/log/nginx/error.log`

## Scaling Considerations

For production deployment at scale, consider:

- **Load Balancing:** Use multiple Gunicorn instances behind a load balancer
- **Database Replication:** Set up PostgreSQL primary-replica configuration
- **Caching Layer:** Implement Redis for session management and caching
- **CDN:** Use a CDN for static asset delivery
- **Horizontal Scaling:** Deploy multiple application servers
- **Monitoring:** Implement comprehensive monitoring with Prometheus and Grafana

---

**Note:** This deployment guide assumes a Linux-based server environment. Adjust commands and configurations as needed for your specific infrastructure.
