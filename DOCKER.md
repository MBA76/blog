# Docker Kullanım Kılavuzu

Bu Gatsby blog projesi Docker ile production ve development modlarında
çalıştırılabilir hale getirilmiştir.

## Dosyalar

- **Dockerfile**: Multi-stage production build
- **.dockerignore**: Docker build sırasında görmezden gelinecek dosyalar
- **docker-compose.yml**: Development ve production servisleri

## Kullanım

### 1. Production Build ve Çalıştırma (Recommended)

```bash
# Docker image oluştur
docker build -t gatsby-blog .

# Container çalıştır
docker run -p 3000:3000 gatsby-blog
```

Tarayıcıda `http://localhost:3000` adresine gidin.

### 2. Docker Compose ile Production

```bash
# Production versiyonunu build edip çalıştır
docker compose up --build blog
```

### 3. Docker Compose ile Development

```bash
# Development ortamında çalıştır (hot reload ile)
docker compose up --build blog-dev
```

Geliştirme ortamı `0.0.0.0:8000` üstünden yayın yapar. Tarayıcıda
`http://localhost:8000` adresine gidin.

### 4. Image Boyutunu Optimize Et

```bash
# Cache kullanmadan temiz rebuild
docker build --no-cache -t gatsby-blog .
```

## Önemli Notlar

- **Node.js 18 Alpine**: Minimal image size için Alpine Linux kullanılır
- **Multistage Build**: Runtime image içine sadece `public/` çıktısı alınır
- **Legacy Peer Deps**: Uyumluluk için `--legacy-peer-deps` flag'i kullanılır
- **Dev erişimi**: Gatsby container içinde `0.0.0.0` üstünden ayağa kalkar
- **Named volumes**: `node_modules` ve Gatsby cache container tarafında tutulur

## Troubleshooting

### Port zaten kullanımda
```bash
docker run -p 3001:3000 gatsby-blog
```

### Cache temizle ve rebuild et
```bash
docker build --no-cache -t gatsby-blog .
```

### Container'a bağlan
```bash
docker exec -it <container_id> sh
```

### Development logları görünmüyor veya değişiklik algılanmıyor
```bash
docker compose down -v
docker compose up --build blog-dev
```

## Environment Variables

Gerekliyse, Dockerfile'da veya docker-compose.yml'de environment variables ekleyebilirsiniz.

Örnek:
```dockerfile
ENV NODE_ENV=production
```
