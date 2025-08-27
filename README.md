# Prisma

thanusphol 

## Required
- Docker & DockerCompose
- PostgreSQL
- Node.js
- Prisma
- VSCode
    - PostgeSQL extensions (Chirs Kolkman)

## Running
### Database
```
docker-compose up -d
```
### Schema
```
npx prisma generate
npx prisma studio
```

## Develop
### First time
```bash
npx prisma init --datasource-provider postgresql
npx prisma generate
npx prisma db push
```

### Update schema
1. Update Some schema
2. Run this command `npx prisma generate`
    2.1 `npx prisma studio` ชื่อตารางเปลี่ยน แต่ขึ้น popup ผิดพลาด
    2.2 connect db not change
3. Rus this command `npx prisma db push`
    3.1 `npx prisma studio` ชื่อตารางเปลี่ยน แต่ขึ้น ERROR
    3.2 connect db ชื่อตารางเปลี่ยนเป็นข้อมูลล่าสุด

### Normal
```bash
npx prisma generate
```
## Delvelop
```bash
npx run build