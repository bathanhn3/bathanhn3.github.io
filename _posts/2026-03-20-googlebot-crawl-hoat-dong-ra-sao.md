---
title: "Googlebot crawl hoat dong ra sao?"
slug: "googlebot-crawl-hoat-dong-ra-sao"
permalink: /phan-tich/googlebot-crawl-hoat-dong-ra-sao/
description: "Breakdown cach Googlebot discover URL, crawl, render va quyet dinh index - goc nhin practical cho SEO technical."
date: "2026-03-20"
readTime: "10 min read"
track: phan-tich
track_label: "Thanh phan tich"
tags:
  - breakdown
  - seo
  - crawl
  - technical-seo
pillar: true
featured: true
---

## Tong quan crawl pipeline

Googlebot khong crawl website theo mot lan tu dau den cuoi. Thuong se co vong lap:

1. Discover URL.
2. Prioritize URL.
3. Fetch HTML.
4. Render neu can.
5. Dua vao queue index.

Hieu pipeline nay giup ban debug dung diem nghen.

## URL duoc discover nhu the nao?

- Qua internal link.
- Qua sitemap.xml.
- Qua backlink.
- Qua URL da index truoc do.

Neu URL "mo coi" (khong co internal link), kha nang crawl/index se giam ro.

## Crawl budget la gi?

Crawl budget la tong tai nguyen crawl Google cap cho mot site trong mot chu ky.

Anh huong boi:

- Server response time.
- So luong URL low-value.
- Muc do cap nhat noi dung.
- Do uy tin domain.

## Render va JavaScript

Neu noi dung quan trong chi co sau khi JS chay, ban phu thuoc vao WRS (Web Rendering Service). Dieu nay co the lam tre index.

Nguyen tac practical: noi dung SEO-critical nen co san trong HTML response ban dau.

## 4 diem can theo doi trong log

### 1. Tyle `200` vs `4xx/5xx`

Nhieu loi 5xx => crawl bi giam.

### 2. URL bi crawl lap lai

Neu bot tap trung vao URL parameter vo gia tri, crawl budget bi lang phi.

### 3. Tyle crawl trang can index

Trang pillar phai duoc crawl thuong xuyen hon trang phu.

### 4. Toc do response

Time to first byte cao anh huong truc tiep toi tan suat crawl.

## Checklist toi uu nhanh

- Co sitemap sach, khong URL loi.
- Internal link dan ro den trang quan trong.
- Chuan hoa canonical.
- Chan crawl URL parameter khong can thiet.
- Giam JS blocker tren trang can SEO.

## Doc tiep

- [Build tool check onpage SEO bang Python](/xay-dung/build-tool-check-onpage-seo-bang-python/)
- [API la gi va cach goi API bang Python](/giai-thich/api-la-gi-va-cach-goi-api-bang-python/)

