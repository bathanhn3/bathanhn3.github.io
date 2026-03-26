---
title: "Build tool check onpage SEO bang Python"
slug: "build-tool-check-onpage-seo-bang-python"
permalink: /xay-dung/build-tool-check-onpage-seo-bang-python/
description: "Case study build mot tool nho de check title, meta description, canonical va heading tren danh sach URL."
date: "2026-03-21"
readTime: "11 min read"
track: xay-dung
track_label: "Thanh xay dung"
tags:
  - build
  - seo
  - python
  - automation
pillar: true
featured: true
---

## Bai toan

Moi lan audit website, minh can check nhanh cac truong onpage:

- Title co thieu/qua dai khong.
- Meta description co ton tai khong.
- Canonical co hop le khong.
- H1 co trung lap khong.

Lam bang tay voi 200 URL rat ton thoi gian.

## Version 1: Script don gian

Minh bat dau bang script doc file CSV URL, request HTML va parse bang BeautifulSoup.

```python
import requests
from bs4 import BeautifulSoup

url = "https://example.com"
html = requests.get(url, timeout=10).text
soup = BeautifulSoup(html, "html.parser")

title = soup.title.string if soup.title else ""
description = soup.find("meta", attrs={"name": "description"})
print(title)
print(description.get("content") if description else "")
```

## Version 2: Them rule va output report

Sau khi co du lieu, minh them rule:

- Title < 30 hoac > 65 ky tu => warning.
- Description < 70 hoac > 160 => warning.
- Missing canonical => critical.

Output duoc xuat ra CSV de team content loc nhanh URL can fix.

## Version 3: Dong goi thanh mini-product

- Them CLI: `python seo_check.py --input urls.csv --output report.csv`
- Them README + sample input.
- Them logging de biet URL nao timeout.

## Bai hoc rut ra

### 1. Build nho nhung dung ngay

Mot tool nho dung cho nhu cau that tao impact lon hon 10 y tuong lon khong ship.

### 2. Rule phai gan context

Khong co "one-size-fits-all" cho SEO. Rule phai co threshold linh hoat theo project.

### 3. Publish som de nhan feedback

Khi cho nguoi khac dung thu, minh moi thay cac edge case minh da bo sot.

## Doc tiep

- [Tu script den mini product: quy trinh ship 7 ngay](/xay-dung/tu-script-den-mini-product-quy-trinh-ship-7-ngay/)
- [Googlebot crawl hoat dong ra sao?](/phan-tich/googlebot-crawl-hoat-dong-ra-sao/)

