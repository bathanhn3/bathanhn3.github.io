---
title: "API la gi va cach goi API bang Python"
slug: "api-la-gi-va-cach-goi-api-bang-python"
permalink: /giai-thich/api-la-gi-va-cach-goi-api-bang-python/
description: "Hieu dung API, request, response va cach goi API bang Python requests voi vi du thuc te."
date: "2026-03-23"
readTime: "9 min read"
track: giai-thich
track_label: "Thanh giai thich"
tags:
  - api
  - http
  - python
  - explain
pillar: true
featured: true
---

## API la gi?

API (Application Programming Interface) la bo quy tac cho phep hai he thong noi chuyen voi nhau.

Vi du don gian: frontend gui request den backend qua API de lay danh sach bai viet. Backend tra ve response dang JSON.

## Request va response

### Request gom gi?

- URL endpoint
- Method: `GET`, `POST`, `PUT`, `DELETE`
- Header
- Body (neu can)

### Response gom gi?

- Status code (`200`, `404`, `500`...)
- Header
- Body (JSON, text...)

## Vi du goi API voi Python

```python
import requests

url = "https://jsonplaceholder.typicode.com/posts/1"
response = requests.get(url, timeout=10)

if response.status_code == 200:
    data = response.json()
    print(data["title"])
else:
    print("Request failed:", response.status_code)
```

## 3 loi nguoi moi thuong gap

### 1. Khong kiem tra status code

Neu bo qua status code, ban de xu ly sai du lieu ma khong biet.

### 2. Hard-code token

Khong de API key truc tiep trong source code. Dung bien moi truong (`ENV`) de an toan hon.

### 3. Khong set timeout

Request co the treo rat lau. Luon set `timeout` de tranh dong bang workflow.

## Tu API den automation

Khi da hieu API, ban co the:

- Lay du lieu Search Console tu API.
- Push content vao CMS.
- Dong bo data giua Google Sheet va Notion.

## Doc tiep

- [Python la gi? Tu zero den script dau tien](/giai-thich/python-la-gi-tu-zero-den-script-dau-tien/)
- [Tu script den mini product: quy trinh ship 7 ngay](/xay-dung/tu-script-den-mini-product-quy-trinh-ship-7-ngay/)

