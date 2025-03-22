## Features

* Built from structured data with Markdown for markup
* German and English version are linked together
* Output has RDFa markup as a [schema.org FAQPage](https://schema.org/FAQPage)

## Build Requirements

* [Pandoc](https://pandoc.org/)
* [yj](https://github.com/sclevine/yj)

## How do I contribute?

The content is all in the `faqs/` directory.

Each faq is a TOML file with the following format:

```
Table:
  logo: Table:
    src: String, name of logo image file
    href: String, where the logo should link to
  de: Table:
    title: String, title of the FAQ (German)
    intro: String, Markdown, text at the beginning (German)
  en: Table:
    title: String, title of the FAQ (English)
    intro: String, Markdown, text at the beginning (English)
  questions: Array of Questions (see below)
  sections: Array of Table:
    de: Table:
      title: String, title of the section (German)
    en: Table:
      title: String, title of the section (English)
    questions: Array of Questions (see below)
    subsections: Array of Table:
      de: Table:
        title: String, title of the section (German)
      en: Table:
        title: String, title of the section (English)
      questions: Array of Questions (see below)
```

where the questions look like this:

```
Table:
  de: Table:
    q: String, the question (German)
    a: String, Markdown, the answer (German)
  en: Table:
    q: String, the question (English)
    a: String, Markdown, the answer (English)
```

Just submit your changes via a pull request, the maintainers will make sure to incorporate your changes quickly.
