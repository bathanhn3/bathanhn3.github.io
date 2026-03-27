(function () {
  var themeToggle = document.querySelector('[data-theme-toggle]');
  var themeStorageKey = 'thanh-labs-theme';

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    }
  }

  var savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  } else {
    applyTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var currentTheme = document.body.getAttribute('data-theme') || 'light';
      var nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem(themeStorageKey, nextTheme);
      applyTheme(nextTheme);
    });
  }

  var searchIndex = [];
  var searchLoaded = false;

  function normalize(input) {
    return (input || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function openResults(resultsBox) {
    if (resultsBox) {
      resultsBox.classList.add('is-open');
    }
  }

  function closeResults(resultsBox) {
    if (resultsBox) {
      resultsBox.classList.remove('is-open');
      resultsBox.innerHTML = '';
    }
  }

  function renderResults(resultsBox, matches) {
    if (!resultsBox) {
      return;
    }

    if (!matches.length) {
      resultsBox.innerHTML = '<ul><li><span class="tag-pill">No result found</span></li></ul>';
      openResults(resultsBox);
      return;
    }

    var html = ['<ul>'];
    matches.forEach(function (item) {
      html.push(
        '<li><a href="' +
          item.url +
          '"><strong>' +
          item.title +
          '</strong><small>' +
          (item.track_label || item.track || 'Blog') +
          ' - ' +
          (item.description || '').slice(0, 120) +
          '</small></a></li>'
      );
    });
    html.push('</ul>');
    resultsBox.innerHTML = html.join('');
    openResults(resultsBox);
  }

  async function loadSearchIndex() {
    if (searchLoaded) {
      return;
    }

    try {
      var response = await fetch('/search.json', { headers: { Accept: 'application/json' } });
      if (!response.ok) {
        return;
      }

      var data = await response.json();
      if (Array.isArray(data)) {
        searchIndex = data;
        searchLoaded = true;
      }
    } catch (error) {
      searchLoaded = false;
    }
  }

  function filterSearch(query) {
    var key = normalize(query);
    if (key.length < 2) {
      return [];
    }

    var terms = key.split(' ').filter(Boolean);
    return searchIndex
      .filter(function (item) {
        var haystack = normalize([
          item.title,
          item.description,
          item.track,
          item.track_label,
          item.tags
        ].join(' '));

        return terms.every(function (term) {
          return haystack.indexOf(term) !== -1;
        });
      })
      .slice(0, 8);
  }

  function setupSearchBox(box) {
    var input = box.querySelector('[data-search-input]');
    var results = box.querySelector('[data-search-results]');
    if (!input || !results) {
      return;
    }

    box.addEventListener('submit', function (event) {
      if (!input.value.trim()) {
        event.preventDefault();
      }
    });

    input.addEventListener('focus', function () {
      loadSearchIndex();
    });

    input.addEventListener('input', function () {
      if (!searchLoaded) {
        return;
      }

      var matches = filterSearch(input.value);
      if (input.value.trim().length < 2) {
        closeResults(results);
        return;
      }

      renderResults(results, matches);
    });

    input.addEventListener('blur', function () {
      window.setTimeout(function () {
        closeResults(results);
      }, 180);
    });

    return {
      input: input,
      results: results
    };
  }

  var searchInstances = Array.from(document.querySelectorAll('[data-search]'))
    .map(setupSearchBox)
    .filter(Boolean);

  var queryFromUrl = new URLSearchParams(window.location.search).get('q');
  if (queryFromUrl && queryFromUrl.trim().length > 1) {
    loadSearchIndex().then(function () {
      if (!searchLoaded) {
        return;
      }

      var matches = filterSearch(queryFromUrl);
      searchInstances.forEach(function (instance) {
        instance.input.value = queryFromUrl;
      });

      if (window.location.pathname === '/blog/' || window.location.pathname.endsWith('/blog/index.html')) {
        if (searchInstances[0]) {
          renderResults(searchInstances[0].results, matches);
        }
      }
    });
  }

  var menuToggle = document.querySelector('[data-menu-toggle]');
  var navDrawer = document.querySelector('[data-nav-drawer]');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navDrawer.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    document.addEventListener('click', function (event) {
      if (!navDrawer.classList.contains('is-open')) {
        return;
      }
      if (!menuToggle.contains(event.target) && !navDrawer.contains(event.target)) {
        navDrawer.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      }
    });

    navDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navDrawer.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  var tocList = document.getElementById('toc-list');
  var postContent = document.getElementById('post-content');

  if (tocList && postContent) {
    var headings = postContent.querySelectorAll('h2, h3');
    if (!headings.length) {
      return;
    }

    var items = [];
    headings.forEach(function (heading, index) {
      if (!heading.id) {
        var slug = normalize(heading.textContent).replace(/\s+/g, '-');
        heading.id = slug ? slug + '-' + (index + 1) : 'section-' + (index + 1);
      }

      var indentClass = heading.tagName === 'H3' ? ' class="toc-sub"' : '';
      items.push('<li' + indentClass + '><a href="#' + heading.id + '">' + heading.textContent + '</a></li>');
    });

    tocList.innerHTML = items.join('');
  }
})();
