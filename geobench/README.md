# GEO Bench specs

These product specs are inputs for [`NomaDamas/geobench`](https://github.com/NomaDamas/geobench), a GEO visibility benchmark for checking whether LLM answers mention and cite gaebal-gajae projects.

## Estimate

```bash
/path/to/geobench/dist/geobench estimate --product geobench/gaebal-gajae-blog.yaml --providers openai --tier cheap
```

## Profile before running

Specs include `discovery_sources`, so run profiling before a real benchmark:

```bash
/path/to/geobench/dist/geobench profile geobench/gaebal-gajae-blog.yaml
```

## Run

```bash
/path/to/geobench/dist/geobench bench --product geobench/gaebal-gajae-blog.yaml --providers openai --tier cheap --mode benchmark
```

Do not publish raw run payloads. Publish only aggregate hit rate, MRR, share-of-voice, citation rate/share, confidence intervals, and public cited domains.
