---
title: "Python la gi? Tu zero den script dau tien"
slug: "python-la-gi-tu-zero-den-script-dau-tien"
permalink: /giai-thich/python-la-gi-tu-zero-den-script-dau-tien/
description: "Giai thich Python theo cach de hieu nhat cho nguoi moi, kem lo trinh de viet script dau tien trong 1 buoi."
date: "2026-03-24"
readTime: "8 min read"
track: giai-thich
track_label: "Thanh giai thich"
tags:
  - python
  - beginner
  - explain
pillar: true
featured: true
---

## Python la gi?

Python la ngon ngu lap trinh duoc thiet ke de de doc, de viet va de mo rong. Ban co the dung Python de:

- Viet script tu dong hoa viec lap lai.
- Lam web backend.
- Xu ly du lieu, machine learning.
- Build tool nho cho SEO va automation.

Neu ban moi bat dau, Python la lua chon tot vi syntax rat gan voi ngon ngu tu nhien.

## Python khac gi so voi JavaScript?

### Diem giong

Ca hai deu la ngon ngu da muc dich, co cong dong lon, thu vien phong phu.

### Diem khac

- JavaScript manh o frontend/browser.
- Python manh o automation, data, AI.
- Python thuong de viet script nhanh hon cho nguoi moi.

## Script dau tien nen la gi?

Hay bat dau bang mot script rat gan voi cong viec that cua ban. Vi du: doi ten file hang loat.

```python
from pathlib import Path

folder = Path("./images")
for i, file in enumerate(folder.glob("*.jpg"), start=1):
    file.rename(folder / f"thumbnail-{i}.jpg")

print("Done")
```

Chi voi 10 dong code, ban da tiet kiem hang chuc phut thao tac tay.

## Cach hoc Python khong bi vo huong

### 1. Hoc theo output

Moi tuan dat 1 output ro rang: script parse CSV, script goi API, script scrape metadata.

### 2. Giu vong lap Learn - Build - Explain

- Learn: doc concept can dung.
- Build: code ra output.
- Explain: viet lai cach ban hieu.

### 3. Ghi chep bug

Moi loi gap phai la mot tai san. Khi ghi lai ly do sai, toc do hoc tang rat nhanh.

## Doc tiep

- [API la gi va cach goi API bang Python](/giai-thich/api-la-gi-va-cach-goi-api-bang-python/)
- [Lo trinh hoc code tu so 0 trong 6 thang](/hoc/lo-trinh-hoc-code-tu-so-0-trong-6-thang/)

