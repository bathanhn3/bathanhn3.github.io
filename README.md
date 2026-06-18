# Thành SEO

Personal Jekyll site for SEO, AI, and tech writing.

## Site structure

- `/` homepage with content sections by hub
- `/seo/`
- `/ai/`
- `/tin-cong-nghe/`
- `/about/`

Posts use one primary Jekyll category:

```yaml
categories: [seo]
```

Allowed categories are `seo`, `ai`, and `tin-cong-nghe`. Post URLs are generated from `_config.yml` as `/:categories/:slug/`.

## Tech

- Jekyll static site
- GitHub Pages deploy
- Search index: `/search.json`

## Local run

1. `bundle install`
2. `bundle exec jekyll serve`
